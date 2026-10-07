import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar as CalendarIcon, Clock, User, Phone, Mail, MapPin, CheckCircle2, MessageCircle, X, Download } from 'lucide-react';
import { SERVICES, STYLISTS, ServiceItem, Stylist, Appointment, SALON_INFO } from '../data/salonData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
  initialService?: ServiceItem | null;
  initialStylist?: Stylist | null;
  customPackageData?: { summary: string; total: number } | null;
  onAppointmentBooked: (appt: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialService,
  initialStylist,
  customPackageData,
  onAppointmentBooked,
}) => {
  if (!isOpen) return null;

  // Selected Service
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialService ? initialService.id : customPackageData ? 'custom-bridal' : SERVICES[0].id
  );

  // Selected Stylist
  const [selectedStylistId, setSelectedStylistId] = useState<string>(
    initialStylist ? initialStylist.id : 'any'
  );

  // Date selection (defaults to tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(tomorrowStr);

  // Time slot selection
  const TIME_SLOTS = [
    '10:30 AM',
    '11:45 AM',
    '01:15 PM',
    '02:30 PM',
    '03:45 PM',
    '05:00 PM',
    '06:15 PM',
    '07:30 PM',
  ];
  const [selectedTime, setSelectedTime] = useState<string>('11:45 AM');

  // Location mode
  const [locationType, setLocationType] = useState<'salon' | 'venue'>('salon');
  const [venueAddress, setVenueAddress] = useState<string>('');

  // Client Details
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Synchronize initial selections
  useEffect(() => {
    if (initialService) {
      setSelectedServiceId(initialService.id);
    } else if (customPackageData) {
      setSelectedServiceId('custom-bridal');
    }
  }, [initialService, customPackageData]);

  useEffect(() => {
    if (initialStylist) {
      setSelectedStylistId(initialStylist.id);
    }
  }, [initialStylist]);

  // Pricing calculation
  let currentServiceName = '';
  let currentServicePrice = 0;

  if (customPackageData) {
    currentServiceName = customPackageData.summary;
    currentServicePrice = customPackageData.total;
  } else {
    const matched = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
    currentServiceName = lang === 'hi' ? matched.nameHi : matched.nameEn;
    currentServicePrice = matched.price;
  }

  const selectedStylistName =
    selectedStylistId === 'any'
      ? (lang === 'hi' ? 'सीनियर उपलब्ध आर्टिस्ट' : 'First Available Senior Specialist')
      : STYLISTS.find((s) => s.id === selectedStylistId)?.name || 'Specialist';

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    const newAppointment: Appointment = {
      id: `AN-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceId: selectedServiceId,
      serviceName: currentServiceName,
      stylistId: selectedStylistId,
      stylistName: selectedStylistName,
      date: selectedDate,
      timeSlot: selectedTime,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim() || 'N/A',
      locationType,
      venueAddress: locationType === 'venue' ? venueAddress.trim() : undefined,
      specialNotes: specialNotes.trim() || undefined,
      totalPrice: currentServicePrice,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    onAppointmentBooked(newAppointment);
    setConfirmedBooking(newAppointment);
  };

  const openWhatsAppConfirmation = () => {
    if (!confirmedBooking) return;
    const msg = `Namaste Aura & Noor! I have booked an appointment.\n\nBooking ID: ${confirmedBooking.id}\nService: ${confirmedBooking.serviceName}\nSpecialist: ${confirmedBooking.stylistName}\nDate: ${confirmedBooking.date}\nTime: ${confirmedBooking.timeSlot}\nLocation: ${confirmedBooking.locationType === 'venue' ? 'On-Location (' + (confirmedBooking.venueAddress || '') + ')' : 'At Bandra Studio'}\nClient: ${confirmedBooking.clientName} (${confirmedBooking.clientPhone})\nTotal: ₹${confirmedBooking.totalPrice.toLocaleString('en-IN')}\n\nPlease confirm my slot.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] max-w-2xl w-full rounded-2xl border border-[#D9C8B9] p-5 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7A675B] hover:text-[#241D1A] p-2 rounded-full hover:bg-[#EFE9E0] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          /* Confirmation Pass Screen */
          <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-200 py-4">
            <div className="w-14 h-14 bg-[#4ADE80]/20 rounded-full flex items-center justify-center mx-auto text-[#16A34A]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#93523B]">
                {lang === 'hi' ? 'अपॉइंटमेंट सफलतापूर्वक कन्फर्म!' : 'Appointment Confirmed'}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#241D1A]">
                {lang === 'hi' ? 'आपका स्लॉट बुक हो गया है' : 'Your Luxury Session is Reserved'}
              </h3>
              <p className="text-xs text-[#7A675B]">
                {lang === 'hi'
                  ? 'बुकिंग पास विवरण नीचे दिए गए हैं। हमारी टीम आपको 15 मिनट में संपर्क करेगी।'
                  : 'Your booking pass has been generated. A confirmation SMS/WhatsApp has been queued.'}
              </p>
            </div>

            {/* Visual Booking Pass Card */}
            <div className="bg-white rounded-xl border-2 border-dashed border-[#D9C8B9] p-6 text-left space-y-4 max-w-md mx-auto shadow-xs">
              <div className="flex justify-between items-start border-b border-[#F2ECE5] pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#93523B]">Pass ID</span>
                  <div className="font-mono text-lg font-bold text-[#241D1A] tracking-wider">
                    {confirmedBooking.id}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#7A675B]">Status</span>
                  <div className="text-xs font-semibold text-[#16A34A] flex items-center gap-1 justify-end">
                    <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                    <span>Confirmed</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#7A675B]">{lang === 'hi' ? 'क्लाइंट:' : 'Guest Name:'}</span>
                  <span className="font-semibold text-[#241D1A]">{confirmedBooking.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A675B]">{lang === 'hi' ? 'सेवा:' : 'Service:'}</span>
                  <span className="font-semibold text-[#241D1A] text-right max-w-[220px] truncate">
                    {confirmedBooking.serviceName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A675B]">{lang === 'hi' ? 'स्पेशलिस्ट:' : 'Specialist:'}</span>
                  <span className="font-semibold text-[#241D1A]">{confirmedBooking.stylistName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A675B]">{lang === 'hi' ? 'दिनांक व समय:' : 'Date & Time:'}</span>
                  <span className="font-semibold text-[#93523B]">
                    {confirmedBooking.date} · {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A675B]">{lang === 'hi' ? 'स्थान:' : 'Venue:'}</span>
                  <span className="font-semibold text-[#241D1A]">
                    {confirmedBooking.locationType === 'venue' ? 'On-Location Venue' : 'Bandra Studio'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F2ECE5]">
                  <span className="text-xs font-bold text-[#241D1A]">{lang === 'hi' ? 'कुल राशि:' : 'Amount:'}</span>
                  <span className="font-serif-luxury text-base font-bold text-[#93523B] tabular-nums">
                    ₹{confirmedBooking.totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2.5 max-w-md mx-auto">
              <button
                onClick={openWhatsAppConfirmation}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20BE5A] text-white font-bold text-xs sm:text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'hi' ? 'व्हाट्सएप पर कन्फर्मेशन लिंक भेजें' : 'Send Pass to WhatsApp Concierge'}</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-[#241D1A] hover:bg-[#93523B] text-white font-medium text-xs sm:text-sm rounded-lg transition-colors"
              >
                {lang === 'hi' ? 'समाप्त करें व वेबसाइट पर लौटें' : 'Done & Return to Website'}
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Booking Form */
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#93523B]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'ऑनलाइन बुकिंग पोर्टल' : 'Instant Appointment Booking'}</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#241D1A]">
                {lang === 'hi' ? 'अपना स्लॉट रिजर्व करें' : 'Reserve Your Salon Experience'}
              </h3>
              <p className="text-xs text-[#7A675B]">
                {lang === 'hi'
                  ? 'तुरंत पुष्टि एवं जीरो कैंसिलेशन शुल्क के साथ।'
                  : 'Fast reservation with real-time slot lock and direct WhatsApp concierge access.'}
              </p>
            </div>

            {/* 1. Service Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A]">
                {lang === 'hi' ? '1. सेवा चुनें (Choose Service)' : '1. Selected Treatment / Package'}
              </label>
              {customPackageData ? (
                <div className="p-3 bg-[#F2EDE4] rounded-lg border border-[#D9C8B9] flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-[#241D1A]">{customPackageData.summary}</span>
                    <span className="text-[10px] text-[#93523B] block">Custom Bridal Package Configured</span>
                  </div>
                  <span className="font-serif-luxury text-base font-bold text-[#241D1A] tabular-nums">
                    ₹{customPackageData.total.toLocaleString('en-IN')}
                  </span>
                </div>
              ) : (
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-[#D9C8B9] rounded-lg text-[#241D1A] focus:outline-none focus:ring-1 focus:ring-[#93523B]"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {lang === 'hi' ? s.nameHi : s.nameEn} — ₹{s.price.toLocaleString('en-IN')} ({s.duration})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* 2. Stylist Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A]">
                {lang === 'hi' ? '2. पसंदीदा आर्टिस्ट या स्पेशलिस्ट' : '2. Preferred Artist / Cosmetologist'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStylistId('any')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-colors ${
                    selectedStylistId === 'any'
                      ? 'border-[#93523B] bg-[#F7ECE4] text-[#241D1A] font-bold'
                      : 'border-[#EAE1D7] bg-white text-[#5C4D44] hover:border-[#D0BFB2]'
                  }`}
                >
                  <div>{lang === 'hi' ? 'कोई भी उपलब्ध' : 'First Available'}</div>
                  <div className="text-[10px] text-[#93523B] font-normal">{lang === 'hi' ? 'फास्टेस्ट स्लॉट' : 'Fastest Slot'}</div>
                </button>
                {STYLISTS.map((st) => (
                  <button
                    type="button"
                    key={st.id}
                    onClick={() => setSelectedStylistId(st.id)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-colors ${
                      selectedStylistId === st.id
                        ? 'border-[#93523B] bg-[#F7ECE4] text-[#241D1A] font-bold'
                        : 'border-[#EAE1D7] bg-white text-[#5C4D44] hover:border-[#D0BFB2]'
                    }`}
                  >
                    <div>{st.name}</div>
                    <div className="text-[10px] text-[#7A675B] font-normal truncate">
                      {lang === 'hi' ? st.roleHi : st.roleEn}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Date & Time Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A]">
                  {lang === 'hi' ? '3. अपॉइंटमेंट दिनांक' : '3. Appointment Date'}
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D9C8B9] rounded-lg text-[#241D1A] focus:outline-none focus:ring-1 focus:ring-[#93523B]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A]">
                  {lang === 'hi' ? '4. समय स्लॉट (Time Slot)' : '4. Preferred Time Slot'}
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#D9C8B9] rounded-lg text-[#241D1A] focus:outline-none focus:ring-1 focus:ring-[#93523B]"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. Location choice */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A]">
                {lang === 'hi' ? '5. सर्विस स्थान (Service Location)' : '5. Location'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLocationType('salon')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-colors ${
                    locationType === 'salon'
                      ? 'border-[#93523B] bg-[#F7ECE4] text-[#241D1A] font-bold'
                      : 'border-[#EAE1D7] bg-white text-[#5C4D44]'
                  }`}
                >
                  <div>{lang === 'hi' ? 'स्टूडियो में (Bandra Studio)' : 'At Bandra Studio'}</div>
                  <div className="text-[10px] text-[#7A675B] font-normal">Plot 42, Linking Road</div>
                </button>
                <button
                  type="button"
                  onClick={() => setLocationType('venue')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-colors ${
                    locationType === 'venue'
                      ? 'border-[#93523B] bg-[#F7ECE4] text-[#241D1A] font-bold'
                      : 'border-[#EAE1D7] bg-white text-[#5C4D44]'
                  }`}
                >
                  <div>{lang === 'hi' ? 'होटल / वेन्यू / घर पर' : 'At Venue / Home'}</div>
                  <div className="text-[10px] text-[#93523B] font-normal">Bridal & Event Artist Kit</div>
                </button>
              </div>
              {locationType === 'venue' && (
                <input
                  type="text"
                  required
                  placeholder={lang === 'hi' ? 'होटल / निवास का पूरा पता लिखें...' : 'Enter complete hotel or venue address...'}
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-xs bg-white border border-[#D9C8B9] rounded-lg text-[#241D1A] focus:outline-none focus:ring-1 focus:ring-[#93523B]"
                />
              )}
            </div>

            {/* 5. Guest Contact Details */}
            <div className="space-y-3 pt-3 border-t border-[#F2ECE5]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A]">
                {lang === 'hi' ? '6. आपकी जानकारी (Guest Details)' : '6. Guest Contact Details'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder={lang === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-white border border-[#D9C8B9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#93523B]"
                />
                <input
                  type="tel"
                  required
                  placeholder={lang === 'hi' ? 'मोबाइल नंबर * (e.g. 98201xxxxx)' : 'Phone Number *'}
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-white border border-[#D9C8B9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#93523B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder={lang === 'hi' ? 'ईमेल (वैकल्पिक)' : 'Email address (optional)'}
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-white border border-[#D9C8B9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#93523B]"
                />
                <input
                  type="text"
                  placeholder={lang === 'hi' ? 'त्वचा / बालों से जुड़ी कोई विशेष मांग' : 'Any skin allergies or special requests'}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-white border border-[#D9C8B9] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#93523B]"
                />
              </div>
            </div>

            {/* Total and Submit */}
            <div className="pt-4 border-t border-[#F2ECE5] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-[#7A675B] uppercase block font-semibold">
                  {lang === 'hi' ? 'अनुमानित कुल देय:' : 'Pay at Salon:'}
                </span>
                <span className="font-serif-luxury text-2xl font-bold text-[#241D1A] tabular-nums">
                  ₹{currentServicePrice.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-medium text-[#5C4D44] hover:bg-[#EFE9E0] rounded-md transition-colors"
                >
                  {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="w-1/2 sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#241D1A] hover:bg-[#93523B] rounded-md transition-colors shadow-sm active:scale-95 whitespace-nowrap"
                >
                  {lang === 'hi' ? 'बुकिंग कन्फर्म करें' : 'Confirm Appointment'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
