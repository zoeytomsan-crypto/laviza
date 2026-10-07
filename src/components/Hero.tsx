import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Star, Clock } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/images';

interface HeroProps {
  lang: 'en' | 'hi';
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Proposition */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Clean unboxed editorial kicker - NO PILLS */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-[#93523B]">
              <span>Haute Bridal Studio</span>
              <span aria-hidden="true">·</span>
              <span>Bespoke Hair & Skin Spa</span>
              <span aria-hidden="true">·</span>
              <span>Bandra West</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#241D1A] leading-[1.12] tracking-tight [text-wrap:balance]">
              {lang === 'hi' ? (
                <>
                  शाही ब्राइडल निखार और <br className="hidden sm:block" />
                  <span className="italic font-normal text-[#93523B]">आधुनिक ब्यूटी एस्थेटिक्स</span> का संगम
                </>
              ) : (
                <>
                  Where Timeless Bridal Elegance Meets{' '}
                  <span className="italic font-normal text-[#93523B]">Modern Aesthetic Artistry</span>
                </>
              )}
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-[#5C4D44] max-w-2xl leading-relaxed">
              {lang === 'hi'
                ? 'मुंबई का सबसे विश्वसनीय लक्जरी पार्लर। विशेषज्ञ सेलिब्रिटी आर्टिस्ट्स, टेम्पटू एचडी एयरब्रश, हाइड्रा-फेशियल एवं 100% स्टरलाइज्ड टूल्स के साथ आपको मिलता है बेदाग, ग्लोइंग लुक।'
                : 'Experience premier salon care curated by master cosmetologists and celebrity makeup artists. From bespoke HD bridal trousseau to medical-grade HydraFacials and Parisian balayage.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 bg-[#2B2320] hover:bg-[#93523B] text-white font-medium text-sm rounded-md transition-all shadow hover:shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>{lang === 'hi' ? 'अपॉइंटमेंट स्लॉट बुक करें' : 'Book Your Appointment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="px-6 py-3.5 bg-white hover:bg-[#F4EFEA] text-[#3D312A] border border-[#D9C8B9] font-medium text-sm rounded-md transition-colors text-center"
              >
                {lang === 'hi' ? 'रेट कार्ड व सेवाएं देखें' : 'Explore Services & Pricing'}
              </a>
            </div>

            {/* Proof Metric Strip (Claim-to-proof adjacency) */}
            <div className="pt-6 border-t border-[#EAE3DA] grid grid-cols-3 gap-4">
              <div>
                <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#241D1A] tabular-nums">
                  1,800+
                </p>
                <p className="text-xs text-[#7A675B] mt-0.5">
                  {lang === 'hi' ? 'संतुष्ट दुल्हनें' : 'Brides Styled'}
                </p>
              </div>
              <div>
                <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#241D1A] tabular-nums">
                  4.9 / 5.0
                </p>
                <p className="text-xs text-[#7A675B] mt-0.5">
                  {lang === 'hi' ? 'गूगल व वेडमीगुड रेटिंग' : 'Verified Google Rating'}
                </p>
              </div>
              <div>
                <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#241D1A] tabular-nums">
                  12+ Yrs
                </p>
                <p className="text-xs text-[#7A675B] mt-0.5">
                  {lang === 'hi' ? 'अनुभव व कला' : 'Master Artistry'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#E8DDD2] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] border border-[#DFD1C4]">
              <img
                src={ASSET_IMAGES.heroSalon}
                alt="Aura & Noor Luxury Beauty Salon Interior in Mumbai"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  // Fallback container in case image fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201815]/75 via-transparent to-transparent pointer-events-none" />

              {/* Quiet editorial photo caption overlay */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="flex items-center gap-2 text-xs text-[#E9D7C9] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#D8A47F]" />
                  <span>{lang === 'hi' ? '100% हाइजीनिक व स्टरलाइज्ड स्टूडियो' : '100% Medical-grade Sterilization'}</span>
                </div>
                <p className="font-serif-luxury text-lg font-medium leading-snug">
                  {lang === 'hi'
                    ? 'बांद्रा वेस्ट, लिंकिंग रोड स्थित हमारा फ्लैगशिप बुटीक स्टूडियो'
                    : 'Our Flagship Sanctuary on Linking Road, Bandra West'}
                </p>
              </div>
            </div>

            {/* Decorative accent element */}
            <div className="absolute -bottom-4 -left-4 bg-[#FAF8F5] p-3 rounded-lg border border-[#DECFC6] shadow-md hidden sm:flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EAE0D5] flex items-center justify-center text-[#93523B]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-[#2F2520]">
                  {lang === 'hi' ? 'प्री-ब्राइडल कंसल्टेशन' : 'Bridal Consultations'}
                </p>
                <p className="text-[#7A675B]">
                  {lang === 'hi' ? 'मुफ्त स्किन एनालिसिस शामिल' : 'Complimentary Skin Analysis'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
