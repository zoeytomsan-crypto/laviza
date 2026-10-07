import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Heart } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  lang: 'en' | 'hi';
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenBooking }) => {
  return (
    <footer id="contact" className="bg-[#211B18] text-[#E5DCD5] pt-16 pb-12 border-t border-[#3B302B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#3B302B]">
          {/* Brand Info */}
          <div className="space-y-4">
            <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold tracking-wide text-white block">
              Aura & Noor
            </span>
            <p className="text-xs text-[#BFAFA3] leading-relaxed">
              {lang === 'hi'
                ? 'मुंबई का प्रीमियम लक्जरी ब्यूटी स्टूडियो व ब्राइडल लाउंज। जहां आपकी सुंदरता को मिलता है अंतरराष्ट्रीय आर्टिस्ट्स का स्पर्श।'
                : 'Bespoke Haute Beauty, Royal Bridal Makeovers, and Clinical Dermatology Esthetics in the heart of Mumbai.'}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 bg-[#93523B] hover:bg-[#A86047] text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
              >
                {lang === 'hi' ? 'अपॉइंटमेंट रिजर्व करें' : 'Reserve Appointment'}
              </button>
            </div>
          </div>

          {/* Studio Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              {lang === 'hi' ? 'स्टूडियो समय (Opening Hours)' : 'Studio Hours'}
            </h4>
            <div className="space-y-2 text-xs text-[#BFAFA3]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">
                    {lang === 'hi' ? 'मंगलवार – रविवार' : 'Tuesday – Sunday'}
                  </p>
                  <p>10:00 AM – 08:30 PM</p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#352B26]">
                <p className="font-semibold text-[#E9C39B]">
                  {lang === 'hi' ? 'सोमवार: विशेष बुकिंग्स' : 'Monday: VIP & Bridal Only'}
                </p>
                <p className="text-[11px] text-[#A6978C]">
                  {lang === 'hi' ? 'पूर्व अपॉइंटमेंट अनिवार्य' : 'By prior bridal consultation only'}
                </p>
              </div>
            </div>
          </div>

          {/* Location & Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              {lang === 'hi' ? 'स्टूडियो पता (Location)' : 'Sanctuary Address'}
            </h4>
            <div className="space-y-2 text-xs text-[#BFAFA3]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                <span>{lang === 'hi' ? SALON_INFO.addressHi : SALON_INFO.addressEn}</span>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-xs text-[#D4A373] hover:underline pt-1"
              >
                {lang === 'hi' ? 'गूगल मैप्स पर दिशा देखें →' : 'Get Driving Directions →'}
              </a>
            </div>
          </div>

          {/* Contact & Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              {lang === 'hi' ? 'डायरेक्ट हेल्पलाइन (Concierge)' : 'VIP Concierge Desk'}
            </h4>
            <div className="space-y-2 text-xs text-[#BFAFA3]">
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D4A373]" />
                <span className="font-semibold text-white">{SALON_INFO.phone}</span>
              </a>

              <a
                href={`https://wa.me/${SALON_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#4ADE80] hover:text-[#86EFAC] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="font-semibold">{lang === 'hi' ? 'सीधा व्हाट्सएप चैट' : 'Chat on WhatsApp'}</span>
              </a>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#9E8E82]">
                <Mail className="w-4 h-4 text-[#D4A373]" />
                <span>{SALON_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Legal & Signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8A796E] gap-4">
          <p>
            © {new Date().getFullYear()} {SALON_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#services" className="hover:text-white transition-colors">
              Rate Card
            </a>
            <span aria-hidden="true">·</span>
            <a href="#bridal" className="hover:text-white transition-colors">
              Bridal Trousseau
            </a>
            <span aria-hidden="true">·</span>
            <a href="#hygiene" className="hover:text-white transition-colors">
              Hygiene Standard
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
