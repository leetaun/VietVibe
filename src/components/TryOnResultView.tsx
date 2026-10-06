import React, { useState, useRef } from 'react';
import { Garment, OutfitPiece, TryOnResult } from '../types';
import {
  Download,
  Bookmark,
  RefreshCw,
  Sliders,
  Check,
  Facebook,
  Instagram,
  Copy
} from 'lucide-react';

interface TryOnResultViewProps {
  garment: Garment;
  outfit: OutfitPiece;
  originalUserImage: string;
  customAccessoryImage?: string;
  customAccessoryName?: string;
  isLoggedIn: boolean;
  onSaveToLookbook: (result: TryOnResult) => void;
  onRetry: () => void;
  onOpenLogin: () => void;
}

export const TryOnResultView: React.FC<TryOnResultViewProps> = ({
  garment,
  outfit,
  originalUserImage,
  customAccessoryImage,
  customAccessoryName,
  isLoggedIn,
  onSaveToLookbook,
  onRetry,
  onOpenLogin
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 - 100%
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Result synthesized photo
  const resultPhoto = garment.imageUrl;

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleSliderMove(e.clientX);
    }
  };

  const handleSave = () => {
    if (!isLoggedIn) {
      onOpenLogin();
      return;
    }

    const accessoriesList = [
      outfit.accessories.head?.name,
      outfit.accessories.hand?.name,
      outfit.accessories.neck?.name,
      outfit.accessories.foot?.name,
      customAccessoryName
    ].filter(Boolean).join(' + ');

    const newResult: TryOnResult = {
      id: `tryon-${Date.now()}`,
      originalPhotoUrl: originalUserImage,
      resultPhotoUrl: resultPhoto,
      garmentName: garment.name,
      dynasty: garment.dynastyLabel,
      colorsSummary: `Màu áo chính: ${outfit.primaryColor}`,
      accessoriesSummary: accessoriesList || 'Bộ phụ kiện cơ bản',
      createdAt: 'Vừa xong'
    };

    onSaveToLookbook(newResult);
    setIsSaved(true);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resultPhoto;
    link.download = `viet-phuc-${garment.id}-tryon-hd.jpg`;
    link.target = '_blank';
    link.click();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-7 pb-20 animate-fade-in">
      {/* Top Header Matching PDF STT 9 */}
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 uppercase tracking-wide">
          KẾT QUẢ MẶC THỬ ẢO
        </h1>
        <p className="text-stone-400 text-sm max-w-xl mx-auto">
          Hình ảnh của bạn sau khi phối {garment.name} & phụ kiện
        </p>
      </div>

      {/* Main Container: Split with Comparison Slider (Left/Center) and Info Card (Right) */}
      <div className="bg-[#141722] rounded-2xl border border-stone-800 p-6 sm:p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT/CENTER (7 cols): INTERACTIVE BEFORE / AFTER SLIDER */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full h-[460px] sm:h-[500px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-stone-700 shadow-2xl bg-black"
            >
              {/* AFTER (AI Generated Output - Background Layer) */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={resultPhoto}
                  alt="Sau khi mặc Việt phục"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 mix-blend-color opacity-30 pointer-events-none"
                  style={{ backgroundColor: outfit.primaryColor }}
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-amber-300 border border-amber-500/40">
                  AFTER
                </div>
              </div>

              {/* BEFORE (Original User Photo - Clipped Layer) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-amber-400 z-10"
                style={{ width: `${sliderPosition}%` }}
              >
                <div
                  className="relative h-full"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'
                  }}
                >
                  <img
                    src={originalUserImage}
                    alt="Ảnh gốc người dùng"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-stone-200 border border-stone-700">
                    BEFORE
                  </div>
                </div>
              </div>

              {/* Center Slider Pill & Handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-amber-500 text-stone-950 shadow-2xl border-2 border-white flex items-center justify-center cursor-ew-resize transition-transform hover:scale-110"
                style={{ left: `${sliderPosition}%` }}
              >
                <Sliders className="w-5 h-5 rotate-90" />
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-stone-300 border border-stone-700 pointer-events-none">
                ↔ Kéo để so sánh Before / After
              </div>
            </div>
          </div>

          {/* RIGHT (5 cols): Details & Action Stack (Matching PDF STT 9) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Đơn hàng / Chi tiết bộ đồ */}
            <div className="p-5 rounded-xl bg-[#0e1017] border border-stone-700/80 space-y-2 text-xs">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Đơn hàng / Chi tiết bộ đồ:
              </span>
              <div className="font-serif text-lg font-bold text-stone-100">
                {garment.name} {garment.dynastyLabel}
              </div>
              <p className="text-stone-300 text-xs">
                {outfit.accessories.head?.name ? `+ ${outfit.accessories.head.name}` : ''}{' '}
                {outfit.accessories.hand?.name ? `+ ${outfit.accessories.hand.name}` : ''}{' '}
                {customAccessoryName ? `+ ${customAccessoryName}` : ''}
              </p>
            </div>

            {/* Action Buttons Stack (Matching PDF STT 9 mockup) */}
            <div className="space-y-3">
              {/* 1. TẢI ẢNH VỀ MÁY (HD) */}
              <button
                onClick={handleDownload}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs tracking-wide shadow-lg shadow-amber-950/40 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-stone-950" />
                <span>TẢI ẢNH VỀ MÁY (HD)</span>
              </button>

              {/* 2. LƯU VÀO LOOKBOOK */}
              <button
                onClick={handleSave}
                disabled={isSaved}
                className={`w-full py-3 px-5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-stone-900 hover:bg-stone-800 border-stone-700 text-stone-200'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>ĐÃ LƯU VÀO LOOKBOOK</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-amber-400" />
                    <span>LƯU VÀO LOOKBOOK</span>
                  </>
                )}
              </button>

              {/* 3. CHIA SẺ LÊN MXH */}
              <div className="pt-2 flex items-center justify-between text-xs text-stone-300 px-1">
                <span>CHIA SẺ LÊN MXH:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.open('https://facebook.com', '_blank')}
                    title="Facebook"
                    className="p-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-300 hover:text-white transition"
                  >
                    <Facebook className="w-4 h-4 text-[#1877F2]" />
                  </button>
                  <button
                    onClick={() => window.open('https://instagram.com', '_blank')}
                    title="Instagram"
                    className="p-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-300 hover:text-white transition"
                  >
                    <Instagram className="w-4 h-4 text-pink-400" />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    title="Sao chép link"
                    className="p-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-300 hover:text-white transition"
                  >
                    <Copy className="w-4 h-4 text-amber-400" />
                  </button>
                </div>
              </div>

              {copyFeedback && (
                <div className="text-[11px] text-emerald-400 text-center">
                  Đã sao chép liên kết vào bộ nhớ tạm!
                </div>
              )}

              {/* 4. THỬ LẠI / ĐỔI ĐỒ KHÁC */}
              <button
                onClick={onRetry}
                className="w-full py-3 px-5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>THỬ LẠI / ĐỔI ĐỒ KHÁC</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
