import React, { useState } from 'react';
import { Sparkles, Check, Calculator, MessageCircle, Calendar, Plus, Minus, ArrowRight } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface BridalCalculatorProps {
  lang: 'en' | 'hi';
  onBookCustomPackage: (summary: string, total: number) => void;
}

export const BridalCalculator: React.FC<BridalCalculatorProps> = ({
  lang,
  onBookCustomPackage,
}) => {
  // Events Selection
  const [weddingMakeupType, setWeddingMakeupType] = useState<'none' | 'hd' | 'airbrush'>('airbrush');
  const [includeSangeet, setIncludeSangeet] = useState<boolean>(true);
  const [includeMehendi, setIncludeMehendi] = useState<boolean>(true);
  const [includeReception, setIncludeReception] = useState<boolean>(false);
  const [includeEngagement, setIncludeEngagement] = useState<boolean>(false);

  // Guest Counters
  const [motherCount, setMotherCount] = useState<number>(1);
  const [bridesmaidCount, setBridesmaidCount] = useState<number>(2);

  // Upgrades
  const [includePreBridalGlow, setIncludePreBridalGlow] = useState<boolean>(true);
  const [includeNailExtensions, setIncludeNailExtensions] = useState<boolean>(true);
  const [includeKeratin, setIncludeKeratin] = useState<boolean>(false);

  // Service Location
  const [serviceLocation, setServiceLocation] = useState<'salon' | 'venue'>('venue');

  // Pricing Matrix
  const PRICING = {
    weddingHd: 18500,
    weddingAirbrush: 24000,
    sangeet: 8500,
    mehendi: 6500,
    reception: 9500,
    engagement: 7500,
    motherRate: 4500,
    bridesmaidRate: 3500,
    preBridalGlow: 8500,
    nailExtensions: 3800,
    keratin: 6500,
    venueFee: 3000,
  };

  // Calculate items and total
  let brideEventsCost = 0;
  let selectedEventCount = 0;
  const itemsList: string[] = [];

  if (weddingMakeupType === 'hd') {
    brideEventsCost += PRICING.weddingHd;
    selectedEventCount++;
    itemsList.push(lang === 'hi' ? 'शादी का दिन (HD मेकओवर)' : 'Wedding Day (HD Makeover)');
  } else if (weddingMakeupType === 'airbrush') {
    brideEventsCost += PRICING.weddingAirbrush;
    selectedEventCount++;
    itemsList.push(lang === 'hi' ? 'शादी का दिन (Temptu एयरब्रश मेकओवर)' : 'Wedding Day (Airbrush Glam)');
  }

  if (includeSangeet) {
    brideEventsCost += PRICING.sangeet;
    selectedEventCount++;
    itemsList.push(lang === 'hi' ? 'संगीत व कॉकटेल इवनिंग' : 'Sangeet & Cocktail Evening');
  }

  if (includeMehendi) {
    brideEventsCost += PRICING.mehendi;
    selectedEventCount++;
    itemsList.push(lang === 'hi' ? 'मेहंदी व हल्दी फ्रेश फ्लोरल' : 'Mehendi & Haldi Look');
  }

  if (includeReception) {
    brideEventsCost += PRICING.reception;
    selectedEventCount++;
    itemsList.push(lang === 'hi' ? 'रिसेप्शन रॉयल मेकओवर' : 'Reception Makeover');
  }

  if (includeEngagement) {
    brideEventsCost += PRICING.engagement;
    selectedEventCount++;
    itemsList.push(lang === 'hi' ? 'एंगेजमेंट / रोका लुक' : 'Engagement Glam');
  }

  const partyCost = motherCount * PRICING.motherRate + bridesmaidCount * PRICING.bridesmaidRate;
  if (motherCount > 0) {
    itemsList.push(`${lang === 'hi' ? 'माताजी मेकओवर' : 'Mother of Bride/Groom'} (${motherCount}x)`);
  }
  if (bridesmaidCount > 0) {
    itemsList.push(`${lang === 'hi' ? 'ब्राइड्समेड्स / बहने' : 'Bridesmaids / Family'} (${bridesmaidCount}x)`);
  }

  let upgradesCost = 0;
  if (includePreBridalGlow) {
    upgradesCost += PRICING.preBridalGlow;
    itemsList.push(lang === 'hi' ? '30-दिवसीय प्री-ब्राइडल ग्लो रीजीम' : '30-Day Pre-Bridal Glow Ritual');
  }
  if (includeNailExtensions) {
    upgradesCost += PRICING.nailExtensions;
    itemsList.push(lang === 'hi' ? 'ब्राइडल 3D नेल एक्सटेंशन' : 'Bridal 3D Nail Extensions');
  }
  if (includeKeratin) {
    upgradesCost += PRICING.keratin;
    itemsList.push(lang === 'hi' ? 'केराटिन स्मूथिंग ट्रीटमेंट' : 'Keratin Smoothing Therapy');
  }

  const locationFee = serviceLocation === 'venue' ? PRICING.venueFee : 0;
  if (serviceLocation === 'venue') {
    itemsList.push(lang === 'hi' ? 'वेन्यू / होटल पर आर्टिस्ट ट्रेवल व किट' : 'On-Location Venue Kit & Travel');
  }

  const subtotal = brideEventsCost + partyCost + upgradesCost + locationFee;

  // Bundle Discount calculation
  let discountPercent = 0;
  if (selectedEventCount >= 4) {
    discountPercent = 15;
  } else if (selectedEventCount >= 3) {
    discountPercent = 10;
  } else if (selectedEventCount >= 2) {
    discountPercent = 5;
  }

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;

  const handleWhatsAppInquiry = () => {
    const summaryText = `Hello Aura & Noor Bridal Team! I calculated a custom bridal package:\n\nEvents Selected:\n- ${itemsList.join('\n- ')}\n\nSubtotal: ₹${subtotal.toLocaleString('en-IN')}\nDiscount (${discountPercent}%): -₹${discountAmount.toLocaleString('en-IN')}\nFinal Estimated Total: ₹${finalTotal.toLocaleString('en-IN')}\nLocation: ${serviceLocation === 'venue' ? 'On-Location / Venue' : 'At Studio'}\n\nPlease check slot availability for my wedding dates!`;
    const encoded = encodeURIComponent(summaryText);
    window.open(`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const handleBookClick = () => {
    const summary = `Custom Bridal Package: ${itemsList.slice(0, 3).join(', ')} (${itemsList.length} total inclusions)`;
    onBookCustomPackage(summary, finalTotal);
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#93523B]">
            <Calculator className="w-4 h-4" />
            <span>{lang === 'hi' ? '03. ब्राइडल बजट व पैकेज कैलकुलेटर' : '03. Interactive Bridal Estimator'}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#241D1A]">
            {lang === 'hi' ? 'अपने सपनों का वेडिंग पैकेज कस्टमाइज़ करें' : 'Design Your Bespoke Wedding Trousseau'}
          </h2>
          <p className="text-sm sm:text-base text-[#6E5D53]">
            {lang === 'hi'
              ? 'फंक्शन्स, मेकअप का प्रकार, परिवार के सदस्य व प्री-ब्राइडल केयर चुनें। 2 या अधिक फंक्शन्स पर विशेष छूट लागू होती है।'
              : 'Transparent, real-time estimate with bundle savings and direct booking or instant WhatsApp reservation.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 space-y-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#E3D6C9] shadow-xs">
            {/* Step 1: Wedding Day Makeup Style */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A]">
                {lang === 'hi' ? '1. शादी के दिन का ब्राइडल मेकअप' : '1. Wedding Day Bridal Makeover'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'airbrush', labelEn: 'Airbrush Pro (Temptu)', labelHi: 'एयरब्रश प्रो (टेंपट्टू)', price: PRICING.weddingAirbrush, tag: 'Most Popular' },
                  { id: 'hd', labelEn: 'Signature HD Makeover', labelHi: 'सिग्नेचर एचडी मेकओवर', price: PRICING.weddingHd, tag: 'Classic' },
                  { id: 'none', labelEn: 'No Wedding Day', labelHi: 'शादी का दिन नहीं', price: 0, tag: '' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setWeddingMakeupType(opt.id as any)}
                    className={`p-3 rounded-lg border text-left transition-all relative ${
                      weddingMakeupType === opt.id
                        ? 'border-[#93523B] bg-[#F7ECE4] text-[#2B2320]'
                        : 'border-[#EAE1D7] bg-[#FAF8F5] text-[#5C4D44] hover:border-[#D0BFB2]'
                    }`}
                  >
                    <div className="text-xs font-bold">{lang === 'hi' ? opt.labelHi : opt.labelEn}</div>
                    <div className="text-xs font-semibold text-[#93523B] mt-1 tabular-nums">
                      {opt.price > 0 ? `₹${opt.price.toLocaleString('en-IN')}` : '₹0'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Other Wedding Events */}
            <div className="space-y-3 pt-4 border-t border-[#F2ECE5]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A]">
                {lang === 'hi' ? '2. अन्य फंक्शन्स जोड़ें (Add Ceremonies)' : '2. Select Other Ceremonies'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    state: includeSangeet,
                    setter: setIncludeSangeet,
                    labelEn: 'Sangeet / Cocktail Glam',
                    labelHi: 'संगीत व कॉकटेल इवनिंग',
                    price: PRICING.sangeet,
                  },
                  {
                    state: includeMehendi,
                    setter: setIncludeMehendi,
                    labelEn: 'Mehendi / Haldi Floral',
                    labelHi: 'मेहंदी व हल्दी फ्लोरल लुक',
                    price: PRICING.mehendi,
                  },
                  {
                    state: includeReception,
                    setter: setIncludeReception,
                    labelEn: 'Reception Night Glamour',
                    labelHi: 'रिसेप्शन नाइट ग्लैमर',
                    price: PRICING.reception,
                  },
                  {
                    state: includeEngagement,
                    setter: setIncludeEngagement,
                    labelEn: 'Engagement / Roka Ceremony',
                    labelHi: 'रोका / एंगेजमेंट सेरेमनी',
                    price: PRICING.engagement,
                  },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => item.setter(!item.state)}
                    className={`p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                      item.state
                        ? 'border-[#93523B] bg-[#F7ECE4] text-[#2B2320]'
                        : 'border-[#EAE1D7] bg-[#FAF8F5] text-[#5C4D44] hover:border-[#D0BFB2]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{lang === 'hi' ? item.labelHi : item.labelEn}</div>
                      <div className="text-xs text-[#93523B] tabular-nums">₹{item.price.toLocaleString('en-IN')}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border ${
                        item.state ? 'bg-[#93523B] border-[#93523B] text-white' : 'border-[#CBBBB0] bg-white'
                      }`}
                    >
                      {item.state && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Family Members & Bridesmaids */}
            <div className="space-y-3 pt-4 border-t border-[#F2ECE5]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A]">
                {lang === 'hi' ? '3. परिवार व सहेलियों का मेकओवर (Family & Party)' : '3. Family & Bridesmaids Makeover'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mother of bride/groom */}
                <div className="p-3.5 rounded-lg border border-[#EAE1D7] bg-[#FAF8F5] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#2B2320]">
                      {lang === 'hi' ? 'माताजी (Mother of Bride/Groom)' : 'Mother of Bride/Groom'}
                    </div>
                    <div className="text-xs text-[#93523B] tabular-nums">₹{PRICING.motherRate.toLocaleString('en-IN')} / person</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMotherCount(Math.max(0, motherCount - 1))}
                      className="w-7 h-7 rounded border border-[#DECFC6] bg-white flex items-center justify-center hover:bg-[#F2EDE4]"
                    >
                      <Minus className="w-3 h-3 text-[#5A4B43]" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-[#2B2320] tabular-nums">{motherCount}</span>
                    <button
                      onClick={() => setMotherCount(motherCount + 1)}
                      className="w-7 h-7 rounded border border-[#DECFC6] bg-white flex items-center justify-center hover:bg-[#F2EDE4]"
                    >
                      <Plus className="w-3 h-3 text-[#5A4B43]" />
                    </button>
                  </div>
                </div>

                {/* Bridesmaids */}
                <div className="p-3.5 rounded-lg border border-[#EAE1D7] bg-[#FAF8F5] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#2B2320]">
                      {lang === 'hi' ? 'बहनें / ब्राइड्समेड्स' : 'Bridesmaids / Sisters'}
                    </div>
                    <div className="text-xs text-[#93523B] tabular-nums">₹{PRICING.bridesmaidRate.toLocaleString('en-IN')} / person</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBridesmaidCount(Math.max(0, bridesmaidCount - 1))}
                      className="w-7 h-7 rounded border border-[#DECFC6] bg-white flex items-center justify-center hover:bg-[#F2EDE4]"
                    >
                      <Minus className="w-3 h-3 text-[#5A4B43]" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-[#2B2320] tabular-nums">{bridesmaidCount}</span>
                    <button
                      onClick={() => setBridesmaidCount(bridesmaidCount + 1)}
                      className="w-7 h-7 rounded border border-[#DECFC6] bg-white flex items-center justify-center hover:bg-[#F2EDE4]"
                    >
                      <Plus className="w-3 h-3 text-[#5A4B43]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Upgrades & Treatments */}
            <div className="space-y-3 pt-4 border-t border-[#F2ECE5]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A]">
                {lang === 'hi' ? '4. प्री-ब्राइडल ग्लो अपग्रेड्स (Optional Pre-Bridal)' : '4. Pre-Bridal Glow Upgrades'}
              </label>
              <div className="space-y-2">
                {[
                  {
                    state: includePreBridalGlow,
                    setter: setIncludePreBridalGlow,
                    labelEn: '30-Day Royal Skin & Body Prep (HydraFacial + Gold + Body Waxing)',
                    labelHi: '30-दिवसीय रॉयल स्किन व बॉडी प्रेप (हाइड्रा-फेशियल + 24K गोल्ड + रिका वैक्स)',
                    price: PRICING.preBridalGlow,
                  },
                  {
                    state: includeNailExtensions,
                    setter: setIncludeNailExtensions,
                    labelEn: 'Bridal 3D Acrylic Nails & Swarovski Crystal Art',
                    labelHi: 'ब्राइडल 3D एक्रिलिक नेल्स व स्वरोवस्की क्रिस्टल्स',
                    price: PRICING.nailExtensions,
                  },
                  {
                    state: includeKeratin,
                    setter: setIncludeKeratin,
                    labelEn: 'Organic Nanoplastia / Keratin Frizz Smooth for Wedding Month',
                    labelHi: 'ऑर्गेनिक नैनोप्लास्टिया / केराटिन स्मूथिंग ट्रीटमेंट',
                    price: PRICING.keratin,
                  },
                ].map((upgrade, i) => (
                  <button
                    key={i}
                    onClick={() => upgrade.setter(!upgrade.state)}
                    className={`w-full p-3 rounded-lg border text-left flex items-center justify-between text-xs transition-all ${
                      upgrade.state
                        ? 'border-[#93523B] bg-[#F7ECE4] text-[#2B2320]'
                        : 'border-[#EAE1D7] bg-[#FAF8F5] text-[#5C4D44] hover:border-[#D0BFB2]'
                    }`}
                  >
                    <span className="font-semibold">{lang === 'hi' ? upgrade.labelHi : upgrade.labelEn}</span>
                    <span className="font-bold text-[#93523B] tabular-nums shrink-0 ml-3">
                      +₹{upgrade.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Location / Venue Choice */}
            <div className="space-y-3 pt-4 border-t border-[#F2ECE5]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3D312A]">
                {lang === 'hi' ? '5. सर्विस स्थान (Service Location)' : '5. Location Preference'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setServiceLocation('salon')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    serviceLocation === 'salon'
                      ? 'border-[#93523B] bg-[#F7ECE4] text-[#2B2320]'
                      : 'border-[#EAE1D7] bg-[#FAF8F5] text-[#5C4D44]'
                  }`}
                >
                  <div className="text-xs font-bold">{lang === 'hi' ? 'स्टूडियो में (Bandra Studio)' : 'At Bandra Studio'}</div>
                  <div className="text-[11px] text-[#7A675B] mt-0.5">{lang === 'hi' ? 'कोई अतिरिक्त शुल्क नहीं' : 'No travel surcharge'}</div>
                </button>
                <button
                  onClick={() => setServiceLocation('venue')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    serviceLocation === 'venue'
                      ? 'border-[#93523B] bg-[#F7ECE4] text-[#2B2320]'
                      : 'border-[#EAE1D7] bg-[#FAF8F5] text-[#5C4D44]'
                  }`}
                >
                  <div className="text-xs font-bold">{lang === 'hi' ? 'वेन्यू / होटल पर (At Venue/Hotel)' : 'On-Location Venue/Hotel'}</div>
                  <div className="text-[11px] text-[#93523B] mt-0.5 tabular-nums">+₹{PRICING.venueFee.toLocaleString('en-IN')} {lang === 'hi' ? 'ट्रेवल किट' : 'kit setup'}</div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Estimate Breakdown */}
          <div className="lg:col-span-5 sticky top-28 bg-[#28211E] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#3E332F] space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373]">
                {lang === 'hi' ? 'लाइव कोटेशन समरी' : 'Transparent Quotation'}
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                {lang === 'hi' ? 'पैकेज एस्टीमेट विवरण' : 'Bespoke Package Summary'}
              </h3>
            </div>

            {/* Inclusions summary list */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {itemsList.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#D8CDC4]">
                  <Check className="w-3.5 h-3.5 text-[#D4A373] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-[#443833] space-y-2 text-xs">
              <div className="flex justify-between text-[#C5B5A8]">
                <span>{lang === 'hi' ? 'कुल मूल्य (Subtotal)' : 'Gross Subtotal'}:</span>
                <span className="tabular-nums font-semibold text-white">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-[#4ADE80]">
                  <span>
                    {lang === 'hi' ? `मल्टी-इवेंट डिस्काउंट (${discountPercent}%)` : `Multi-Event Bundle (${discountPercent}% OFF)`}:
                  </span>
                  <span className="tabular-nums font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="pt-3 border-t border-[#443833] flex justify-between items-baseline">
                <span className="text-sm font-semibold text-white">
                  {lang === 'hi' ? 'अंतिम अनुमानित राशि:' : 'Estimated Package Total:'}
                </span>
                <span className="font-serif-luxury text-3xl font-bold text-[#E9C39B] tabular-nums">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] text-[#A6978C] text-right">
                {lang === 'hi' ? 'शेड्यूल लॉक करने हेतु 25% एडवांस' : '25% advance to lock bridal dates'}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleBookClick}
                className="w-full py-3.5 bg-[#D4A373] hover:bg-[#C08F60] text-[#1E1714] font-bold text-xs sm:text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'hi' ? 'यह कस्टम पैकेज बुक करें' : 'Reserve This Custom Package'}</span>
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="w-full py-3 bg-[#2E473B] hover:bg-[#25392F] text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-2 border border-[#436453] active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#4ADE80]" />
                <span>{lang === 'hi' ? 'व्हाट्सएप पर कोटेशन भेजें व तारीख जांचें' : 'Chat & Check Dates on WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
