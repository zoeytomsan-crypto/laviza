import React from 'react';
import { Check, Sparkles, HeartHandshake } from 'lucide-react';
import { BRIDAL_PACKAGES, BridalPackage } from '../data/salonData';
import { ASSET_IMAGES } from '../assets/images';

interface BridalPackagesProps {
  lang: 'en' | 'hi';
  onSelectPackage: (pkg: BridalPackage) => void;
  onOpenCalculator: () => void;
}

export const BridalPackages: React.FC<BridalPackagesProps> = ({
  lang,
  onSelectPackage,
  onOpenCalculator,
}) => {
  return (
    <section id="bridal" className="py-16 sm:py-24 bg-[#F5EFE8] border-b border-[#E3D4C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#93523B]">
            {lang === 'hi' ? '02. ब्राइडल कॉट्योर सूइट' : '02. Haute Bridal Suite'}
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#241D1A]">
            {lang === 'hi' ? 'रॉयल दुल्हन के लिए संपूर्ण मेकओवर पैकेजेस' : 'Curated Royal Bridal Collections'}
          </h2>
          <p className="text-sm sm:text-base text-[#6E5D53]">
            {lang === 'hi'
              ? 'शादी के दिन आपका हर पल यादगार रहे। हमारे पैकेजेस में प्री-ब्राइडल ग्लो सिटिंग्स, एचडी एयरब्रश, हेयर स्टाइलिंग व दुपट्टा ड्रेपिंग शामिल हैं।'
              : 'Flawlessly planned regimens blending medical pre-bridal aesthetics with cinematic big-day artistry.'}
          </p>
        </div>

        {/* Highlight Image Banner & Package Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg bg-[#E2D4C6] border border-[#D5C2B1] relative flex flex-col justify-end min-h-[380px]">
            <img
              src={ASSET_IMAGES.bridalMakeup}
              alt="Bridal Makeup Artistry at Aura & Noor"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1714]/85 via-[#1F1714]/30 to-transparent" />
            <div className="relative p-6 sm:p-8 text-white space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E8C5A8]">
                {lang === 'hi' ? 'सिग्नेचर ब्राइडल सर्विस' : 'Signature Bridal Suite'}
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold">
                {lang === 'hi' ? '100% वाटरप्रूफ, टियर-प्रूफ ब्राइडल बेस' : 'Waterproof & Tear-Resistant Mastery'}
              </h3>
              <p className="text-xs text-[#E3D1C3] leading-relaxed">
                {lang === 'hi'
                  ? 'फेरों की गर्मी, पसीने और विदाई के आंसुओं में भी आपका चेहरा 18 घंटे तक बिल्कुल नया और चमकदार बना रहता है।'
                  : 'Engineered with lightweight silicon bases to maintain dewy radiance under 4K video lights and emotional moments.'}
              </p>
            </div>
          </div>

          {/* Bridal Package Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {BRIDAL_PACKAGES.map((pkg) => {
              const name = lang === 'hi' ? pkg.nameHi : pkg.nameEn;
              const desc = lang === 'hi' ? pkg.descHi : pkg.descEn;
              const badge = lang === 'hi' ? pkg.badgeHi : pkg.badgeEn;
              const includes = lang === 'hi' ? pkg.includesHi : pkg.includesEn;
              const rec = lang === 'hi' ? pkg.recommendedForHi : pkg.recommendedForEn;

              return (
                <div
                  key={pkg.id}
                  className="bg-white rounded-xl border border-[#DFCEBE] p-6 shadow-xs hover:border-[#B5917B] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div>
                      {badge && (
                        <div className="text-[11px] font-bold text-[#93523B] uppercase tracking-wider mb-1">
                          {badge}
                        </div>
                      )}
                      <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#271E1A]">
                        {name}
                      </h4>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#241D1A] tabular-nums">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                      <p className="text-[10px] text-[#8C7A6E]">
                        {lang === 'hi' ? 'सम्पूर्ण पैकेज मूल्य' : 'Complete Package'}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5C4D44] mb-4">{desc}</p>

                  <div className="space-y-1.5 pt-3 border-t border-[#F2E8DF] mb-4">
                    {includes.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#4F3F36]">
                        <Check className="w-3.5 h-3.5 text-[#93523B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#F2E8DF]">
                    <span className="text-[11px] text-[#7A675B] italic">
                      {lang === 'hi' ? `सुझाव: ${rec}` : `Ideal for: ${rec}`}
                    </span>

                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#2B2320] hover:bg-[#93523B] rounded-md transition-colors self-start sm:self-auto shadow-xs active:scale-95"
                    >
                      {lang === 'hi' ? 'यह पैकेज बुक करें' : 'Reserve This Package'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Calculator Banner */}
        <div className="bg-[#EFE5DA] rounded-2xl p-6 sm:p-8 border border-[#DECFC1] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold uppercase text-[#93523B]">
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'hi' ? 'कस्टम वेडिंग कोटेशन' : 'Custom Wedding Estimator'}</span>
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#261E1A]">
              {lang === 'hi'
                ? 'शादी के कई फंक्शन्स या परिवार के सदस्यों के लिए खुद का पैकेज बनाएं'
                : 'Designing a bespoke multi-event wedding trousseau?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#67544A] max-w-xl">
              {lang === 'hi'
                ? 'हमारे इंटरएक्टिव कैलकुलेटर से मेहंदी, संगीत, शादी और बहनों/माताजी के मेकओवर को जोड़कर तुरंत लाइव कोटेशन प्राप्त करें।'
                : 'Select events, party count, venue travel, and customized looks for an instant itemized estimate with package discounts.'}
            </p>
          </div>

          <button
            onClick={onOpenCalculator}
            className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#93523B] hover:bg-[#7D422E] rounded-md transition-colors shadow flex items-center gap-2 whitespace-nowrap active:scale-95 shrink-0"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>{lang === 'hi' ? 'कैलकुलेटर खोलें' : 'Open Custom Calculator'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
