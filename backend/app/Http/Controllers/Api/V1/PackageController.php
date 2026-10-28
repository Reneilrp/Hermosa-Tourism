<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\PackageBooking;
use App\Models\TourGuide;
use App\Models\TourPackage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PackageController extends Controller
{
    /**
     * Get all active tour packages.
     */
    public function index(): JsonResponse
    {
        $packages = TourPackage::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'count' => $packages->count(),
            'data' => $packages,
        ]);
    }

    /**
     * Get package details by ID or code.
     */
    public function show(string $id): JsonResponse
    {
        $package = TourPackage::where('id', $id)
            ->orWhere('package_code', $id)
            ->first();

        if (!$package) {
            return response()->json(['success' => false, 'message' => 'Package not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $package,
        ]);
    }

    /**
     * Update an existing tour package (Price, Inclusions, Badge, etc.) from Web Admin.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $package = TourPackage::where('id', $id)
            ->orWhere('package_code', $id)
            ->first();

        if (!$package) {
            return response()->json(['success' => false, 'message' => 'Package not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'tagline' => 'nullable|string|max:500',
            'badge' => 'nullable|string|max:100',
            'price_php' => 'nullable|numeric|min:0',
            'price_unit' => 'nullable|string|max:100',
            'duration' => 'nullable|string|max:100',
            'inclusions' => 'nullable|array',
            'ideal_for' => 'nullable|string|max:500',
            'is_active' => 'nullable|boolean',
            'is_prayer_aligned' => 'nullable|boolean',
            'inclusions_matrix' => 'nullable|array',
            'prayer_itinerary' => 'nullable|array',
        ]);

        $package->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Tour package updated successfully and synchronized to Mobile.',
            'data' => $package->fresh(),
        ]);
    }

    /**
     * Submit a tourist booking inquiry from Mobile App.
     */
    public function inquire(Request $request): JsonResponse
    {
        $request->merge([
            'user_name' => $request->input('user_name', $request->input('traveler_name')),
            'user_email' => $request->input('user_email', $request->input('traveler_email')),
            'user_phone' => $request->input('user_phone', $request->input('traveler_phone')),
            'user_nationality' => $request->input('user_nationality', $request->input('nationality')),
            'currency_preference' => $request->input('currency_preference', $request->input('currency', 'PHP')),
        ]);

        $validated = $request->validate([
            'package_code' => 'required|string',
            'user_name' => 'required|string|max:255',
            'user_email' => 'required|email|max:255',
            'user_phone' => 'required|string|max:50',
            'user_nationality' => 'nullable|string|max:100',
            'user_role' => 'nullable|string|in:foreign_tourist,halal_tourist,local_traveler,tour_guide',
            'pax_count' => 'nullable|integer|min:1|max:50',
            'travel_date' => 'nullable|string',
            'currency_preference' => 'nullable|string|in:PHP,MYR,USD',
            'guide_language_preference' => 'nullable|string|max:100',
            'special_requests' => 'nullable|string|max:1000',
            'tourist_roster' => 'nullable|array',
            'payment_channel' => 'nullable|string|in:gcash,maya,credit_card,landbank_official',
            'payment_status' => 'nullable|string|in:unpaid,pending_verification,paid',
            'proof_of_payment_url' => 'nullable|string',
        ]);

        $package = TourPackage::where('package_code', $validated['package_code'])
            ->orWhere('id', $validated['package_code'])
            ->first();

        if (!$package) {
            return response()->json(['success' => false, 'message' => 'Invalid package selected'], 422);
        }

        $pax = $validated['pax_count'] ?? 1;
        $basePrice = $package->price_php * $pax;
        $refNumber = 'PKG-2026-' . strtoupper(Str::random(4));

        $channel = $request->input('payment_channel', 'gcash');
        $gatewayFee = 0.00;
        if (in_array($channel, ['gcash', 'maya'])) {
            $gatewayFee = round(($basePrice * 0.02) + 15.00, 2);
        } elseif ($channel === 'credit_card') {
            $gatewayFee = round(($basePrice * 0.035) + 15.00, 2);
        }
        $totalPaid = $basePrice + $gatewayFee;

        $isPaid = $request->input('payment_status') === 'paid';
        $status = $isPaid ? 'confirmed' : 'pending';
        $autoConfirmed = $isPaid;
        $voucherCode = $isPaid ? ('VOUCH-' . $refNumber) : null;
        $paidAt = $isPaid ? now() : null;

        $roster = $request->input('tourist_roster');
        if (empty($roster) || !is_array($roster)) {
            $roster = [
                [
                    'full_name' => $validated['user_name'],
                    'nickname' => explode(' ', $validated['user_name'])[0],
                    'age' => 32,
                    'gender' => 'Male',
                    'address' => $validated['user_nationality'] ?? 'Zamboanga City / ASEAN',
                    'id_type' => 'Passport / National ID',
                    'id_number' => 'PH-2026-' . rand(10000, 99999),
                    'is_pwd' => false,
                    'pwd_details' => 'None',
                    'dietary_allergies' => 'None (Halal Moro Diet)',
                    'emergency_contact_name' => $validated['user_name'],
                    'emergency_contact_phone' => $validated['user_phone'],
                ],
            ];
        }

        $booking = PackageBooking::create([
            'booking_reference' => $refNumber,
            'tour_package_id' => $package->id,
            'user_name' => $validated['user_name'],
            'user_email' => $validated['user_email'],
            'user_phone' => $validated['user_phone'],
            'user_nationality' => $validated['user_nationality'] ?? 'Philippines / ASEAN',
            'user_role' => $validated['user_role'] ?? 'halal_tourist',
            'pax_count' => $pax,
            'tourist_roster' => $roster,
            'travel_date' => $validated['travel_date'] ? date('Y-m-d', strtotime($validated['travel_date'])) : now()->addDays(3)->toDateString(),
            'currency_preference' => $validated['currency_preference'] ?? 'PHP',
            'payment_channel' => $channel,
            'payment_status' => $isPaid ? 'paid' : ($channel === 'landbank_official' ? 'pending_verification' : 'unpaid'),
            'payment_reference' => $isPaid ? ('PM-SIM-' . strtoupper(Str::random(8))) : null,
            'base_price' => $basePrice,
            'gateway_fee' => $gatewayFee,
            'total_amount_paid' => $totalPaid,
            'proof_of_payment_url' => $request->input('proof_of_payment_url'),
            'voucher_code' => $voucherCode,
            'auto_confirmed' => $autoConfirmed,
            'paid_at' => $paidAt,
            'estimated_total' => $totalPaid,
            'guide_language_preference' => $validated['guide_language_preference'] ?? 'English',
            'special_requests' => $validated['special_requests'] ?? null,
            'status' => $status,
            'admin_notes' => $autoConfirmed
                ? "Auto-confirmed via simulated online payment gateway ({$channel}) with zero cash policy."
                : 'Submitted from Hermosa-Tourism. Awaiting payment verification.',
        ]);

        return response()->json([
            'success' => true,
            'message' => $autoConfirmed
                ? 'Payment successful! Tour package auto-confirmed & digital voucher generated.'
                : 'Tour package booking inquiry registered successfully.',
            'data' => [
                'booking_reference' => $booking->booking_reference,
                'package_title' => $package->title,
                'package_code' => $package->code_label,
                'pax_count' => $booking->pax_count,
                'travel_date' => $booking->travel_date,
                'base_price' => $booking->base_price,
                'gateway_fee' => $booking->gateway_fee,
                'total_amount_paid' => $booking->total_amount_paid,
                'payment_channel' => $booking->payment_channel,
                'payment_status' => $booking->payment_status,
                'payment_reference' => $booking->payment_reference,
                'voucher_code' => $booking->voucher_code,
                'auto_confirmed' => $booking->auto_confirmed,
                'status' => $booking->status,
                'desk_hotline' => '+63 62 991 2656',
            ],
        ], 201);
    }

    /**
     * Process simulated online payment & trigger off-hours auto-confirmation.
     */
    public function processPayment(Request $request, string $reference): JsonResponse
    {
        $booking = PackageBooking::where('booking_reference', $reference)
            ->orWhere('id', $reference)
            ->first();

        if (!$booking) {
            return response()->json(['success' => false, 'message' => 'Booking not found'], 404);
        }

        $validated = $request->validate([
            'payment_channel' => 'required|string|in:gcash,maya,credit_card,landbank_official',
            'proof_of_payment_url' => 'nullable|string',
        ]);

        $channel = $validated['payment_channel'];
        $base = (float) ($booking->base_price > 0 ? $booking->base_price : ($booking->package->price_php * $booking->pax_count));

        if ($channel === 'landbank_official') {
            $booking->update([
                'payment_channel' => 'landbank_official',
                'payment_status' => 'pending_verification',
                'payment_reference' => 'LBP-SOA-' . rand(100000, 999999),
                'base_price' => $base,
                'gateway_fee' => 0.00,
                'total_amount_paid' => $base,
                'proof_of_payment_url' => $validated['proof_of_payment_url'] ?? 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
                'admin_notes' => 'Official LandBank Statement of Account (SOA) uploaded. Pending Treasury verification.',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Deposit slip & SOA registered. Tourism Treasury will verify clearance.',
                'data' => $booking->fresh(['package', 'assignedGuide']),
            ]);
        }

        // Online Gateway (GCash, Maya, Card)
        $fee = 0.00;
        if (in_array($channel, ['gcash', 'maya'])) {
            $fee = round(($base * 0.02) + 15.00, 2);
        } else {
            $fee = round(($base * 0.035) + 15.00, 2);
        }
        $total = $base + $fee;
        $payRef = strtoupper($channel) . '-' . strtoupper(Str::random(10));
        $voucherCode = 'VOUCH-' . $booking->booking_reference;

        // Auto guide assignment if unassigned
        $assignedGuideId = $booking->assigned_guide_id;
        if (!$assignedGuideId) {
            $availableGuide = TourGuide::where('status', 'available')->first();
            if ($availableGuide) {
                $assignedGuideId = $availableGuide->id;
            }
        }

        $booking->update([
            'payment_channel' => $channel,
            'payment_status' => 'paid',
            'payment_reference' => $payRef,
            'base_price' => $base,
            'gateway_fee' => $fee,
            'total_amount_paid' => $total,
            'voucher_code' => $voucherCode,
            'auto_confirmed' => true,
            'status' => 'confirmed',
            'assigned_guide_id' => $assignedGuideId,
            'paid_at' => now(),
            'admin_notes' => "Off-hours auto-confirmed via {$channel} gateway payment. Verified 0 on-site cash policy.",
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Payment authorized! Booking auto-confirmed and digital voucher generated.',
            'data' => $booking->fresh(['package', 'assignedGuide']),
        ]);
    }

    /**
     * Retrieve official Digital Tour Voucher with QR simulation & departure reminder.
     */
    public function getVoucher(string $reference): JsonResponse
    {
        $booking = PackageBooking::where('booking_reference', $reference)
            ->orWhere('id', $reference)
            ->orWhere('voucher_code', $reference)
            ->with(['package', 'assignedGuide'])
            ->first();

        if (!$booking) {
            return response()->json(['success' => false, 'message' => 'Voucher not found for booking reference'], 404);
        }

        $travelDate = $booking->travel_date ? \Carbon\Carbon::parse($booking->travel_date) : now()->addDays(2);
        $daysUntil = (int) now()->diffInDays($travelDate, false);
        $reminderText = $daysUntil <= 2
            ? "⚠️ Tour departs in {$daysUntil} day(s)! Please present this digital voucher and government IDs for all {$booking->pax_count} manifest guests."
            : "Tour scheduled in {$daysUntil} days. All inclusions and transfers are locked and confirmed.";

        $departureTime = ($booking->package && $booking->package->is_prayer_aligned)
            ? '04:30 AM (Fajr Assembly / Taluksangay Sunrise)'
            : '07:30 AM (City Tourism Reception)';

        $voucherData = [
            'voucher_code' => $booking->voucher_code ?: ('VOUCH-' . $booking->booking_reference),
            'booking_reference' => $booking->booking_reference,
            'qr_code_payload' => "HERMOSA-TOURISM://VERIFY/{$booking->booking_reference}/" . substr(sha1($booking->booking_reference . 'HERMOSA-2026'), 0, 10),
            'status' => $booking->status,
            'payment_status' => $booking->payment_status,
            'payment_channel' => $booking->payment_channel,
            'payment_reference' => $booking->payment_reference,
            'auto_confirmed' => (bool) $booking->auto_confirmed,
            'issued_at' => $booking->paid_at ?: $booking->updated_at,
            'package_title' => $booking->package?->title ?: 'Hermosa Heritage Expedition',
            'package_code' => $booking->package?->code_label ?: 'PACKAGE',
            'travel_date' => $booking->travel_date,
            'assembly_time' => $departureTime,
            'pickup_location' => 'Zamboanga City Hall Tourism Reception Desk / Accredited Hotel Terminal',
            'pax_count' => $booking->pax_count,
            'lead_tourist_name' => $booking->user_name,
            'lead_phone' => $booking->user_phone,
            'guest_roster' => $booking->tourist_roster ?: [],
            'assigned_guide' => $booking->assignedGuide ? [
                'name' => $booking->assignedGuide->name,
                'accreditation_number' => $booking->assignedGuide->accreditation_number,
                'contact_phone' => $booking->assignedGuide->contact_phone,
            ] : [
                'name' => 'City Tourism Dispatch Desk',
                'accreditation_number' => 'DOT-IX-DISPATCH',
                'contact_phone' => '+63 62 991 2656',
            ],
            'financial_breakdown' => [
                'base_price' => (float) $booking->base_price,
                'gateway_fee' => (float) $booking->gateway_fee,
                'total_amount_paid' => (float) $booking->total_amount_paid,
                'currency' => $booking->currency_preference,
            ],
            'statutory_inclusions' => $booking->package?->inclusions_matrix,
            'reminder_alert' => $reminderText,
            'security_notice' => 'Strict zero on-site cash policy. Do not pay any fees to unauthorized handlers or personal accounts.',
        ];

        return response()->json([
            'success' => true,
            'data' => $voucherData,
        ]);
    }

    /**
     * Get booking inquiries for Web Admin dashboard.
     */
    public function bookings(Request $request): JsonResponse
    {
        $query = PackageBooking::with(['package', 'assignedGuide'])->orderBy('created_at', 'desc');

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('search') && !empty($request->search)) {
            $q = $request->search;
            $query->where(function ($sub) use ($q) {
                $sub->where('user_name', 'like', "%{$q}%")
                    ->orWhere('booking_reference', 'like', "%{$q}%")
                    ->orWhere('user_email', 'like', "%{$q}%")
                    ->orWhere('user_nationality', 'like', "%{$q}%");
            });
        }

        $bookings = $query->get();

        return response()->json([
            'success' => true,
            'count' => $bookings->count(),
            'data' => $bookings,
        ]);
    }

    /**
     * Update booking status & guide assignment by Tourism Officer.
     */
    public function updateBookingStatus(Request $request, int $id): JsonResponse
    {
        $booking = PackageBooking::findOrFail($id);

        $validated = $request->validate([
            'status' => 'nullable|string|in:pending,confirmed,completed,cancelled',
            'assigned_guide_id' => 'nullable|exists:tour_guides,id',
            'admin_notes' => 'nullable|string|max:500',
        ]);

        if (isset($validated['status'])) {
            $booking->status = $validated['status'];
        }
        if (array_key_exists('assigned_guide_id', $validated)) {
            $booking->assigned_guide_id = $validated['assigned_guide_id'];
        }
        if (isset($validated['admin_notes'])) {
            $booking->admin_notes = $validated['admin_notes'];
        }

        $booking->save();

        return response()->json([
            'success' => true,
            'message' => 'Booking updated successfully',
            'data' => $booking->load(['package', 'assignedGuide']),
        ]);
    }

    /**
     * Get accredited tour guides roster.
     */
    public function guides(): JsonResponse
    {
        $guides = TourGuide::orderBy('rating', 'desc')->get();

        return response()->json([
            'success' => true,
            'count' => $guides->count(),
            'data' => $guides,
        ]);
    }
}
