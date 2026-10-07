import React from 'react';
import { Award, Clock, Sparkles } from 'lucide-react';
import { STYLISTS, Stylist } from '../data/salonData';

interface SpecialistsSectionProps {
  lang: 'en' | 'hi';
  onSelectStylist: (stylist: Stylist) => void;
}

export const SpecialistsSection: React.FC<SpecialistsSectionProps> = ({
  lang,
  onSelectStylist,
}) => {
  return (
    <section id="specialists" className="py-16 sm:py-24 bg-[#F7F2EC] border-b border-[#E3D6C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#93523B]">
            {lang === 'hi' ? '04. विशेषज्ञ आर्टिस्ट्स व कॉस्मेटोलॉजिस्ट' : '04. Certified Master Stylists'}
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#241D1A]">
            {lang === 'hi' ? 'मिलिए हमारी सेलिब्रिटी ब्यूटी टीम से' : 'The Creative Hands Behind Your Glow'}
          </h2>
          <p className="text-sm sm:text-base text-[#6E5D53]">
            {lang === 'hi'
              ? 'लंदन एकेडमी, टेम्पटू यूएसए एवं केरास्टास पेरिस से प्रमाणित हमारे आर्टिस्ट्स हर क्लाइंट को देते हैं व्यक्तिगत ध्यान।'
              : 'Internationally trained practitioners certified in medical cosmetology, French hair contouring, and royal bridal couture.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STYLISTS.map((stylist) => {
            const role = lang === 'hi' ? stylist.roleHi : stylist.roleEn;
            const specialty = lang === 'hi' ? stylist.specialtyHi : stylist.specialtyEn;

            return (
              <div
                key={stylist.id}
                className="bg-white rounded-xl border border-[#DFCEBE] overflow-hidden flex flex-col justify-between hover:border-[#B5917B] hover:shadow-md transition-all group"
              >
                <div>
                  <div className="aspect-[4/3] bg-[#E2D4C6] overflow-hidden relative">
                    <img
                      src={stylist.image}
                      alt={stylist.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-[#241D1A]/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {stylist.experience}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-serif-luxury text-xl font-bold text-[#241D1A]">
                      {stylist.name}
                    </h3>
                    <p className="text-xs font-medium text-[#93523B]">
                      {role}
                    </p>
                    <p className="text-xs text-[#6A5A50] leading-relaxed pt-2 border-t border-[#F2ECE5]">
                      <span className="font-semibold text-[#3D312A]">
                        {lang === 'hi' ? 'विशेषज्ञता: ' : 'Specialty: '}
                      </span>
                      {specialty}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectStylist(stylist)}
                    className="w-full py-2 text-xs font-semibold text-[#241D1A] bg-[#FAF6F0] hover:bg-[#241D1A] hover:text-white border border-[#D9C8B9] rounded-md transition-colors"
                  >
                    {lang === 'hi' ? `${stylist.name} संग स्लॉट चुनें` : `Book with ${stylist.name}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
