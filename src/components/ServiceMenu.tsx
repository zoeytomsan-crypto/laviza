import React, { useState, useMemo } from 'react';
import { Search, Clock, Check, Sparkles, Plus, Info } from 'lucide-react';
import { CATEGORIES, SERVICES, ServiceItem } from '../data/salonData';

interface ServiceMenuProps {
  lang: 'en' | 'hi';
  onSelectService: (service: ServiceItem) => void;
}

export const ServiceMenu: React.FC<ServiceMenuProps> = ({ lang, onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDetailItem, setActiveDetailItem] = useState<ServiceItem | null>(null);

  const filteredServices = useMemo(() => {
    return SERVICES.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesQuery =
        item.nameEn.toLowerCase().includes(q) ||
        item.nameHi.toLowerCase().includes(q) ||
        item.descEn.toLowerCase().includes(q) ||
        item.descHi.toLowerCase().includes(q) ||
        item.featuresEn.some((f) => f.toLowerCase().includes(q)) ||
        item.featuresHi.some((f) => f.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#93523B]">
              {lang === 'hi' ? '01. सेवाएं व रेट कार्ड' : '01. Curated Rate Card'}
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#241D1A] tracking-tight">
              {lang === 'hi' ? 'विशेषज्ञ सेवाएं व संपूर्ण मूल्य सूची' : 'Bespoke Treatments & Salon Services'}
            </h2>
            <p className="text-sm sm:text-base text-[#6E5D53]">
              {lang === 'hi'
                ? 'हर सेवा में अंतरराष्ट्रीय स्तर के ब्रांड्स (Dyson, Kérastase, Olaplex, Temptu) और पूर्ण स्वच्छता का उपयोग होता है।'
                : 'Priced transparently with zero hidden charges. Each ritual utilizes certified dermatological actives and luxury formulations.'}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8C7A6E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'hi' ? 'सेवा खोजें (जैसे: हाइड्रा, केराटिन)...' : 'Search services (e.g. Balayage)...'}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-[#D9C9BC] rounded-lg text-[#2B2320] placeholder-[#9E8D82] focus:outline-none focus:ring-1 focus:ring-[#93523B] focus:border-[#93523B] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9E8D82] hover:text-[#2B2320]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs (Functional segmented controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-[#2B2320] text-white shadow-sm'
                    : 'bg-[#EFE9E0] text-[#5C4D44] hover:bg-[#E5DCD0] hover:text-[#2B2320]'
                }`}
              >
                {lang === 'hi' ? cat.nameHi : cat.nameEn}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-[#F3ECE4] rounded-xl border border-[#DFD1C4]">
            <p className="text-sm text-[#736156]">
              {lang === 'hi'
                ? 'कोई सेवा नहीं मिली। कृपया कोई अन्य शब्द खोजें।'
                : 'No services match your search query. Try searching for a different service.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-semibold text-[#93523B] underline underline-offset-4"
            >
              {lang === 'hi' ? 'सभी सेवाएं दिखाएं' : 'Show all services'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((item) => {
              const name = lang === 'hi' ? item.nameHi : item.nameEn;
              const desc = lang === 'hi' ? item.descHi : item.descEn;
              const features = lang === 'hi' ? item.featuresHi : item.featuresEn;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-[#E3D6C9] p-6 flex flex-col justify-between hover:border-[#C4A996] hover:shadow-md transition-all duration-200 group"
                >
                  <div className="space-y-4">
                    {/* Unboxed Metadata (Category · Duration) */}
                    <div className="flex items-center justify-between text-xs text-[#7A675B]">
                      <div className="flex items-center gap-1.5 font-medium uppercase tracking-wider">
                        <span>{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#93523B]" />
                          <span>{item.duration}</span>
                        </span>
                      </div>
                      {item.popular && (
                        <span className="text-[11px] font-semibold text-[#93523B] bg-[#F7ECE4] px-2 py-0.5 rounded">
                          {lang === 'hi' ? 'बेस्टसेलर' : 'Most Loved'}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-luxury text-xl font-bold text-[#271E1A] group-hover:text-[#93523B] transition-colors leading-snug">
                      {name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#5C4D44] leading-relaxed line-clamp-3">
                      {desc}
                    </p>

                    {/* Features checklist */}
                    <ul className="space-y-1.5 pt-2 border-t border-[#F1E9E1]">
                      {features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#4F3F36]">
                          <Check className="w-3.5 h-3.5 text-[#93523B] shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="mt-6 pt-4 border-t border-[#F1E9E1] flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif-luxury text-2xl font-bold text-[#241D1A] tabular-nums">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-[#9B897D] line-through tabular-nums">
                            ₹{item.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#8C7A6E]">
                        {lang === 'hi' ? 'सभी टैक्स शामिल' : 'Taxes included'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setActiveDetailItem(item)}
                        title="View Protocol Details"
                        className="p-2 text-[#7A675B] hover:text-[#2B2320] hover:bg-[#FAF6F2] rounded-md transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onSelectService(item)}
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-[#2B2320] hover:bg-[#93523B] rounded-md transition-colors flex items-center gap-1.5 shadow-sm active:scale-95 whitespace-nowrap"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === 'hi' ? 'बुक करें' : 'Book'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      {activeDetailItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] max-w-lg w-full rounded-2xl border border-[#D9C8B9] p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveDetailItem(null)}
              className="absolute top-4 right-4 text-[#7A675B] hover:text-[#241D1A] text-lg font-bold p-1"
            >
              ✕
            </button>

            <div className="space-y-4">
              <div className="text-xs font-semibold text-[#93523B] uppercase tracking-wider">
                {lang === 'hi' ? 'ट्रीटमेंट प्रोटोकॉल व विवरण' : 'Treatment Protocol & Details'}
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#241D1A]">
                {lang === 'hi' ? activeDetailItem.nameHi : activeDetailItem.nameEn}
              </h3>

              <div className="flex items-center gap-3 text-xs text-[#7A675B]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#93523B]" />
                  <span>{activeDetailItem.duration}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-base text-[#241D1A] tabular-nums">
                  ₹{activeDetailItem.price.toLocaleString('en-IN')}
                </span>
              </div>

              <p className="text-sm text-[#5C4D44] leading-relaxed">
                {lang === 'hi' ? activeDetailItem.descHi : activeDetailItem.descEn}
              </p>

              <div className="pt-2">
                <p className="text-xs font-semibold text-[#2B2320] uppercase tracking-wider mb-2">
                  {lang === 'hi' ? 'शामिल विशेषताएं (What is Included):' : 'What is Included in this Session:'}
                </p>
                <ul className="space-y-2">
                  {(lang === 'hi' ? activeDetailItem.featuresHi : activeDetailItem.featuresEn).map(
                    (feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#4F3F36]">
                        <Check className="w-4 h-4 text-[#93523B] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#EAE3DA] flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveDetailItem(null)}
                  className="px-4 py-2 text-xs font-medium text-[#5C4D44] hover:bg-[#EFE9E0] rounded-md transition-colors"
                >
                  {lang === 'hi' ? 'बंद करें' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    const item = activeDetailItem;
                    setActiveDetailItem(null);
                    onSelectService(item);
                  }}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#2B2320] hover:bg-[#93523B] rounded-md transition-colors shadow-sm"
                >
                  {lang === 'hi' ? 'इस सेवा को बुक करें' : 'Book This Service'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
