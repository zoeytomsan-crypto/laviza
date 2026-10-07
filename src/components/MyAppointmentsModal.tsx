import React from 'react';
import { Calendar, Clock, MapPin, X, Trash2, MessageCircle, AlertCircle } from 'lucide-react';
import { Appointment, SALON_INFO } from '../data/salonData';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onBookNew: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  lang,
  appointments,
  onCancelAppointment,
  onBookNew,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] max-w-xl w-full rounded-2xl border border-[#D9C8B9] p-5 sm:p-8 shadow-2xl relative my-auto max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7A675B] hover:text-[#241D1A] p-2 rounded-full hover:bg-[#EFE9E0] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-6">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#93523B]">
            {lang === 'hi' ? 'क्लाइंट डैशबोर्ड' : 'Client Sanctuary'}
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#241D1A]">
            {lang === 'hi' ? 'मेरी निर्धारित बुकिंग्स' : 'Your Scheduled Sessions'}
          </h3>
          <p className="text-xs text-[#7A675B]">
            {lang === 'hi'
              ? 'आपके द्वारा बुक किए गए सभी स्लॉट्स व पास यहां सुरक्षित हैं।'
              : 'Review your upcoming appointments, passes, and schedule assistance.'}
          </p>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-[#E3D6C9] p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#F3ECE4] text-[#93523B] flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif-luxury text-lg font-bold text-[#241D1A]">
                {lang === 'hi' ? 'कोई सक्रिय बुकिंग नहीं मिली' : 'No Active Appointments Yet'}
              </h4>
              <p className="text-xs text-[#7A675B] max-w-xs mx-auto">
                {lang === 'hi'
                  ? 'अपनी मनपसंद ब्यूटी या ब्राइडल सेवा चुनकर आज ही स्लॉट बुक करें।'
                  : 'Select any salon treatment, bridal package, or hair ritual to reserve your slot.'}
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookNew();
              }}
              className="px-5 py-2.5 bg-[#241D1A] hover:bg-[#93523B] text-white text-xs font-semibold rounded-md transition-colors"
            >
              {lang === 'hi' ? 'सेवाएं देखें व बुक करें' : 'Browse Services & Book'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className={`bg-white rounded-xl border p-4 sm:p-5 transition-all ${
                  appt.status === 'cancelled'
                    ? 'border-[#EAE1D7] opacity-65 bg-[#FAF7F3]'
                    : 'border-[#DFCEBE] shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between border-b border-[#F2ECE5] pb-3 mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#93523B]">
                      Pass #{appt.id}
                    </span>
                    <h4 className="font-serif-luxury text-lg font-bold text-[#241D1A]">
                      {appt.serviceName}
                    </h4>
                  </div>
                  <div>
                    {appt.status === 'cancelled' ? (
                      <span className="text-[11px] font-semibold text-[#DC2626] bg-[#FEE2E2] px-2 py-0.5 rounded">
                        {lang === 'hi' ? 'रद्द' : 'Cancelled'}
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded">
                        {lang === 'hi' ? 'कन्फर्म' : 'Confirmed'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#5C4D44] mb-3">
                  <div>
                    <span className="text-[#8C7A6E] block text-[10px]">
                      {lang === 'hi' ? 'आर्टिस्ट:' : 'Artist:'}
                    </span>
                    <span className="font-semibold text-[#241D1A]">{appt.stylistName}</span>
                  </div>
                  <div>
                    <span className="text-[#8C7A6E] block text-[10px]">
                      {lang === 'hi' ? 'तारीख व समय:' : 'Date & Time:'}
                    </span>
                    <span className="font-semibold text-[#93523B]">
                      {appt.date} · {appt.timeSlot}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8C7A6E] block text-[10px]">
                      {lang === 'hi' ? 'स्थान:' : 'Location:'}
                    </span>
                    <span className="font-semibold text-[#241D1A]">
                      {appt.locationType === 'venue' ? 'On-Location Venue' : 'Bandra Studio'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8C7A6E] block text-[10px]">
                      {lang === 'hi' ? 'राशि:' : 'Total Amount:'}
                    </span>
                    <span className="font-bold text-[#241D1A] tabular-nums">
                      ₹{appt.totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {appt.status !== 'cancelled' && (
                  <div className="pt-2 border-t border-[#F2ECE5] flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        const msg = `Hello Aura & Noor, inquiring about my appointment pass #${appt.id} for ${appt.serviceName} on ${appt.date}.`;
                        window.open(`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                      className="text-xs font-semibold text-[#2E473B] hover:text-[#16A34A] flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'व्हाट्सएप सहायता' : 'WhatsApp Support'}</span>
                    </button>

                    <button
                      onClick={() => onCancelAppointment(appt.id)}
                      className="text-xs font-semibold text-[#DC2626] hover:text-[#991B1B] flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>{lang === 'hi' ? 'रद्द करें' : 'Cancel Slot'}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
