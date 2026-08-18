import React, { useState } from 'react';
import { MessageSquare, Star, CheckCircle, XCircle, ShieldCheck, Flag } from 'lucide-react';

export default function ReviewModeration({ pois, searchFilter = '' }) {
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

  const [filterRating, setFilterRating] = useState('all');

  const handleApprove = (id) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)));
  };

  const handleFlag = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const filtered = reviews.filter((r) => {
    const matchRating = filterRating === 'all' || r.rating === Number(filterRating);
    const query = searchFilter.trim().toLowerCase();
    const matchSearch =
      query === '' ||
      r.placeName.toLowerCase().includes(query) ||
      r.author.toLowerCase().includes(query) ||
      r.comment.toLowerCase().includes(query);
    return matchRating && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Moderation Filter Toolbar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 mr-1">Filter Reviews:</span>
          {[
            { id: 'all', label: `All Reviews (${filtered.length})` },
            { id: '5', label: '⭐ 5 Stars Only' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterRating(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterRating === item.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified Pilgrim Checkmarks Active</span>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-3">
        {filtered.map((rev) => (
          <div key={rev.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-emerald-300 transition-all">
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
