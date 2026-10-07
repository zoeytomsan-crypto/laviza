export interface ServiceItem {
  id: string;
  category: 'bridal' | 'hair' | 'skin' | 'nails' | 'spa' | 'grooming';
  nameEn: string;
  nameHi: string;
  duration: string;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  descEn: string;
  descHi: string;
  featuresEn: string[];
  featuresHi: string[];
}

export interface Stylist {
  id: string;
  name: string;
  roleEn: string;
  roleHi: string;
  experience: string;
  specialtyEn: string;
  specialtyHi: string;
  image: string;
}

export interface BridalPackage {
  id: string;
  nameEn: string;
  nameHi: string;
  price: number;
  badgeEn?: string;
  badgeHi?: string;
  descEn: string;
  descHi: string;
  includesEn: string[];
  includesHi: string[];
  recommendedForEn: string;
  recommendedForHi: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  stylistId: string;
  stylistName: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  locationType: 'salon' | 'venue';
  venueAddress?: string;
  specialNotes?: string;
  totalPrice: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export const CATEGORIES = [
  { id: 'all', nameEn: 'All Services', nameHi: 'सभी सेवाएं' },
  { id: 'bridal', nameEn: 'Bridal & Occasion', nameHi: 'ब्राइडल व पार्टी मेकअप' },
  { id: 'hair', nameEn: 'Hair Styling & Spa', nameHi: 'हेयर कट, कलर व स्पा' },
  { id: 'skin', nameEn: 'Skin & Aesthetics', nameHi: 'स्किन केयर व फेशियल' },
  { id: 'nails', nameEn: 'Nails & Gel Art', nameHi: 'नेल आर्ट व एक्सटेंशन' },
  { id: 'spa', nameEn: 'Body Spa & Wellness', nameHi: 'बॉडी स्पा व रिलैक्सेशन' },
  { id: 'grooming', nameEn: 'Waxing & Threading', nameHi: 'वैक्सिंग व थ्रेडिंग' },
] as const;

export const SERVICES: ServiceItem[] = [
  // BRIDAL
  {
    id: 'b-1',
    category: 'bridal',
    nameEn: 'Royal HD Bridal Makeover',
    nameHi: 'रॉयल एचडी ब्राइडल मेकओवर',
    duration: '180 mins',
    price: 18500,
    originalPrice: 22000,
    popular: true,
    descEn: 'Ultra-refined high definition bridal look with sweat-proof finish, premium lashes, jewelry fitting & designer lehenga draping.',
    descHi: 'पसीने से सुरक्षित एचडी मेकअप, प्रीमियम लैशेज, ज्वेलरी फिटिंग और डिज़ाइनर लहंगा ड्रेपिंग।',
    featuresEn: ['HD Silicon-based airbrush touch', '3D Mink Lashes & lenses', 'Hairstyle with real flowers', 'Lehenga & Dupatta Draping'],
    featuresHi: ['एचडी सिलिकॉन एयरब्रश टच', '3D मिंक लैशेस व लेंस', 'असली फूलों संग हेयरस्टाइल', 'लहंगा व दुपट्टा ड्रेपिंग']
  },
  {
    id: 'b-2',
    category: 'bridal',
    nameEn: 'Airbrush Couture Bridal Glam',
    nameHi: 'एयरब्रश कॉट्योर ब्राइडल ग्लैम',
    duration: '210 mins',
    price: 24000,
    originalPrice: 28000,
    popular: true,
    descEn: 'Flawless feather-light airbrush makeup lasting 16+ hours with cinematic contouring and bridal touch-up kit.',
    descHi: '16+ घंटे टिकने वाला हल्का एयरब्रश मेकअप, सिनेमैटिक कंटूरिंग और फ्री टच-अप किट।',
    featuresEn: ['Temptu Pro HD Airbrush gun', 'Waterproof 18-hr guarantee', 'Custom hair extensions setting', 'Emergency bridal touch-up kit'],
    featuresHi: ['टेम्पटू प्रो एयरब्रश गन', '18 घंटे वाटरप्रूफ गारंटी', 'कस्टम हेयर एक्सटेंशन सेटिंग', 'इमरजेंसी ब्राइडल टच-अप किट']
  },
  {
    id: 'b-3',
    category: 'bridal',
    nameEn: 'Cocktail & Sangeet Evening Glam',
    nameHi: 'कॉकटेल व संगीत इवनिंग ग्लैम',
    duration: '120 mins',
    price: 8500,
    originalPrice: 10000,
    popular: false,
    descEn: 'Smokey or soft-glam party makeover with Hollywood curls, highlighter glow, and designer saree draping.',
    descHi: 'हॉलीवुड कर्ल्स, शाइनिंग हाईलाइटर और साड़ी ड्रेपिंग संग पार्टी व संगीत मेकओवर।',
    featuresEn: ['Signature soft smokey eyes', 'Hollywood textured waves', 'Lashes & brow sculpting', 'Saree / Indo-western draping'],
    featuresHi: ['सिग्नेचर सॉफ्ट स्मोकी आइज', 'हॉलीवुड टेक्सचर्ड वेव्स', 'लैशेज और ब्रो शेपिंग', 'साड़ी / इंडो-वेस्टर्न ड्रेपिंग']
  },
  {
    id: 'b-4',
    category: 'bridal',
    nameEn: 'Haldi & Mehendi Fresh Floral Look',
    nameHi: 'हल्दी व मेहंदी फ्रेश फ्लोरल लुक',
    duration: '90 mins',
    price: 6500,
    originalPrice: 7500,
    popular: false,
    descEn: 'Dewy glass-skin base, peachy tones, floral braided hairdo, and long-lasting fresh finish.',
    descHi: 'ड्यूई ग्लास-स्किन बेस, पीची टोन, ताजे फूलों वाली चोटी हेयरडू और फ्रेश फिनिश।',
    featuresEn: ['Glass skin luminous base', 'Messy floral braid styling', 'Subtle shimmer eyeliner', 'Water-resistant lightweight tint'],
    featuresHi: ['ग्लास स्किन ग्लो बेस', 'मेसी फ्लोरल ब्रेड हेयरस्टाइल', 'सॉफ्ट शिमर आईलाइनर', 'वाटर-रेसिस्टेंट लाइटवेट टिंट']
  },

  // HAIR
  {
    id: 'h-1',
    category: 'hair',
    nameEn: 'Signature Balayage & French Gloss',
    nameHi: 'सिग्नेचर बलेयाज व फ्रेंच ग्लॉस',
    duration: '180 mins',
    price: 9500,
    originalPrice: 12000,
    popular: true,
    descEn: 'Hand-painted dimensional caramel or mocha balayage with Olaplex bond repair and gloss toner.',
    descHi: 'हैंड-पेंटेड कैरेमल या मोका बलेयाज, ओलाप्लेक्स बॉन्ड रिपेयर और फ्रेंच ग्लॉस टोनर।',
    featuresEn: ['Custom color consultation', 'Olaplex No. 1 & 2 bond builder', 'Ammonia-free French gloss', 'Bespoke blowout finish'],
    featuresHi: ['कस्टम कलर कंसल्टेशन', 'ओलाप्लेक्स बॉन्ड बिल्डर', 'अमोनिया-फ्री फ्रेंच ग्लॉस', 'सिग्नेचर ब्लो-आउट फिनिश']
  },
  {
    id: 'h-2',
    category: 'hair',
    nameEn: 'Keratin & Nanoplastia Protein Therapy',
    nameHi: 'केराटिन व नैनोप्लास्टिया प्रोटीन थेरेपी',
    duration: '150 mins',
    price: 7800,
    originalPrice: 9500,
    popular: true,
    descEn: 'Zero formaldehyde deep smoothing treatment eliminating 95% frizz with mirror-like shine for up to 5 months.',
    descHi: 'फॉर्मलडिहाइड-मुक्त स्मूथिंग ट्रीटमेंट, 95% फ्रिज़ खत्म और 5 महीने तक चमकदार सीधे बाल।',
    featuresEn: ['Formaldehyde-free organic formula', 'Intense moisture infusion', '5 months frizz control', 'Free post-wash blow dry'],
    featuresHi: ['फॉर्मल्डिहाइड-मुक्त आर्गेनिक फॉर्मूला', 'गहरा नमी पोषण', '5 महीने तक फ्रिज़ कंट्रोल', 'फ्री पोस्ट-वॉश ब्लो ड्राई']
  },
  {
    id: 'h-3',
    category: 'hair',
    nameEn: 'Kérastase Chronologiste Caviar Hair Spa',
    nameHi: 'केरास्टास कैवियार लक्जरी हेयर स्पा',
    duration: '75 mins',
    price: 3800,
    originalPrice: 4500,
    popular: false,
    descEn: 'Youth-revitalizing scalp and strand ritual with mimetic caviar pearls, steam infusion and shoulder massage.',
    descHi: 'बालों की जड़ों को नई जान देने वाला लक्जरी स्पा, मिमेटिक कैवियार पर्ल्स और शोल्डर मसाज।',
    featuresEn: ['Scalp micro-exfoliation', 'Caviar pearl infusion cream', 'Ozone micro-mist steaming', '15-min relaxing pressure massage'],
    featuresHi: ['स्कैल्प माइक्रो-एक्सफोलिएशन', 'कैवियार पर्ल क्रीम इन्फ्यूजन', 'ओजोन माइक्रो-मिस्ट स्टीम', '15 मिनट रिलैक्सिंग मसाज']
  },
  {
    id: 'h-4',
    category: 'hair',
    nameEn: 'Precision Designer Cut & Style',
    nameHi: 'प्रिसिजन डिज़ाइनर हेयर कट व स्टाइल',
    duration: '45 mins',
    price: 1600,
    popular: false,
    descEn: 'Face-framing haircut customized to your facial geometry, finished with Dyson Supersonic blowout styling.',
    descHi: 'चेहरे के आकार अनुसार परफेक्ट हेयरकट और डायसन सुपरसोनिक ब्लो-ड्राई स्टाइलिंग।',
    featuresEn: ['Facial bone structure analysis', 'Deep cleansing wash & condition', 'Precision layered cut', 'Dyson bouncy blowout'],
    featuresHi: ['फेस स्ट्रक्चर एनालिसिस', 'डीप क्लींजिंग वॉश व कंडीशन', 'प्रिसिजन लेयर्ड कट', 'डायसन बाउंसी ब्लोआउट']
  },

  // SKIN
  {
    id: 's-1',
    category: 'skin',
    nameEn: '7-Step Hydra-Dermabrasion Glow Facial',
    nameHi: '7-स्टेप हाइड्रा-फेशियल ग्लो ट्रीटमेंट',
    duration: '75 mins',
    price: 4900,
    originalPrice: 6500,
    popular: true,
    descEn: 'Deep vortex pore extraction, salicylic peel, hyaluronic acid infusion, cold hammer cryo therapy, and LED light healing.',
    descHi: 'डीप पोर्स सफाई, सैलिसिलिक पील, हायलूरोनिक एसिड इन्फ्यूजन, क्रायो थेरेपी और एलईडी हीलिंग।',
    featuresEn: ['Vortex vacuum extraction', 'Oxygen dome infusion', 'Cryo cold pore tightening', 'Medical grade LED light dome'],
    featuresHi: ['वोर्टेक्स वैक्यूम एक्सट्रैक्शन', 'ऑक्सीजन डोम इन्फ्यूजन', 'क्रायो पोर्स टाइटनिंग', 'मेडिकल ग्रेड एलईडी लाइट']
  },
  {
    id: 's-2',
    category: 'skin',
    nameEn: '24K Pure Gold Collagen Bridal Facial',
    nameHi: '24K शुद्ध गोल्ड कोलेजन ब्राइडल फेशियल',
    duration: '90 mins',
    price: 5500,
    originalPrice: 7000,
    popular: true,
    descEn: 'Pure 24K gold foil sheets with marine collagen peptides for an unmistakable royal luminosity before your big day.',
    descHi: 'शुद्ध 24K सोने की पत्तियां और मरीन कोलेजन जो शादी से पहले चेहरे को देता है शाही निखार।',
    featuresEn: ['Pure 24K gold leaf application', 'Marine collagen mask', 'Ultrasonic serum deep absorption', 'De-tan neck & back polish'],
    featuresHi: ['24K गोल्ड लीफ एप्लीकेशन', 'मरीन कोलेजन मास्क', 'अल्ट्रासोनिक सीरम अब्सॉर्प्शन', 'डी-टैन नेक व बैक पॉलिश']
  },
  {
    id: 's-3',
    category: 'skin',
    nameEn: 'Dermaplaning & Brightening Glass Peel',
    nameHi: 'डर्माप्लेनिंग व ब्राइटनिंग ग्लास पील',
    duration: '60 mins',
    price: 3200,
    popular: false,
    descEn: 'Gentle surgical-grade peach fuzz removal combined with gentle lactic enzyme peel for immediate velvety smooth skin.',
    descHi: 'चेहरे के बारीक रोएं (पीच फज़) हटाकर लैक्टिक एंजाइम पील से पाएं तुरंत मखमली चमक।',
    featuresEn: ['Surgical blade dead skin removal', 'Lactic brightening peel', 'Calming cica sheet mask', 'Broad spectrum peptide barrier'],
    featuresHi: ['डेड स्किन व पीच फज़ रिमूवल', 'लैक्टिक ब्राइटनिंग पील', 'कूलिंग सिका शीट मास्क', 'पेप्टाइड बैरियर सीरम']
  },
  {
    id: 's-4',
    category: 'skin',
    nameEn: 'Insta De-Tan & Ozone Back Polish',
    nameHi: 'इंस्टा डी-टैन व ओजोन बैक पॉलिश',
    duration: '45 mins',
    price: 2100,
    popular: false,
    descEn: 'Natural kojic & arbutin active pack reversing stubborn UV sun tan on face, neck, and upper back.',
    descHi: 'कोजिक और अर्बुटिन पैक से चेहरे, गर्दन व बैक की सन टैनिंग मिनटों में दूर करें।',
    featuresEn: ['Walnut botanical scrub', 'Kojic active de-tan pack', 'Ozone steam treatment', 'Vitamin E glow glaze'],
    featuresHi: ['अखरोट बॉटनिकल स्क्रब', 'कोजिक एक्टिव डी-टैन पैक', 'ओजोन स्टीम ट्रीटमेंट', 'विटामिन ई ग्लो ग्लेज']
  },

  // NAILS
  {
    id: 'n-1',
    category: 'nails',
    nameEn: 'Russian Manicure & Hard Gel Overlay',
    nameHi: 'रशियन मैनीक्योर व हार्ड जेल ओवरले',
    duration: '90 mins',
    price: 2800,
    originalPrice: 3500,
    popular: true,
    descEn: 'Precision e-file dry cuticle detailing followed by structure gel strengthening with 4-week chip-free wear.',
    descHi: 'प्रिसिजन ई-फाइल ड्राई क्यूटिकल केयर और हार्ड जेल जिससे नेल्स 4 हफ्ते तक नए जैसे रहें।',
    featuresEn: ['Dry diamond drill cuticle treatment', 'Strengthening builder gel', 'Chrome or French tips', 'Nourishing botanical cuticle oil'],
    featuresHi: ['डायमंड ड्रिल क्यूटिकल सफाई', 'मजबूत बिल्डर जेल कोटिंग', 'क्रोम या फ्रेंच टिप्स', 'क्यूटिकल नरिशिंग ऑयल']
  },
  {
    id: 'n-2',
    category: 'nails',
    nameEn: 'Bridal 3D Acrylic Extensions & Nail Art',
    nameHi: 'ब्राइडल 3D एक्रिलिक एक्सटेंशन व नेल आर्ट',
    duration: '120 mins',
    price: 4200,
    originalPrice: 5000,
    popular: true,
    descEn: 'Sculpted acrylic nail extensions with Swarovski stones, 3D floral accents, or ombre rose-gold chrome finish.',
    descHi: 'स्वरोवस्की क्रिस्टल्स, 3D फ्लोरल वर्क या रोज-गोल्ड क्रोम फिनिश संग खूबसूरत ब्राइडल नेल्स।',
    featuresEn: ['Sculpted nail tips with custom length', 'Swarovski crystals & 3D flowers', 'Non-yellowing crystal clear acrylic', 'High-gloss UV topcoat'],
    featuresHi: ['कस्टम लेंथ एक्रिलिक टिप्स', 'स्वरोवस्की क्रिस्टल्स व 3D फूल', 'नॉन-येलोइंग एक्रिलिक', 'हाई-ग्लॉस यूवी टॉपकोट']
  },
  {
    id: 'n-3',
    category: 'nails',
    nameEn: 'Rose Petal & Sea Salt Luxury Pedicure',
    nameHi: 'गुलाब जल व सी-साल्ट लक्जरी पेडीक्योर',
    duration: '60 mins',
    price: 1800,
    popular: false,
    descEn: 'Warm rose milk foot soak, Dead Sea salt scrub, callus buffing, paraffin wax moisture dip, and gel polish.',
    descHi: 'गुलाब दूध में पैरों का सोक, सी-साल्ट स्क्रब, एड़ियों की सफाई और पैराफिन वैक्स डीप नरिशमेंट।',
    featuresEn: ['Warm rose water foot bath', 'Dead sea pumice scrub', 'Paraffin wax thermal wrap', 'Long-stay gel color'],
    featuresHi: ['गुलाब जल व दूध सोक', 'डेड सी प्युमिस स्क्रब', 'पैराफिन वैक्स वॉर्म रैप', 'लॉन्ग-स्टे जेल कलर']
  },

  // SPA
  {
    id: 'sp-1',
    category: 'spa',
    nameEn: 'Aromatherapy Balinese Full Body Massage',
    nameHi: 'अरोमाथेरेपी बालीनीस फुल बॉडी मसाज',
    duration: '60 mins',
    price: 3400,
    originalPrice: 4200,
    popular: true,
    descEn: 'Therapeutic pressure points, long flowing strokes, and warm essential oils melting away bridal tension and fatigue.',
    descHi: 'गर्म एसेंशियल ऑयल और एक्यूप्रेशर स्ट्रोक्स से शरीर की थकान व तनाव को पूरी तरह मिटाएं।',
    featuresEn: ['Custom blended organic oils', 'Warm stone spinal therapy', 'Herbal steam shower access', 'Herbal green tea finish'],
    featuresHi: ['ऑर्गेनिक एसेंशियल ऑयल्स', 'वॉर्म स्टोन स्पाइनल थेरेपी', 'हर्बल स्टीम शॉवर', 'हर्बल ग्रीन टी']
  },
  {
    id: 'sp-2',
    category: 'spa',
    nameEn: 'Exotic Turkish Coffee & Walnut Body Polish',
    nameHi: 'टर्किश कॉफी व अखरोट बॉडी पॉलिश',
    duration: '75 mins',
    price: 4500,
    originalPrice: 5500,
    popular: false,
    descEn: 'Full-body deep exfoliation using freshly roasted Arabic coffee and walnut granules followed by whipped shea butter glaze.',
    descHi: 'अरेबिक कॉफी और अखरोट से पूरे शरीर का स्क्रब और शिया बटर से मखमली हाइड्रेशन।',
    featuresEn: ['Full body micro-polish', 'Cellulite stimulating lymphatic rub', 'Hydrating shea glaze', 'Silky glowing skin for 2 weeks'],
    featuresHi: ['फुल बॉडी माइक्रो-पॉलिश', 'सेल्युलाइट रिडक्शन रब', 'शिया बटर हाइड्रेशन', '2 हफ्तों तक चमकदार त्वचा']
  },

  // GROOMING
  {
    id: 'g-1',
    category: 'grooming',
    nameEn: 'Rica White Chocolate Full Body Waxing',
    nameHi: 'रिका व्हाइट चॉकलेट फुल बॉडी वैक्सिंग',
    duration: '90 mins',
    price: 3600,
    originalPrice: 4500,
    popular: true,
    descEn: 'Colophony-free Italian Rica peel-off wax for sensitive skin, 90% less pain, leaving zero redness.',
    descHi: 'इटैलियन रिका चॉकलेट वैक्स, 90% कम दर्द और संवेदनशील त्वचा के लिए सबसे सुरक्षित।',
    featuresEn: ['Full arms, legs & underarms', 'Pre-wax antiseptic lotion', 'Ingrown hair prevention', 'Post-wax soothing lotus oil'],
    featuresHi: ['हाथ, पैर व अंडरआर्म्स', 'प्री-वैक्स एंटीसेप्टिक लोशन', 'इनग्रोन हेयर से बचाव', 'पोस्ट-वैक्स लोटस ऑयल']
  },
  {
    id: 'g-2',
    category: 'grooming',
    nameEn: 'HD Eyebrow Threading & Tint Sculpting',
    nameHi: 'एचडी आइब्रो थ्रेडिंग व टिंट शेपिंग',
    duration: '30 mins',
    price: 450,
    popular: false,
    descEn: 'Golden-ratio facial brow mapping, antibacterial organic cotton thread, and semi-permanent vegetable tint.',
    descHi: 'गोल्डन रेशियो फेस मैपिंग अनुसार परफेक्ट भौंहों का आकार और हर्बल टिंट।',
    featuresEn: ['Precision facial mapping', 'Organic antibacterial thread', 'Soothing aloe-vera ice massage', 'Natural vegetable tint shape'],
    featuresHi: ['प्रिसिजन फेशियल मैपिंग', 'ऑर्गेनिक एंटीबैक्टीरियल धागा', 'एलोवेरा आइस मसाज', 'नेचुरल वेजिटेबल टिंट']
  }
];

export const BRIDAL_PACKAGES: BridalPackage[] = [
  {
    id: 'bp-1',
    nameEn: 'The Noor-E-Khwaab Bridal Heritage Package',
    nameHi: 'नूर-ए-ख्वाब रॉयल ब्राइडल पैकेज',
    price: 38999,
    badgeEn: 'Most Popular',
    badgeHi: 'सबसे लोकप्रिय',
    descEn: 'The quintessential royal experience. Complete wedding day styling plus pre-bridal glow sittings.',
    descHi: 'शाही दुल्हन का संपूर्ण पैकेज: शादी के दिन का अल्ट्रा एचडी मेकअप और शादी से पहले की 2 ग्लो सेटिंग्स।',
    includesEn: [
      'Wedding Day: Ultra HD Luxury Airbrush Makeup with 3D Lashes',
      'Designer Lehenga Draping with dual dupatta pin-up',
      'Pre-Bridal Sitting 1 (15 Days Prior): HydraFacial + Chronologiste Hair Spa',
      'Pre-Bridal Sitting 2 (3 Days Prior): Full Body Rica Wax + 24K Gold Facial',
      'Swarovski & Floral Bridal Hairdo with real imported baby breaths',
      'Complementary Bridal Makeup Touch-up Kit'
    ],
    includesHi: [
      'शादी का दिन: अल्ट्रा एचडी लक्जरी एयरब्रश मेकअप व 3D लैशेज',
      'डिज़ाइनर लहंगा ड्रेपिंग व डबल दुपट्टा परफेक्ट पिन-अप',
      'प्री-ब्राइडल सिटिंग 1 (15 दिन पहले): हाइड्रा-फेशियल + केरास्टास हेयर स्पा',
      'प्री-ब्राइडल सिटिंग 2 (3 दिन पहले): फुल बॉडी रिका वैक्स + 24K गोल्ड फेशियल',
      'असली इंपोर्टेड फूलों संग खूबसूरत ब्राइडल हेयरडू',
      'फ्री ब्राइडल इमरजेंसी टच-अप किट'
    ],
    recommendedForEn: 'Traditional Indian Wedding & Royal Reception',
    recommendedForHi: 'ट्रेडिशनल भारतीय शादी व रिसेप्शन के लिए'
  },
  {
    id: 'bp-2',
    nameEn: 'The Modern Minimalist Bride (HD Look)',
    nameHi: 'मॉडर्न मिनिमलिस्ट ब्राइड (एचडी लुक)',
    price: 24999,
    badgeEn: 'Best Value',
    badgeHi: 'किफायती लक्जरी',
    descEn: 'Tailored for contemporary brides wanting dewy glass-skin elegance, soft smokey eyes, and textured hair.',
    descHi: 'आधुनिक दुल्हनों के लिए ड्यूई ग्लास-स्किन लुक, सॉफ्ट स्मोकी आइज और एलिगेंट हेयरडू।',
    includesEn: [
      'Wedding Day: Signature HD Camera-Ready Makeup',
      'Natural Mink Lashes & lenses application',
      'Textured Hollywood waves or traditional braided bun',
      'Dupatta draping and jewelry fixing',
      '1 Pre-Bridal Sitting: 7-Step HydraFacial & Instant Glow De-Tan'
    ],
    includesHi: [
      'शादी का दिन: सिग्नेचर एचडी कैमरा-रेडी मेकअप',
      'नेचुरल मिंक लैशेज व आई-लेंस एप्लीकेशन',
      'टेक्सचर्ड हॉलीवुड वेव्स या एलिगेंट ब्राइडल बन',
      'दुपट्टा ड्रेपिंग और ज्वेलरी फिक्सिंग',
      '1 प्री-ब्राइडल सिटिंग: 7-स्टेप हाइड्रा-फेशियल व डी-टैन'
    ],
    recommendedForEn: 'Destination Weddings, Intimate Ceremonies & Day Weddings',
    recommendedForHi: 'डेस्टिनेशन वेडिंग, डे वेडिंग व इंटीमेट शादियों के लिए'
  },
  {
    id: 'bp-3',
    nameEn: '3-Day Complete Wedding Troussau Combo',
    nameHi: '3-दिवसीय सम्पूर्ण वेडिंग ट्रूसो कॉम्बो',
    price: 54999,
    badgeEn: 'All Functions Covered',
    badgeHi: 'सभी फंक्शन्स कवर्ड',
    descEn: 'Complete makeup & styling coverage for Mehendi, Sangeet/Cocktail, and Wedding Day.',
    descHi: 'मेहंदी, संगीत/कॉकटेल और मुख्य शादी के दिन का संपूर्ण 3-डे मेकओवर कवरेज।',
    includesEn: [
      'Day 1 (Mehendi/Haldi): Dewy fresh floral look with messy braid styling',
      'Day 2 (Sangeet): Glamorous smokey eye, high-shine glitter & voluminous curls',
      'Day 3 (Wedding): Ultra HD Airbrush bridal makeup & designer draping',
      'Complete pre-bridal salon pampering ritual 5 days before',
      'Complimentary styling for Mother of the Bride or 1 Sister'
    ],
    includesHi: [
      'दिन 1 (हल्दी/मेहंदी): फ्रेश फ्लोरल लुक व मेसी ब्रेड हेयरस्टाइल',
      'दिन 2 (संगीत): ग्लैमरस स्मोकी आइज व वॉल्यूमिनस कर्ल्स',
      'दिन 3 (शादी): अल्ट्रा एचडी एयरब्रश ब्राइडल मेकअप व ड्रेपिंग',
      'शादी से 5 दिन पूर्व सम्पूर्ण प्री-ब्राइडल पैम्परिंग पैकेज',
      'मदर ऑफ़ द ब्राइड या 1 सिस्टर का फ्री पार्टी मेकअप'
    ],
    recommendedForEn: 'Grand Indian Weddings with multi-day events',
    recommendedForHi: 'भव्य शादियों व बहु-दिवसीय आयोजनों के लिए'
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'st-1',
    name: 'Neha Kapoor',
    roleEn: 'Master Celebrity Makeup Artist',
    roleHi: 'मास्टर सेलिब्रिटी मेकअप आर्टिस्ट',
    experience: '12+ Years Experience',
    specialtyEn: 'HD & Airbrush Bridal, Cinematic Contouring',
    specialtyHi: 'एचडी व एयरब्रश ब्राइडल, सिनेमैटिक कंटूरिंग',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'st-2',
    name: 'Rohan Varma',
    roleEn: 'Artistic Hair Director',
    roleHi: 'आर्टिस्टिक हेयर डायरेक्टर',
    experience: '10+ Years Experience',
    specialtyEn: 'Balayage, Keratin, Intricate Floral Hairdos',
    specialtyHi: 'बलेयाज, केराटिन व डिज़ाइनर फ्लोरल हेयरस्टाइल',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'st-3',
    name: 'Dr. Priya Sen',
    roleEn: 'Clinical Cosmetologist & Skin Specialist',
    roleHi: 'क्लिनिकल कॉस्मेटोलॉजिस्ट व स्किन एक्सपर्ट',
    experience: '8+ Years Experience',
    specialtyEn: 'HydraFacials, Glass Skin Peels, Anti-Pigmentation',
    specialtyHi: 'हाइड्रा-फेशियल्स, ग्लास स्किन पील्स, पिगमेंटेशन क्योर',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'st-4',
    name: 'Simran Khurana',
    roleEn: 'Senior Nail Artist & Spa Therapist',
    roleHi: 'सीनियर नेल आर्टिस्ट व स्पा थेरेपिस्ट',
    experience: '6+ Years Experience',
    specialtyEn: 'Russian E-file Manicure, Swarovski 3D Art',
    specialtyHi: 'रशियन मैनीक्योर, स्वरोवस्की 3D नेल आर्ट',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  }
];

export const TESTIMONIALS = [
  {
    id: 'rev-1',
    name: 'Aanya Singhania',
    eventEn: 'Winter Bride (December 2025)',
    eventHi: 'विंटर ब्राइड (दिसंबर 2025)',
    rating: 5,
    textEn: 'Neha and her team gave me the wedding look of my dreams! The airbrush stayed completely intact through tears, pheras, and 6 hours of dancing without a single smudge. Everyone praised my glow.',
    textHi: 'नेहा और उनकी टीम ने मुझे मेरे सपनों का ब्राइडल लुक दिया! फेरों और 6 घंटे के डांस के बाद भी मेकअप बिल्कुल फ्रेश था। हर किसी ने मेरी स्किन के निखार की तारीफ की।'
  },
  {
    id: 'rev-2',
    name: 'Dr. Meera Rajput',
    eventEn: 'Hair Balayage & HydraFacial Regular',
    eventHi: 'हेयर बलेयाज व हाइड्रा-फेशियल क्लाइंट',
    rating: 5,
    textEn: 'Aura & Noor has the cleanest, most hygienic parlor environment I have ever seen. Rohan did my caramel balayage without damaging my curls, and the HydraFacial took away years of sun dullness.',
    textHi: 'औरा एंड नूर में स्वच्छता और हाइजीन का स्तर बेमिसाल है। रोहन ने बालों को जरा भी नुकसान पहुंचाए बिना परफेक्ट बलेयाज दिया, और हाइड्रा-फेशियल से चेहरा चमक उठा।'
  },
  {
    id: 'rev-3',
    name: 'Pooja Kashyap',
    eventEn: 'Sister of Bride & Cocktail Party',
    eventHi: 'सिस्टर ऑफ़ द ब्राइड व पार्टी मेकअप',
    rating: 5,
    textEn: 'Booked their 3-function family package for my sister’s wedding. The punctuality, professionalism, and elegance were 10/10. Even their saree draping team is so gentle and skilled!',
    textHi: 'मेरी बहन की शादी के लिए फैमिली पैकेज बुक किया था। समय की पाबंदी, बातचीत का सलीका और मेकअप का हुनर 10/10 था। साड़ी ड्रेपिंग भी बेहद खूबसूरत की!'
  }
];

export const SALON_INFO = {
  name: 'Aura & Noor Luxury Salon & Bridal Studio',
  taglineEn: 'Haute Beauty Aesthetics & Royal Bridal Artistry',
  taglineHi: 'शाही ब्राइडल आर्टिस्ट्री व आधुनिक ब्यूटी एस्थेटिक्स',
  addressEn: 'Plot 42, Heritage Boulevard, Linking Road, Bandra West, Mumbai 400050',
  addressHi: 'प्लॉट 42, हेरिटेज बुलेवार्ड, लिंकिंग रोड, बांद्रा वेस्ट, मुंबई 400050',
  phone: '+91 98201 44520',
  whatsappNumber: '919820144520',
  email: 'concierge@auranoorsalon.com',
  timingsEn: 'Tuesday – Sunday: 10:00 AM – 8:30 PM (Mondays: VIP & Bridal Bookings Only)',
  timingsHi: 'मंगलवार – रविवार: सुबह 10:00 – रात 8:30 (सोमवार: केवल वीआईपी व ब्राइडल बुकिंग्स)'
};
