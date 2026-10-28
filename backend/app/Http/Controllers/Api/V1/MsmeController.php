<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\HalalCertificate;
use App\Models\MsmeApplication;
use App\Models\Poi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MsmeController extends Controller
{
    /**
     * List all MSME applications for Web Admin moderation.
     */
    public function index(Request $request): JsonResponse
    {
        $status = $request->query('status');
        $query = MsmeApplication::with('createdPoi')->latest();

        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        return response()->json([
            'success' => true,
            'data' => $query->get(),
        ]);
    }

    /**
     * Submit a public MSME Halal Self-Declaration Application.
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'business_name' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'contact_phone' => 'required|string|max:50',
            'email' => 'nullable|email|max:255',
            'region' => 'nullable|string|max:100',
            'province' => 'required|string|max:100',
            'city_municipality' => 'required|string|max:100',
            'address' => 'required|string|max:500',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'category' => 'nullable|string|in:dining,market,lodging,cultural',
            'target_tier' => 'required|string|in:tier2,tier3',
            'cuisine_specialty' => 'nullable|string|max:255',
            'meat_supplier_name' => 'nullable|string|max:255',
            'strictly_no_pork_alcohol' => 'required|boolean',
            'has_prayer_corner' => 'nullable|boolean',
            'kitchen_practices_description' => 'required|string|max:2000',
            'photo_attachments' => 'nullable|array',
        ]);

        $appNumber = 'MSME-'.date('Y').'-'.strtoupper(Str::random(5));

        $application = MsmeApplication::create([
            'application_number' => $appNumber,
            'business_name' => $validated['business_name'],
            'owner_name' => $validated['owner_name'],
            'contact_phone' => $validated['contact_phone'],
            'email' => $validated['email'] ?? null,
            'region' => $validated['region'] ?? 'Region IX',
            'province' => $validated['province'],
            'city_municipality' => $validated['city_municipality'],
            'address' => $validated['address'],
            'latitude' => $validated['latitude'] ?? 6.9214,
            'longitude' => $validated['longitude'] ?? 122.0790,
            'category' => $validated['category'] ?? 'dining',
            'target_tier' => $validated['target_tier'],
            'cuisine_specialty' => $validated['cuisine_specialty'] ?? null,
            'meat_supplier_name' => $validated['meat_supplier_name'] ?? null,
            'strictly_no_pork_alcohol' => $validated['strictly_no_pork_alcohol'],
            'has_prayer_corner' => $validated['has_prayer_corner'] ?? false,
            'kitchen_practices_description' => $validated['kitchen_practices_description'],
            'photo_attachments' => $validated['photo_attachments'] ?? [],
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Your Halal Self-Declaration application has been submitted successfully for verification.',
            'data' => $application,
        ], 201);
    }

    /**
     * Approve or reject an application (and auto-create a POI upon approval).
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $application = MsmeApplication::find($id);

        if (! $application) {
            return response()->json([
                'success' => false,
                'message' => 'Application not found',
            ], 404);
        }

        $validated = $request->validate([
            'status' => 'required|in:approved,rejected,pending',
            'admin_notes' => 'nullable|string',
        ]);

        $application->status = $validated['status'];
        $application->admin_notes = $validated['admin_notes'] ?? $application->admin_notes;

        // If approved and no POI created yet, create the POI entry automatically
        if ($validated['status'] === 'approved' && ! $application->created_poi_id) {
            $poi = Poi::create([
                'custom_id' => 'poi-msme-'.strtolower(Str::slug($application->business_name)).'-'.strtolower(Str::random(4)),
                'name' => $application->business_name,
                'slug' => Str::slug($application->business_name),
                'category' => $application->category,
                'tier' => $application->target_tier,
                'region' => $application->region,
                'province' => $application->province,
                'city_municipality' => $application->city_municipality,
                'latitude' => $application->latitude ?? 6.9214,
                'longitude' => $application->longitude ?? 122.0790,
                'address' => $application->address,
                'phone' => $application->contact_phone,
                'cuisine' => $application->cuisine_specialty ?? 'Authentic Muslim-Friendly Dining',
                'price_range' => '₱',
                'operating_hours' => '08:00 AM - 08:00 PM Daily',
                'image_url' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                'description' => $application->kitchen_practices_description,
                'rating' => 5.00,
                'review_count' => 0,
                'is_verified' => true,
                'is_active' => true,
            ]);

            HalalCertificate::create([
                'poi_id' => $poi->id,
                'cert_body' => 'Community Halal Self-Declaration (Verified by Admin)',
                'cert_number' => $application->application_number,
                'status' => 'approved',
                'valid_until' => now()->addYear()->toDateString(),
            ]);

            $application->created_poi_id = $poi->id;
        }

        $application->save();

        return response()->json([
            'success' => true,
            'message' => "Application status updated to {$application->status}",
            'data' => $application->load('createdPoi'),
        ]);
    }
}
