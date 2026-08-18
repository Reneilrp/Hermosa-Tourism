import React, { useState } from 'react';
import { MessageSquare, Star, CheckCircle, XCircle, ShieldCheck, Flag } from 'lucide-react';

export default function ReviewModeration({ pois }) {
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      placeName: 'Sadik Grand Mosque (Mercedes)',
      author: 'Dr. Faisal Rahman',
      rating: 5,
      date: 'Yesterday',
      comment: 'Truly the crowning jewel of Islamic architecture in Zamboanga City! The Sadik Grand Mosque in Mercedes is immensely spacious, impeccably clean, and the acoustics during prayer are awe-inspiring.',
      status: 'approved',
      verifiedWudu: true,
      verifiedFemale: true,
    },
    {
      id: 'rev-2',
      placeName: 'Bay Tal Mal Authentic Halal Restaurant',
      author: 'Nadia Hassan',
      rating: 5,
      date: '2 days ago',
      comment: 'The best Tiula Itum in Zamboanga! The beef was so tender and the broth rich with roasted pamapa. Clean prayer room upstairs.',
      status: 'approved',
      verifiedWudu: true,
      verifiedFemale: true,
    },
    {
      id: 'rev-3',
      placeName: 'Jimmy’s Satti & Halal Eatery',
      author: 'Kareem Idris',
      rating: 5,
      date: '4 days ago',
      comment: 'You cannot leave Zamboanga without eating here for breakfast! The satti sauce is unmatched in flavor.',
      status: 'approved',
      verifiedWudu: false,
      verifiedFemale: false,
    },
  ]);

  const handleApprove = (id) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)));
  };

  const handleFlag = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          Community Reviews & Visitor Verification Moderation
        </h2>
        <p className="text-xs text-slate-500">
          Moderate community feedback, verify pilgrim visit checkmarks, and flag inappropriate submissions
        </p>
      </div>

      {/* Review List */}
      <div className="space-y-3">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900">{rev.placeName}</span>
                <span className="text-[11px] font-semibold text-slate-400">• {rev.date}</span>
                <div className="flex items-center text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">"{rev.comment}"</p>
              <div className="flex items-center gap-3 pt-1 text-[11px]">
                <span className="font-bold text-slate-500">By {rev.author}</span>
                {rev.verifiedWudu && (
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                    ✓ Verified Wudu Ablution
                  </span>
                )}
                {rev.verifiedFemale && (
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                    ✓ Verified Female Area
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleApprove(rev.id)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs hover:bg-emerald-100 transition-all cursor-pointer"
              >
                Approve & Feature
              </button>
              <button
                onClick={() => handleFlag(rev.id)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                title="Flag Review"
              >
                <Flag className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
