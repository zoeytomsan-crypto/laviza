import React from 'react';
import { ShieldCheck, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface HygieneStandardsProps {
  lang: 'en' | 'hi';
}

export const HygieneStandards: React.FC<HygieneStandardsProps> = ({ lang }) => {
  const standards = [
    {
      titleEn: 'Hospital-Grade Autoclave Sterilization',
      titleHi: 'हॉस्पिटल-ग्रेड ऑटोक्लेव स्टरलाइजेशन',
      descEn: 'All metallic scissors, cuticle pushers, and tweezers are sealed in surgical pouches and steam sterilized at 134°C prior to every client.',
      descHi: 'सभी कैंची, क्यूटिकल पुशर व टूल्स को सर्जिकल पाउच में 134°C पर ऑटोक्लेव करके सीलबंद किया जाता है।',
    },
    {
      titleEn: '100% Single-Use Disposables',
      titleHi: '100% सिंगल-यूज डिस्पोजेबल किट्स',
      descEn: 'Fresh biodegradable salon sheets, sanitised manicure files, wooden spatulas, and waxing strips discarded immediately after one use.',
      descHi: 'हर क्लाइंट के लिए ताजा डिस्पोजेबल शीट्स, नेल फाइल्स, वैक्सिंग स्ट्रिप्स व स्पैटुला।',
    },
    {
      titleEn: 'Authentic Global Luxury Formulations',
      titleHi: '100% असली ग्लोबल लक्जरी ब्रांड्स',
      descEn: 'Direct partnerships with authorized distributors of Kérastase Paris, Olaplex USA, Temptu Airbrush, MAC, and Dyson Professional tools.',
      descHi: 'केरास्टास, ओलाप्लेक्स, टेम्पटू, मैक व डायसन के ओरिजिनल ऑथराइज्ड प्रोडक्ट्स की गारंटी।',
    },
    {
      titleEn: 'HEPA Air Purified VIP Suites',
      titleHi: 'हेपा एयर-प्यूरिफाइड प्राइवेट सूइट्स',
      descEn: 'Medical-grade H13 HEPA filtration and silent acoustic privacy for stress-free bridal trousseau and aromatherapy treatments.',
      descHi: 'प्राइवेट ब्राइडल सूइट्स में हेपा एयर प्यूरीफायर और शांत, तनाव-मुक्त वातावरण।',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F2EDE6] border-b border-[#E1D4C6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-2 mb-12">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#93523B]">
            {lang === 'hi' ? '06. स्वच्छता व सुरक्षा का वादा' : '06. Clinical Hygiene Protocol'}
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#241D1A]">
            {lang === 'hi' ? 'आपकी त्वचा व स्वास्थ्य की पूर्ण सुरक्षा' : 'The Clean Luxury Standard'}
          </h2>
          <p className="text-sm text-[#6E5D53]">
            {lang === 'hi'
              ? 'हम पार्लर में किसी भी प्रकार के समझौते के बिना उच्चतम स्वच्छता मानकों का पालन करते हैं।'
              : 'Zero shortcuts. Every tool, formulation, and touchpoint adheres to international clinical aesthetics protocols.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-[#DDD0C2] space-y-3 hover:border-[#B5917B] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#FAF5EE] border border-[#E9DC CE] flex items-center justify-center text-[#93523B]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#241D1A] leading-snug">
                {lang === 'hi' ? s.titleHi : s.titleEn}
              </h3>
              <p className="text-xs text-[#6A5A50] leading-relaxed">
                {lang === 'hi' ? s.descHi : s.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
