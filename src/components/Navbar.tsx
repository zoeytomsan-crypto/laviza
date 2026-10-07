import React, { useState } from 'react';
import { Calendar, Phone, Globe, Menu, X, Clock, Sparkles } from 'lucide-react';

interface NavbarProps {
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
  onOpenBooking: () => void;
  onOpenMyAppointments: () => void;
  appointmentCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  onOpenBooking,
  onOpenMyAppointments,
  appointmentCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    services: lang === 'hi' ? 'सेवाएं' : 'Services',
    bridal: lang === 'hi' ? 'ब्राइडल सूइट' : 'Bridal Suite',
    calculator: lang === 'hi' ? 'पैकेज कैलकुलेटर' : 'Bridal Estimator',
    artists: lang === 'hi' ? 'विशेषज्ञ' : 'Artists',
    reviews: lang === 'hi' ? 'समीक्षाएं' : 'Reviews',
    contact: lang === 'hi' ? 'स्थान व संपर्क' : 'Contact & Studio',
    bookBtn: lang === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment',
    myBookings: lang === 'hi' ? 'मेरी बुकिंग्स' : 'My Bookings',
  };

  const navLinks = [
    { href: '#services', label: t.services },
    { href: '#bridal', label: t.bridal },
    { href: '#calculator', label: t.calculator },
    { href: '#specialists', label: t.artists },
    { href: '#reviews', label: t.reviews },
    { href: '#contact', label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold tracking-wide text-[#2B2320] group-hover:text-[#93523B] transition-colors">
            Aura & Noor
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#9C7968] font-medium hidden sm:inline-block border-l border-[#DECFC6] pl-2">
            Haute Salon
          </span>
        </a>

        {/* Zone 2: Navigation Links (Clean text, subtle hover) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#594B43]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#93523B] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#93523B] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#5A4B43] bg-[#EFE9E0] hover:bg-[#E5DCD0] rounded-md transition-colors"
            title="Toggle English / हिन्दी"
          >
            <Globe className="w-3.5 h-3.5 text-[#93523B]" />
            <span className="font-semibold">{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* My Appointments Button */}
          {appointmentCount > 0 && (
            <button
              onClick={onOpenMyAppointments}
              className="relative hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#3E3129] bg-[#F2EDE4] hover:bg-[#EAE2D5] border border-[#D8C7B8] rounded-md transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-[#93523B]" />
              <span>{t.myBookings}</span>
              <span className="ml-1 w-4 h-4 rounded-full bg-[#93523B] text-white text-[10px] flex items-center justify-center font-bold">
                {appointmentCount}
              </span>
            </button>
          )}

          {/* Primary Action Button */}
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-[#2B2320] hover:bg-[#93523B] rounded-md transition-all shadow-sm hover:shadow active:scale-[0.98] whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E6C9B3]" />
            <span>{t.bookBtn}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#594B43] hover:text-[#2B2320] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE3DA] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-[#4B3D35] hover:bg-[#EFE9E0] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="pt-3 border-t border-[#EAE3DA] flex flex-col gap-2">
            {appointmentCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyAppointments();
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-[#3E3129] bg-[#EFE9E0] rounded-md"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#93523B]" />
                  <span>{t.myBookings}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#93523B] text-white text-xs font-semibold">
                  {appointmentCount}
                </span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-sm font-medium text-white bg-[#93523B] hover:bg-[#7D422E] rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#E6C9B3]" />
              <span>{t.bookBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
