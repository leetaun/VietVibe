import React from 'react';
import { OutfitPiece, Garment, CulturalCheckResult } from '../types';
import { runCulturalCompatibilityCheck } from '../data/culturalRules';
import { X, ShieldCheck, AlertTriangle, Wand2, ArrowRight } from 'lucide-react';

interface CulturalCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  outfit: OutfitPiece;
  garment: Garment;
  onApplyAutoFix: (fixedOutfit: OutfitPiece) => void;
  onProceedToTryOn: () => void;
}

export const CulturalCheckModal: React.FC<CulturalCheckModalProps> = ({
  isOpen,
  onClose,
  outfit,
  garment,
  onApplyAutoFix,
  onProceedToTryOn
}) => {
  if (!isOpen) return null;

  const result: CulturalCheckResult = runCulturalCompatibilityCheck(
    outfit,
    garment,
    (fixed) => onApplyAutoFix(fixed)
  );

  const handleFixAll = () => {
    result.issues.forEach(issue => {
      issue.fixAction();
    });
  };

  const firstIssue = result.issues[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#141722] rounded-2xl border border-amber-900/50 shadow-2xl overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 text-stone-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header: Matching PDF STT 7 */}
        <div className="p-6 border-b border-stone-800 bg-[#161926]">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>KIỂM TRA ĐỘ PHÙ HỢP VĂN HÓA (CULTURAL CHECK)</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-100 mt-1">
            Màn hình Kiểm tra tính phù hợp văn hóa
          </h2>
          <p className="text-stone-400 text-xs">
            Hệ thống đối chiếu tự động với quy chuẩn lễ phục {garment.name} ({garment.dynastyLabel})
          </p>
        </div>

        {/* Body Container */}
        <div className="p-6 space-y-6">
          {/* LARGE GUARDRAIL STATUS CARD (Matching PDF STT 7 Mockup) */}
          {result.issues.length > 0 ? (
            <div className="rounded-2xl border border-red-900/60 overflow-hidden bg-[#181a26] shadow-xl">
              {/* Alert Header Ribbon */}
              <div className="bg-gradient-to-r from-red-900 via-red-800 to-amber-900 px-5 py-3 text-white font-bold text-sm tracking-wide flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
                <span>CẢNH BÁO: CHƯA PHÙ HỢP QUY CHUẨN LỊCH SỬ</span>
              </div>

              {/* Split Content: Left image with item, Right explanation & action */}
              <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
                {/* Left image of the clashing combination */}
                <div className="relative w-40 h-52 rounded-xl overflow-hidden bg-black shrink-0 border border-stone-700 shadow-md">
                  <img
                    src={garment.imageUrl}
                    alt={garment.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-red-950/25 mix-blend-color" />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] text-red-300 border border-red-700 text-center font-bold">
                    ⚠️ {firstIssue?.violatingItem || 'Phụ kiện xung đột'}
                  </div>
                </div>

                {/* Right detailed critique and suggestion */}
                <div className="flex-1 space-y-4 text-xs">
                  <div className="text-stone-200 leading-relaxed space-y-1.5">
                    <p className="font-bold text-amber-300 text-sm">
                      {firstIssue?.title || 'Phát hiện phụ kiện chưa phù hợp'}
                    </p>
                    <p className="text-stone-300">
                      {firstIssue?.message ||
                        `Bạn đang phối ${garment.name} với phụ kiện hiện đại chưa đúng bối cảnh. Việc này có thể làm giảm tính nghiêm cẩn của trang phục.`}
                    </p>
                  </div>

                  {/* AI Suggestion Box */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/30 text-xs space-y-1">
                    <div className="text-[11px] font-bold text-amber-400">
                      Đề xuất chuẩn hóa bởi AI:
                    </div>
                    <p className="text-stone-200 font-light">
                      {firstIssue?.suggestion ||
                        'Đề xuất thay thế bằng Hài Nhung Thêu Truyền Thống hoặc Guốc Mộc.'}
                    </p>
                  </div>

                  {/* Actions right on card (matching PDF mockup) */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={handleFixAll}
                      className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/40 transition flex items-center gap-2 cursor-pointer"
                    >
                      <Wand2 className="w-4 h-4 text-stone-950" />
                      <span>TỰ ĐỘNG SỬA NHANH BỞI AI</span>
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onProceedToTryOn();
                      }}
                      className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold transition cursor-pointer"
                    >
                      BỎ QUA CẢNH BÁO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Perfectly Compatible Card */
            <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 text-center space-y-3">
              <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-emerald-300">
                PHÙ HỢP CHUẨN MỰC LỊCH SỬ & VĂN HÓA (100%)
              </h3>
              <p className="text-xs text-stone-300 max-w-md mx-auto">
                Bản phối của bạn tuân thủ chuẩn xác quy chế di sản của {garment.name}. Màu sắc và phụ kiện đi kèm tôn vinh trọn vẹn nét tôn nghiêm truyền thống.
              </p>
              <div className="pt-3">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToTryOn();
                  }}
                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs tracking-wide shadow-xl shadow-emerald-950/40 transition flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <span>TIẾN HÀNH THỬ ĐỒ BẰNG AI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
