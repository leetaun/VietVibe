import React, { useState } from 'react';
import { Garment } from '../types';
import { X, Shirt, AlertTriangle, ShieldCheck, Sparkles, History, ScrollText, CheckCircle2, ChevronLeft } from 'lucide-react';

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
      <div className="relative w-full max-w-5xl bg-[#141722] rounded-2xl border border-amber-900/50 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Breadcrumb Bar Matching PDF STT 4: "< Việt Phục AI Stylist | Màn hình Chi tiết | Khám phá" */}
        <div className="px-6 py-3.5 bg-[#0f1118] border-b border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Việt Phục AI Stylist</span>
            </button>
            <span>|</span>
            <span className="text-stone-200 font-semibold">Màn hình Chi tiết</span>
            <span>|</span>
            <span>Khám phá</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content 2-Column Split Layout */}
        <div className="flex flex-col lg:flex-row overflow-y-auto flex-1">
          {/* Left Side: High Quality Zoomed Image & Thumbnails */}
          <div className="lg:w-5/12 bg-black/60 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-800">
            <div className="space-y-4">
              <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden border border-amber-900/40 bg-stone-950 group shadow-2xl">
                <img
                  src={allImages[activeImageIndex]}
                  alt={garment.name}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-black/80 px-3 py-1 rounded text-xs font-semibold text-amber-300 border border-amber-500/30">
                  {garment.dynastyLabel}
                </div>
              </div>

              {/* Gallery thumbnails if multiple images */}
              {allImages.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition shrink-0 cursor-pointer ${
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
              <p>Trang phục phục dựng chuẩn mực theo cứ liệu bảo tàng & cổ thư.</p>
            </div>
          </div>

          {/* Right Side: Cultural Information Card Matching PDF STT 4 */}
          <div className="lg:w-7/12 p-6 sm:p-8 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Title & Rank */}
              <div>
                <h2 className="font-serif text-3xl font-bold text-amber-100 uppercase">
                  {garment.name}
                </h2>
                <p className="text-xs font-medium text-amber-400/90 mt-0.5">
                  {garment.rankTitle}
                </p>
              </div>

              {/* Nguồn gốc & Lịch sử */}
              <div className="bg-[#181c2b] p-4 rounded-xl border border-stone-800 space-y-1.5">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-amber-400" />
                  <span>Nguồn gốc & Lịch sử</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  {garment.historyOrigin}
                </p>
              </div>

              {/* Đặc trưng nổi bật */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Đặc trưng nổi bật</span>
                </div>
                <ul className="space-y-1">
                  {garment.visualFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ý nghĩa hoa văn */}
              <div className="bg-[#181c2b] p-4 rounded-xl border border-stone-800 space-y-1.5">
                <div className="text-xs font-bold text-amber-300">
                  Ý nghĩa hoa văn
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  {garment.patternSymbolism}
                </p>
              </div>

              {/* Hoàn cảnh sử dụng */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-amber-300">
                  Hoàn cảnh sử dụng
                </div>
                <div className="flex flex-wrap gap-2">
                  {garment.appropriateOccasions.map((occ, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded bg-stone-900 border border-stone-700 text-stone-300"
                    >
                      {occ}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lưu ý văn hóa (Cultural Guardrails) */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-600/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lưu ý văn hóa (Cultural Guardrails)</span>
                </div>
                <ul className="space-y-1 text-xs text-amber-200/90 font-light">
                  {garment.culturalGuardrails.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main CTA Button: PHỐI ĐỒ VỚI TRANG PHỤC NÀY */}
            <div className="pt-5 border-t border-stone-800">
              <button
                onClick={() => {
                  onClose();
                  onStartStylist(garment);
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-950/50 transition flex items-center justify-center gap-2 cursor-pointer uppercase"
              >
                <Shirt className="w-4 h-4 text-stone-950" />
                <span>PHỐI ĐỒ VỚI TRANG PHỤC NÀY</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
