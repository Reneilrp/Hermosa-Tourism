import React, { useState } from 'react';
import {
  MessageSquare,
  Star,
  CheckCircle,
  XCircle,
  ShieldCheck,
  Flag,
  Search,
  X,
  Droplets,
  Users,
  Check,
  Sparkles,
  Calendar,
  ThumbsUp,
  AlertTriangle,
} from 'lucide-react';

export default function ReviewModeration({ pois = [], onApproveTrigger }) {
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      placeName: 'Sadik Grand Mosque (Mercedes)',
      author: 'Dr. Faisal Rahman',
      origin: 'Kuala Lumpur, Malaysia',
      rating: 5,
      date: 'Yesterday',
      comment:
        'Truly the crowning jewel of Islamic architecture in Zamboanga City! The Sadik Grand Mosque in Mercedes is immensely spacious, impeccably clean, and the acoustics during prayer are awe-inspiring.',
      status: 'approved',
      verifiedWudu: true,
      verifiedFemale: true,
    },
    {
      id: 'rev-2',
      placeName: 'Bay Tal Mal Authentic Halal Restaurant',
      author: 'Nadia Hassan',
      origin: 'Davao City, Philippines',
      rating: 5,
      date: '2 days ago',
      comment:
        'The best Tiula Itum in Zamboanga! The beef was so tender and the broth rich with roasted pamapa. Clean prayer room upstairs.',
      status: 'pending',
      verifiedWudu: true,
      verifiedFemale: true,
    },
    {
      id: 'rev-3',
      placeName: 'Jimmy’s Satti & Halal Eatery',
      author: 'Kareem Idris',
      origin: 'Bandar Seri Begawan, Brunei',
      rating: 4,
      date: '4 days ago',
      comment:
        'You cannot leave Zamboanga without eating here for breakfast! The satti sauce is unmatched in flavor.',
      status: 'pending',
      verifiedWudu: false,
      verifiedFemale: false,
    },
    {
      id: 'rev-4',
      placeName: 'Masjid Baliwasan (WMSU)',
      author: 'Amina Al-Mansoor',
      origin: 'Cotabato City, BARMM',
      rating: 5,
      date: '5 days ago',
      comment:
        'Clean ablution facilities with continuous water pressure. Very safe and convenient for female university students.',
      status: 'approved',
      verifiedWudu: true,
      verifiedFemale: true,
    },
  ]);

  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleApprove = (id) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)));
    setFeedbackMsg('Review verified and published to mobile app.');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleFlag = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setFeedbackMsg('Review removed from public feed.');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleApproveAll = () => {
    setReviews((prev) => prev.map((r) => ({ ...r, status: 'approved' })));
    setFeedbackMsg('All pending visitor reviews have been verified and approved!');
    setTimeout(() => setFeedbackMsg(''), 3500);
  };

  // Expose approve all through external trigger if passed
  React.useEffect(() => {
    if (onApproveTrigger) {
      handleApproveAll();
    }
  }, [onApproveTrigger]);

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;
  const approvedCount = reviews.filter((r) => r.status === 'approved').length;

  const filtered = reviews.filter((r) => {
    const matchRating = filterRating === 'all' || r.rating === Number(filterRating);
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    const query = search.trim().toLowerCase();
    const matchSearch =
      query === '' ||
      r.placeName.toLowerCase().includes(query) ||
      r.author.toLowerCase().includes(query) ||
      r.comment.toLowerCase().includes(query);
    return matchRating && matchStatus && matchSearch;
  });

  return (
    <div className="space-y-5">
      {/* Toast Feedback Banner */}
      {feedbackMsg && (
        <div className="p-3.5 bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-md flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span>{feedbackMsg}</span>
          </div>
          <button
            onClick={() => setFeedbackMsg('')}
            className="text-white hover:text-emerald-100 p-0.5 cursor-pointer"
            aria-label="Dismiss feedback"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. REVIEW MODERATION TELEMETRY STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Total Community Feedback
            </div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{reviews.length}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Verified pilgrim check-ins</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
              Pending Moderation
            </div>
            <div className="text-xl font-black text-amber-800 mt-0.5">{pendingCount}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Awaiting verification</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 shrink-0 border border-amber-100">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
              Published & Certified
            </div>
            <div className="text-xl font-black text-emerald-800 mt-0.5">{approvedCount}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Active in mobile app guide</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 border border-emerald-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. FILTER & ACTION TOOLBAR */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reviewer, venue, feedback..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none transition-all"
            />
            {search.length > 0 && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none cursor-pointer shrink-0 transition-colors"
          >
            <option value="all">All Ratings</option>
            <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
            <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
            <option value="3">⭐⭐⭐ (3 Stars)</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none cursor-pointer shrink-0 transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending ({pendingCount})</option>
            <option value="approved">Approved ({approvedCount})</option>
          </select>
        </div>

        {/* Batch Action: Approve All Verified */}
        <button
          onClick={handleApproveAll}
          className="bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Approve All Verified</span>
        </button>
      </div>

      {/* 3. MODERATION FEED CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <MessageSquare className="w-8 h-8 text-slate-300 stroke-1 mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-700">No reviews found</div>
            <p className="text-xs text-slate-400 mt-1">Try switching filters or clearing keywords.</p>
          </div>
        ) : (
          filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 hover:shadow-sm transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-2.5 pb-2 border-b border-slate-100">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {rev.placeName}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-bold text-slate-700">{rev.author}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-500">{rev.origin || 'Visitor'}</span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md border shrink-0 ${
                      rev.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {rev.status === 'approved' ? '✓ Published' : '⏳ Pending'}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 text-xs">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-200 text-slate-200'
                        }`}
                      />
                    ))}
                    <span className="font-extrabold text-slate-900 ml-1">{rev.rating}.0</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                {/* Review Quote */}
                <p className="text-xs text-slate-700 leading-relaxed mt-2.5 bg-slate-50/70 p-3 rounded-xl border border-slate-100 italic">
                  "{rev.comment}"
                </p>

                {/* Verified Badges */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {rev.verifiedWudu && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                      <Droplets className="w-3 h-3 text-blue-600" />
                      <span>Verified Running Wudu</span>
                    </span>
                  )}
                  {rev.verifiedFemale && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      <Users className="w-3 h-3 text-emerald-600" />
                      <span>Verified Female Space</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Pilgrim Visit
                </span>

                <div className="flex items-center gap-1.5">
                  {rev.status === 'pending' ? (
                    <button
                      onClick={() => handleApprove(rev.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      ✓ Approved
                    </span>
                  )}

                  <button
                    onClick={() => handleFlag(rev.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                    title="Remove Review"
                    aria-label={`Flag or remove review by ${rev.author}`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
