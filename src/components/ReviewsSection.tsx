import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, User } from 'lucide-react';
import { ReviewItem } from '../utils/storage';

interface ReviewsSectionProps {
  lang: 'en' | 'hi';
  reviews: ReviewItem[];
  onAddReview: (review: ReviewItem) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  lang,
  reviews,
  onAddReview,
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [serviceDone, setServiceDone] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: authorName.trim(),
      eventEn: serviceDone.trim() || 'Verified Client Experience',
      eventHi: serviceDone.trim() || 'सत्यापित क्लाइंट अनुभव',
      rating,
      textEn: reviewText.trim(),
      textHi: reviewText.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    onAddReview(newRev);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowReviewModal(false);
      setAuthorName('');
      setServiceDone('');
      setReviewText('');
      setRating(5);
    }, 1500);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#93523B]">
              {lang === 'hi' ? '07. क्लाइंट संतुष्टि व अनुभव' : '07. Client Experiences'}
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#241D1A]">
              {lang === 'hi' ? 'हमारे क्लाइंट्स की जुबानी' : 'Stories of Radiance'}
            </h2>
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center text-[#E5A83B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-[#241D1A]">4.9 / 5.0</span>
              <span className="text-xs text-[#7A675B]">
                {lang === 'hi' ? '· 1,840+ गूगल व वेडमीगुड रिव्यूज' : '· Based on 1,840+ verified client ratings'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-4 py-2.5 text-xs sm:text-sm font-medium text-[#241D1A] bg-[#EFE9E0] hover:bg-[#E2D6C8] border border-[#D8C7B8] rounded-md transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#93523B]" />
            <span>{lang === 'hi' ? 'अपना रिव्यू लिखें' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => {
            const eventLabel = lang === 'hi' ? rev.eventHi : rev.eventEn;
            const textContent = lang === 'hi' ? rev.textHi : rev.textEn;

            return (
              <div
                key={rev.id}
                className="bg-white rounded-xl border border-[#DFCEBE] p-6 flex flex-col justify-between shadow-xs hover:border-[#B5917B] transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#E5A83B]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    {rev.date && (
                      <span className="text-[11px] text-[#9B8A7E]">{rev.date}</span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#4F3F36] leading-relaxed italic">
                    "{textContent}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F2ECE5] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EAE0D5] flex items-center justify-center text-[#93523B] font-bold text-xs">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#241D1A]">{rev.name}</h4>
                    <p className="text-[11px] text-[#7A675B]">{eventLabel}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Modal Form */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] max-w-md w-full rounded-2xl border border-[#D9C8B9] p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-[#7A675B] hover:text-[#241D1A] text-lg font-bold p-1"
            >
              ✕
            </button>

            {submittedMessage ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#93523B] mx-auto animate-bounce" />
                <h3 className="font-serif-luxury text-2xl font-bold text-[#241D1A]">
                  {lang === 'hi' ? 'आपका रिव्यू दर्ज हो गया!' : 'Thank you for your review!'}
                </h3>
                <p className="text-xs text-[#7A675B]">
                  {lang === 'hi' ? 'हम आपके बहुमूल्य फीडबैक का सम्मान करते हैं।' : 'Your feedback has been successfully published.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#241D1A]">
                    {lang === 'hi' ? 'अपना अनुभव साझा करें' : 'Share Your Salon Experience'}
                  </h3>
                  <p className="text-xs text-[#7A675B]">
                    {lang === 'hi' ? 'आपकी राय अन्य क्लाइंट्स के लिए मार्गदर्शक बनेगी।' : 'Help other clients discover our bespoke beauty artistry.'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A] mb-1">
                    {lang === 'hi' ? 'आपका नाम' : 'Your Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D9C8B9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#93523B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A] mb-1">
                    {lang === 'hi' ? 'सेवा / अवसर (Service or Event)' : 'Treatment / Wedding Occasion'}
                  </label>
                  <input
                    type="text"
                    value={serviceDone}
                    onChange={(e) => setServiceDone(e.target.value)}
                    placeholder="e.g. HD Bridal Makeover / Balayage Hair Spa"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D9C8B9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#93523B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A] mb-1">
                    {lang === 'hi' ? 'रेटिंग (Rating)' : 'Rating'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-[#E5A83B]"
                      >
                        <Star
                          className={`w-5 h-5 ${star <= rating ? 'fill-current' : 'text-[#D0C2B4]'}`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-[#5C4D44] ml-2">{rating} / 5 Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A] mb-1">
                    {lang === 'hi' ? 'समीक्षा विवरण (Your Review)' : 'Review Details'} *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={lang === 'hi' ? 'आपका अनुभव कैसा रहा? स्टाफ, हाइजीन, रिजल्ट्स...' : 'How was your experience? Artist skill, hygiene, final glow...'}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D9C8B9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#93523B]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 text-xs font-medium text-[#5C4D44] hover:bg-[#EFE9E0] rounded-md"
                  >
                    {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#2B2320] hover:bg-[#93523B] rounded-md transition-colors shadow-sm"
                  >
                    {lang === 'hi' ? 'रिव्यू सबमिट करें' : 'Submit Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
