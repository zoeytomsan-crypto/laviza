/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceMenu } from './components/ServiceMenu';
import { BridalPackages } from './components/BridalPackages';
import { BridalCalculator } from './components/BridalCalculator';
import { SpecialistsSection } from './components/SpecialistsSection';
import { TransformationGallery } from './components/TransformationGallery';
import { HygieneStandards } from './components/HygieneStandards';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { ServiceItem, Stylist, BridalPackage, Appointment, SALON_INFO } from './data/salonData';
import {
  getStoredAppointments,
  saveAppointment,
  cancelAppointment,
  getStoredReviews,
  addStoredReview,
  ReviewItem,
} from './utils/storage';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<ServiceItem | null>(null);
  const [preselectedStylist, setPreselectedStylist] = useState<Stylist | null>(null);
  const [customPackageData, setCustomPackageData] = useState<{ summary: string; total: number } | null>(null);

  // My Appointments Modal State
  const [isMyAppointmentsOpen, setIsMyAppointmentsOpen] = useState(false);

  // Load appointments and reviews on mount
  useEffect(() => {
    setAppointments(getStoredAppointments());
    setReviews(getStoredReviews());
  }, []);

  const handleOpenGeneralBooking = () => {
    setPreselectedService(null);
    setPreselectedStylist(null);
    setCustomPackageData(null);
    setIsBookingOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setPreselectedService(service);
    setPreselectedStylist(null);
    setCustomPackageData(null);
    setIsBookingOpen(true);
  };

  const handleSelectBridalPackage = (pkg: BridalPackage) => {
    const syntheticItem: ServiceItem = {
      id: pkg.id,
      category: 'bridal',
      nameEn: pkg.nameEn,
      nameHi: pkg.nameHi,
      duration: '4-5 Hours Full Sitting',
      price: pkg.price,
      descEn: pkg.descEn,
      descHi: pkg.descHi,
      featuresEn: pkg.includesEn,
      featuresHi: pkg.includesHi,
    };
    setPreselectedService(syntheticItem);
    setPreselectedStylist(null);
    setCustomPackageData(null);
    setIsBookingOpen(true);
  };

  const handleBookCustomPackage = (summary: string, total: number) => {
    setPreselectedService(null);
    setPreselectedStylist(null);
    setCustomPackageData({ summary, total });
    setIsBookingOpen(true);
  };

  const handleSelectStylist = (stylist: Stylist) => {
    setPreselectedStylist(stylist);
    setPreselectedService(null);
    setCustomPackageData(null);
    setIsBookingOpen(true);
  };

  const handleBookServiceType = (serviceCategory: string) => {
    // Open booking modal
    setPreselectedService(null);
    setPreselectedStylist(null);
    setCustomPackageData(null);
    setIsBookingOpen(true);
  };

  const handleAppointmentBooked = (newAppt: Appointment) => {
    const updated = saveAppointment(newAppt);
    setAppointments(updated);
  };

  const handleCancelAppointment = (id: string) => {
    const updated = cancelAppointment(id);
    setAppointments(updated);
  };

  const handleAddReview = (newRev: ReviewItem) => {
    const updated = addStoredReview(newRev);
    setReviews(updated);
  };

  const handleScrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#242120] flex flex-col font-sans selection:bg-[#EAE0D5] selection:text-[#332219]">
      {/* Top Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenBooking={handleOpenGeneralBooking}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
        appointmentCount={appointments.filter((a) => a.status === 'confirmed').length}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero lang={lang} onOpenBooking={handleOpenGeneralBooking} />

        {/* Services & Rate Card */}
        <ServiceMenu lang={lang} onSelectService={handleSelectService} />

        {/* Signature Bridal Suite */}
        <BridalPackages
          lang={lang}
          onSelectPackage={handleSelectBridalPackage}
          onOpenCalculator={handleScrollToCalculator}
        />

        {/* Custom Bridal Package Estimator */}
        <BridalCalculator
          lang={lang}
          onBookCustomPackage={handleBookCustomPackage}
        />

        {/* Master Stylists & Cosmetologists */}
        <SpecialistsSection
          lang={lang}
          onSelectStylist={handleSelectStylist}
        />

        {/* Transformations & Portfolios */}
        <TransformationGallery
          lang={lang}
          onBookServiceType={handleBookServiceType}
        />

        {/* Clinical Hygiene Guarantee */}
        <div id="hygiene">
          <HygieneStandards lang={lang} />
        </div>

        {/* Client Reviews & Feedback */}
        <ReviewsSection
          lang={lang}
          reviews={reviews}
          onAddReview={handleAddReview}
        />
      </main>

      {/* Footer */}
      <Footer lang={lang} onOpenBooking={handleOpenGeneralBooking} />

      {/* Floating Concierge Action Buttons (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        <a
          href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(
            lang === 'hi'
              ? 'नमस्ते औरा एंड नूर! मुझे ब्यूटी सेवाओं व ब्राइडल अपॉइंटमेंट के बारे में जानकारी चाहिए।'
              : 'Hello Aura & Noor! I would like to inquire about bridal appointments and salon services.'
          )}`}
          target="_blank"
          rel="noreferrer"
          className="bg-[#25D366] hover:bg-[#20BA5C] text-white p-3 sm:px-4 sm:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-xs font-semibold group active:scale-95"
          title="Chat with Salon Concierge on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline">
            {lang === 'hi' ? 'व्हाट्सएप सहायता' : 'WhatsApp Concierge'}
          </span>
        </a>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        initialService={preselectedService}
        initialStylist={preselectedStylist}
        customPackageData={customPackageData}
        onAppointmentBooked={handleAppointmentBooked}
      />

      {/* My Appointments Modal */}
      <MyAppointmentsModal
        isOpen={isMyAppointmentsOpen}
        onClose={() => setIsMyAppointmentsOpen(false)}
        lang={lang}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onBookNew={handleOpenGeneralBooking}
      />
    </div>
  );
}
