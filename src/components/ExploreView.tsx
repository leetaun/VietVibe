import React, { useState, useMemo } from 'react';
import { Garment, HistoricalPeriod, Gender, Occasion } from '../types';
import { Search, BookOpen, Shirt, X, Sparkles } from 'lucide-react';

interface ExploreViewProps {
  garments: Garment[];
  onSelectGarmentDetail: (garment: Garment) => void;
  onStartStylistWithGarment: (garment: Garment) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  garments,
  onSelectGarmentDetail,
  onStartStylistWithGarment
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDynasty, setSelectedDynasty] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedOccasionTag, setSelectedOccasionTag] = useState<string>('all');

  const filteredGarments = useMemo(() => {
    return garments.filter((g) => {
      // Search
      const matchesSearch =
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.rankTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Dynasty
      const matchesDynasty =
        selectedDynasty === 'all' || g.dynasty === selectedDynasty;

      // Gender
      const matchesGender =
        selectedGender === 'all' ||
        g.gender === selectedGender ||
        g.gender === 'Unisex';

      // Type
      const matchesType =
        selectedType === 'all' || g.type.toLowerCase().includes(selectedType.toLowerCase());

      // Occasion tag
      const matchesOccasion =
        selectedOccasionTag === 'all' ||
        g.tags.includes(selectedOccasionTag as Occasion);

      return matchesSearch && matchesDynasty && matchesGender && matchesType && matchesOccasion;
    });
  }, [garments, searchQuery, selectedDynasty, selectedGender, selectedType, selectedOccasionTag]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDynasty('all');
    setSelectedGender('all');
    setSelectedType('all');
    setSelectedOccasionTag('all');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedDynasty !== 'all' ||
    selectedGender !== 'all' ||
    selectedType !== 'all' ||
    selectedOccasionTag !== 'all';

  return (
    <div className="space-y-8 pb-20 animate-fade-in max-w-7xl mx-auto">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Thư Viện Danh Mục
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 mt-1 uppercase">
            Khám Phá Việt Phục
          </h1>
          <p className="text-stone-400 text-xs mt-1">
            Tra cứu chuẩn mực cổ phục qua các triều đại lịch sử Đại Việt - Việt Nam
          </p>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg border border-amber-500/20 transition self-start md:self-auto cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Xóa bộ lọc</span>
          </button>
        )}
      </div>

      {/* Search & Filter Toolbar Matching PDF STT 3 Mockup */}
      <div className="space-y-4 bg-[#141722] p-5 rounded-2xl border border-stone-800 shadow-md">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm việt phục (vd: Nhật Bình, Áo Tấc...)"
            className="w-full pl-11 pr-4 py-3 bg-[#0e1017] border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-amber-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Multi-dimensional Horizontal Segmented Filters (Matching PDF STT 3) */}
        <div className="space-y-3 pt-2 text-xs">
          {/* 1. Thời kỳ lịch sử */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-400 font-semibold w-20 shrink-0">Thời kỳ:</span>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'Lý', label: 'Lý' },
                { id: 'Trần', label: 'Trần' },
                { id: 'Lê', label: 'Lê' },
                { id: 'Nguyễn', label: 'Nguyễn' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedDynasty(item.id)}
                  className={`px-3 py-1 rounded-lg border transition cursor-pointer font-medium ${
                    selectedDynasty === item.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Kiểu dáng */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-400 font-semibold w-20 shrink-0">Kiểu dáng:</span>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'tấc', label: 'Áo Tấc' },
                { id: 'nhật bình', label: 'Nhật Bình' },
                { id: 'ngũ thân', label: 'Ngũ Thân' },
                { id: 'giao lĩnh', label: 'Giao Lĩnh' },
                { id: 'viên lĩnh', label: 'Viên Lĩnh' },
                { id: 'đối khâm', label: 'Đối Khâm' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedType(item.id)}
                  className={`px-3 py-1 rounded-lg border transition cursor-pointer font-medium ${
                    selectedType === item.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Giới tính */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-400 font-semibold w-20 shrink-0">Giới tính:</span>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'Nữ', label: 'Nữ' },
                { id: 'Nam', label: 'Nam' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedGender(item.id)}
                  className={`px-3 py-1 rounded-lg border transition cursor-pointer font-medium ${
                    selectedGender === item.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tag phân loại nhanh: Dịp phù hợp (Lễ nghi triều đình, Dân gian, Cưới hỏi, Kỷ yếu) */}
        <div className="pt-3 border-t border-stone-800 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-stone-400 font-medium whitespace-nowrap">Dịp phù hợp:</span>
          {['all', 'Lễ nghi triều đình', 'Dân gian', 'Lễ cưới hỏi', 'Kỷ yếu học sinh', 'Tết cổ truyền'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedOccasionTag(tag)}
              className={`px-3 py-1 rounded-full whitespace-nowrap border transition cursor-pointer ${
                selectedOccasionTag === tag
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-semibold'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
              }`}
            >
              {tag === 'all' ? 'Tất cả các dịp' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Thư viện danh mục (Grid View - Matching PDF STT 3 Mockup) */}
      {filteredGarments.length === 0 ? (
        <div className="text-center py-20 bg-[#141722] rounded-2xl border border-stone-800 space-y-3">
          <p className="font-serif text-lg text-stone-300">Không tìm thấy phục trang phù hợp</p>
          <p className="text-xs text-stone-500">Hãy thử chọn lại bộ lọc hoặc từ khóa tìm kiếm.</p>
          <button
            onClick={resetFilters}
            className="mt-2 px-4 py-2 rounded-lg bg-amber-600 text-stone-950 font-semibold text-xs transition cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGarments.map((garment) => (
            <div
              key={garment.id}
              className="group bg-[#151824] rounded-2xl border border-stone-800 overflow-hidden hover:border-amber-600/50 hover:shadow-2xl hover:shadow-amber-950/20 transition flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative h-72 overflow-hidden bg-stone-900">
                <img
                  src={garment.imageUrl}
                  alt={garment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151824] via-transparent to-black/30" />

                {/* Dynasty tag */}
                <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded bg-stone-950/85 backdrop-blur-md text-amber-300 border border-amber-500/30">
                  {garment.dynastyLabel.split('(')[0].trim()}
                </span>

                <span className="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded bg-black/60 text-stone-300 backdrop-blur-md">
                  {garment.gender}
                </span>

                {/* Quick occasions tags on card */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                  {garment.tags.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-stone-950/80 backdrop-blur-md text-stone-300 border border-stone-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition">
                    {garment.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-medium mt-1">
                    {garment.rankTitle}
                  </p>
                  <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                    {garment.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-stone-800/80 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => onSelectGarmentDetail(garment)}
                    className="py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white text-xs font-semibold border border-stone-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Thẻ văn hóa</span>
                  </button>

                  <button
                    onClick={() => onStartStylistWithGarment(garment)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-950/30 cursor-pointer"
                  >
                    <Shirt className="w-3.5 h-3.5 text-stone-950" />
                    <span>Phối đồ</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
