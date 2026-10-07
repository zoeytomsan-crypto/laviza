import React, { useState } from 'react';
import { ASSET_IMAGES } from '../assets/images';
import { Sparkles, ArrowRight } from 'lucide-react';

interface TransformationGalleryProps {
  lang: 'en' | 'hi';
  onBookServiceType: (serviceCategory: string) => void;
}

export const TransformationGallery: React.FC<TransformationGalleryProps> = ({
  lang,
  onBookServiceType,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'bridal' | 'hair' | 'skin' | 'spa'>('all');

  const galleryItems = [
    {
      id: 'g-1',
      type: 'bridal',
      titleEn: 'Royal Rajputi & Temple Bridal Makeover',
      titleHi: 'रॉयल राजपूती व टेम्पल ब्राइडल मेकओवर',
      detailsEn: 'Temptu Pro HD Airbrush with 24-hr transfer-proof setting and micro-velvet skin finish.',
      detailsHi: '24-घंटे टिकने वाला टेम्पटू एचडी एयरब्रश और मखमली स्किन फिनिश।',
      image: ASSET_IMAGES.bridalMakeup,
      categoryLabelEn: 'Bridal Couture',
      categoryLabelHi: 'ब्राइडल कॉट्योर',
    },
    {
      id: 'g-2',
      type: 'hair',
      titleEn: 'Sun-Kissed Mocha & Honey Balayage',
      titleHi: 'सन-किस्ड मोका व हनी बलेयाज',
      detailsEn: 'Seamless root shadow blending with Olaplex bond multiplier and mirror glaze blowout.',
      detailsHi: 'ओलाप्लेक्स बॉन्ड रिपेयर और शाइनिंग मिरर ग्लेज ब्लो-आउट के साथ डाइमेंशनल कलर।',
      image: ASSET_IMAGES.hairStyling,
      categoryLabelEn: 'Hair Artistry',
      categoryLabelHi: 'हेयर आर्टिस्टिक',
    },
    {
      id: 'g-3',
      type: 'skin',
      titleEn: '7-Step Clinical HydraFacial & Cryo Infusion',
      titleHi: '7-स्टेप क्लिनिकल हाइड्रा-फेशियल व क्रायो इन्फ्यूजन',
      detailsEn: 'Complete extraction of clogged sebum followed by peptide infusion and oxygen glow therapy.',
      detailsHi: 'गहराई से ब्लैकहेड्स की सफाई, पेप्टाइड सीरम और ऑक्सीजन ग्लो थेरेपी।',
      image: ASSET_IMAGES.skincareFacial,
      categoryLabelEn: 'Skin Aesthetics',
      categoryLabelHi: 'स्किन एस्थेटिक्स',
    },
    {
      id: 'g-4',
      type: 'spa',
      titleEn: 'Holistic Aromatherapy & Hot Stone Sanctuary',
      titleHi: 'होलिस्टिक अरोमाथेरेपी व हॉट स्टोन स्पा',
      detailsEn: 'Full-body muscle relaxation with warm organic cedarwood oils and pressure point recovery.',
      detailsHi: 'गर्म सीडरवुड ऑयल और हॉट स्टोन थेरेपी से शरीर की थकान से मुक्ति।',
      image: ASSET_IMAGES.spaWellness,
      categoryLabelEn: 'Wellness Spa',
      categoryLabelHi: 'वेलनेस स्पा',
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeTab === 'all' || item.type === activeTab
  );

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#93523B]">
              {lang === 'hi' ? '05. स्टूडियो आर्टिस्ट्री व ट्रांसफॉर्मेशन' : '05. Editorial Portfolio'}
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#241D1A]">
              {lang === 'hi' ? 'वास्तविक बदलाव व कलाकारी' : 'Real Transformations in Motion'}
            </h2>
            <p className="text-sm sm:text-base text-[#6E5D53]">
              {lang === 'hi'
                ? 'हमारे क्लाइंट्स की तस्वीरें जो बयां करती हैं विशेषज्ञता और बारीकी।'
                : 'Unretouched mastery across royal weddings, hair couture, and dermatological skin therapies.'}
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EFE9E0] rounded-lg self-start md:self-auto">
            {[
              { id: 'all', labelEn: 'All Work', labelHi: 'सभी' },
              { id: 'bridal', labelEn: 'Bridal', labelHi: 'ब्राइडल' },
              { id: 'hair', labelEn: 'Hair', labelHi: 'हेयर' },
              { id: 'skin', labelEn: 'Skin', labelHi: 'स्किन' },
              { id: 'spa', labelEn: 'Spa', labelHi: 'स्पा' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-[#241D1A] shadow-xs'
                    : 'text-[#6A5A50] hover:text-[#241D1A]'
                }`}
              >
                {lang === 'hi' ? tab.labelHi : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => {
            const title = lang === 'hi' ? item.titleHi : item.titleEn;
            const details = lang === 'hi' ? item.detailsHi : item.detailsEn;
            const cat = lang === 'hi' ? item.categoryLabelHi : item.categoryLabelEn;

            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-[#DFCEBE] overflow-hidden shadow-xs hover:border-[#B5917B] hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E5D8CC]">
                  <img
                    src={item.image}
                    alt={title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-[#241D1A]/80 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
                    {cat}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#241D1A] group-hover:text-[#93523B] transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6A5A50] leading-relaxed">
                      {details}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F2ECE5] flex items-center justify-between">
                    <span className="text-xs text-[#93523B] font-semibold">
                      {lang === 'hi' ? 'प्रमाणित क्लाइंट ट्रांसफॉर्मेशन' : 'Verified Client Result'}
                    </span>
                    <button
                      onClick={() => onBookServiceType(item.type)}
                      className="text-xs font-semibold text-[#2B2320] hover:text-[#93523B] flex items-center gap-1 group/btn"
                    >
                      <span>{lang === 'hi' ? 'यह लुक बुक करें' : 'Book this treatment'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
