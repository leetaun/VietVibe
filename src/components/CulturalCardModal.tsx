import React, { useState } from 'react';
import { Garment } from '../types';
import { X, Shirt, AlertTriangle, ShieldCheck, Sparkles, History, ScrollText, CheckCircle2 } from 'lucide-react';

interface CulturalCardModalProps {
  garment: Garment | null;
  isOpen: boolean;
  onClose: () => void;
  onStartStylist: (garment: Garment) => void;
}

export const CulturalCardModal: React.FC<CulturalCardModalProps> = ({
  garment,
  isOpen,
  onClose,
  onStartStylist
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !garment) return null;

  const allImages = [garment.imageUrl, ...(garment.detailImages || [])];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#141722] rounded-2xl border border-amber-900/50 shadow-2xl overflow-hidden flex flex-col lg:flex-row my-auto max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 text-stone-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: High Quality Zoomed Image & Thumbnails */}
        <div className="lg:w-5/12 bg-black/60 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-800">
          <div className="space-y-4">
            <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden border border-amber-900/40 bg-stone-950 group">
              <img
                src={allImages[activeImageIndex]}
                alt={garment.name}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-black/75 px-3 py-1 rounded-md text-xs font-semibold text-amber-300 border border-amber-500/30">
                {garment.dynastyLabel}
              </div>
              <div className="absolute bottom-3 left-3 bg-black/75 px-3 py-1 rounded-md text-[11px] text-stone-300">
                Ảnh cận cảnh chi tiết may & thêu
              </div>
            </div>

            {/* Gallery thumbnails if multiple images */}
            {allImages.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-amber-400 ring-2 ring-amber-500/40'
                        : 'border-stone-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-stone-800 text-xs text-stone-400 space-y-1">
            <p className="text-amber-200/90 font-medium">Bảo tồn nguyên bản</p>
            <p>Trang phục được phục dựng dựa trên tư liệu hiện vật bảo tàng và sắc lệnh triều đình.</p>
          </div>
        </div>

        {/* Right Side: Cultural Information Card */}
        <div className="lg:w-7/12 p-6 sm:p-8 overflow-y-auto space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Title Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
                <ScrollText className="w-3.5 h-3.5" />
                <span>Thẻ Văn Hóa Cổ Phục</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-amber-100 mt-1">
                {garment.name}
              </h2>
              <p className="text-sm font-medium text-amber-400/90 mt-0.5">
                {garment.rankTitle}
              </p>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                {garment.description}
              </p>
            </div>

            {/* 1. Nguồn gốc & Lịch sử */}
            <div className="bg-[#1a1e2c] p-4 rounded-xl border border-stone-800/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <History className="w-4 h-4 text-amber-400" />
                <span>Nguồn gốc & Lịch sử</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                {garment.historyOrigin}
              </p>
            </div>

            {/* 2. Đặc trưng nổi bật */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Đặc trưng nổi bật</span>
              </div>
              <ul className="space-y-1.5">
                {garment.visualFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Ý nghĩa hoa văn */}
            <div className="bg-[#1a1e2c] p-4 rounded-xl border border-stone-800/80 space-y-2">
              <div className="text-xs font-bold text-amber-300">
                Ý nghĩa hoa văn biểu trưng
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                {garment.patternSymbolism}
              </p>
            </div>

            {/* 4. Hoàn cảnh sử dụng */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-amber-300">
                Hoàn cảnh sử dụng quy chuẩn
              </div>
              <div className="flex flex-wrap gap-2">
                {garment.appropriateOccasions.map((occ, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-stone-900 border border-stone-700/80 text-stone-300"
                  >
                    {occ}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Lưu ý văn hóa (Cultural Guardrails) */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-600/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Lưu ý văn hóa (Cultural Guardrails)</span>
              </div>
              <ul className="space-y-1 text-xs text-amber-200/90 font-light">
                {garment.culturalGuardrails.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Action Button */}
          <div className="pt-6 border-t border-stone-800">
            <button
              onClick={() => {
                onClose();
                onStartStylist(garment);
              }}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-950/50 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shirt className="w-4 h-4 text-stone-950" />
              <span>PHỐI ĐỒ NGAY VỚI TRANG PHỤC NÀY</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
