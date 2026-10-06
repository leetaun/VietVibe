import React from 'react';
import { OutfitPiece, Garment, CulturalCheckResult } from '../types';
import { runCulturalCompatibilityCheck } from '../data/culturalRules';
import { X, ShieldCheck, AlertTriangle, Wand2, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    // Apply fixes
    result.issues.forEach(issue => {
      issue.fixAction();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#141722] rounded-2xl border border-amber-900/50 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 text-stone-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 border-b border-stone-800 bg-[#171b28]">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>AI Cultural Guardrail</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-amber-100 mt-1">
            Kiểm Tra Độ Phù Hợp Văn Hóa (Cultural Check)
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            Đối chiếu quy chuẩn di sản của {garment.name} ({garment.dynastyLabel})
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* 1. Thẻ đánh giá tổng quan (Guardrail Status) */}
          <div
            className={`p-5 rounded-2xl border text-center space-y-2 ${
              result.isCompatible
                ? 'bg-emerald-950/25 border-emerald-500/50 text-emerald-200'
                : result.statusType === 'danger'
                ? 'bg-red-950/30 border-red-500/60 text-red-200'
                : 'bg-amber-950/25 border-amber-500/50 text-amber-200'
            }`}
          >
            <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-black/30">
              {result.isCompatible ? (
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-7 h-7 text-amber-400" />
              )}
            </div>
            <div className="font-serif text-xl font-bold tracking-wide">
              {result.statusText}
            </div>
            <p className="text-xs opacity-90 max-w-md mx-auto">
              {result.isCompatible
                ? 'Tuyệt vời! Cách phối đồ của bạn tuân thủ hoàn hảo quy cách trang phục truyền thống, tôn vinh trọn vẹn nét tôn nghiêm của di sản.'
                : 'Hệ thống phát hiện một số chi tiết phối phụ kiện có nguy cơ làm giảm tính trang trọng hoặc sai lệch quy chuẩn lịch sử.'}
            </p>
          </div>

          {/* 2. Danh sách chi tiết kiểm tra & Gợi ý chuẩn hóa */}
          {result.issues.length > 0 ? (
            <div className="space-y-4">
              <div className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                Chi tiết các điểm cần lưu ý:
              </div>

              {result.issues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-4 rounded-xl bg-[#191d2b] border border-amber-500/30 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span>{issue.title}</span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed font-light">
                        {issue.message}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-800 shrink-0">
                      Cảnh báo
                    </span>
                  </div>

                  {/* AI Suggestion Box */}
                  <div className="p-3 rounded-lg bg-black/40 border border-amber-500/20 text-xs space-y-1.5">
                    <div className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>Đề xuất chuẩn hóa bởi AI:</span>
                    </div>
                    <p className="text-stone-300 text-xs font-light">
                      {issue.suggestion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#191d2b] border border-stone-800 space-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-2 font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Mọi tiêu chí đều đạt chuẩn:</span>
              </div>
              <ul className="space-y-1 pl-6 list-disc text-stone-400">
                <li>Phom dáng lễ phục đoan trang, đúng quy chế</li>
                <li>Phụ kiện đội đầu và hài guốc tương hợp thời kỳ lịch sử</li>
                <li>Không vi phạm thuần phong mỹ tục hoặc kết hợp dị biệt</li>
              </ul>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="p-5 border-t border-stone-800 bg-[#171b28] flex flex-col sm:flex-row items-center justify-between gap-3">
          {result.issues.length > 0 ? (
            <>
              <button
                onClick={handleFixAll}
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs tracking-wide shadow-lg shadow-amber-950/40 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Wand2 className="w-4 h-4 text-stone-950" />
                <span>TỰ ĐỘNG SỬA NHANH BỞI AI</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onProceedToTryOn();
                }}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-semibold text-xs transition cursor-pointer"
              >
                Bỏ qua cảnh báo & Thử đồ
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onClose}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition cursor-pointer"
              >
                Đóng & Tiếp tục tùy chỉnh
              </button>

              <button
                onClick={() => {
                  onClose();
                  onProceedToTryOn();
                }}
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-emerald-950/40 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>TIẾN HÀNH THỬ ĐỒ BẰNG AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
