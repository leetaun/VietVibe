import React, { useState, useRef } from 'react';
import { Garment, OutfitPiece, TryOnResult } from '../types';
import {
  Download,
  Bookmark,
  RefreshCw,
  Share2,
  Sliders,
  Check,
  Sparkles,
  Shirt,
  Copy,
  Facebook,
  Instagram
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
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100%
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // High quality result synthesized photo representation
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
      // Mouse down
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
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Kết Quả Mặc Thử Ảo</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
          KẾT QUẢ MẶC THỬ ẢO
        </h1>
        <p className="text-stone-400 text-sm max-w-xl mx-auto">
          Hình ảnh của bạn sau khi phối {garment.name} & phụ kiện truyền thống
        </p>
      </div>

      {/* Main Before/After Comparison Card */}
      <div className="bg-[#141722] rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Comparison Viewer */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full max-w-2xl mx-auto h-[460px] sm:h-[520px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-amber-900/40 shadow-inner bg-black"
        >
          {/* AFTER IMAGE (Layer underneath - full width) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={resultPhoto}
              alt="Sau khi mặc Việt phục"
              className="w-full h-full object-cover"
            />
            {/* Color tint matching outfit */}
            <div
              className="absolute inset-0 mix-blend-color opacity-40 pointer-events-none"
              style={{ backgroundColor: outfit.primaryColor }}
            />
            {/* Watermark Tag */}
            <div className="absolute top-4 right-4 bg-amber-950/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
              <span>AFTER (ĐÃ GHÉP VIỆT PHỤC)</span>
            </div>
          </div>

          {/* BEFORE IMAGE (Clipped on top with slider position width) */}
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
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-stone-200 border border-stone-700">
                BEFORE (ẢNH GỐC)
              </div>
            </div>
          </div>

          {/* Slider Thumb Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-amber-500 text-stone-950 shadow-2xl border-2 border-white flex items-center justify-center cursor-ew-resize transition-transform hover:scale-110"
            style={{ left: `${sliderPosition}%` }}
          >
            <Sliders className="w-5 h-5 rotate-90" />
          </div>

          {/* Bottom helper text */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/75 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] text-stone-300 pointer-events-none border border-stone-700">
            ↔ Kéo thanh trượt qua lại để so sánh trực quan
          </div>
        </div>

        {/* Outfit Set Details Card */}
        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Chi tiết bộ đồ / Phối trang
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-100">
                {garment.name} ({garment.dynastyLabel})
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                {outfit.accessories.head?.name ? `+ ${outfit.accessories.head.name}` : ''}{' '}
                {outfit.accessories.hand?.name ? `+ ${outfit.accessories.hand.name}` : ''}{' '}
                {outfit.accessories.foot?.name ? `+ ${outfit.accessories.foot.name}` : ''}{' '}
                {customAccessoryName ? `+ [Phụ kiện riêng: ${customAccessoryName}]` : ''}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400">Tông màu:</span>
              <span
                className="w-5 h-5 rounded-full border border-white/20"
                style={{ backgroundColor: outfit.primaryColor }}
              />
            </div>
          </div>
        </div>

        {/* Action Button Bar (Cụm nút: Thử lại, Lưu vào Lookbook, Tải ảnh HD, Chia sẻ MXH) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* 1. Tải ảnh HD */}
          <button
            onClick={handleDownload}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-md shadow-amber-950/40 cursor-pointer"
          >
            <Download className="w-4 h-4 text-stone-950" />
            <span>TẢI ẢNH VỀ MÁY (HD)</span>
          </button>

          {/* 2. Lưu vào Lookbook */}
          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`py-3 px-4 rounded-xl border font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer ${
              isSaved
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : 'bg-stone-900 hover:bg-stone-800 border-stone-700 text-stone-200 hover:text-white'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>ĐÃ LƯU LOOKBOOK</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-amber-400" />
                <span>LƯU VÀO LOOKBOOK</span>
              </>
            )}
          </button>

          {/* 3. Thử lại / Đổi đồ khác */}
          <button
            onClick={onRetry}
            className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>THỬ LẠI / ĐỔI ĐỒ KHÁC</span>
          </button>

          {/* 4. Chia sẻ lên MXH */}
          <button
            onClick={() => setShowShareModal(true)}
            className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-amber-400" />
            <span>CHIA SẺ LÊN MXH</span>
          </button>
        </div>
      </div>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#141722] rounded-2xl border border-stone-700 p-6 max-w-sm w-full space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-100">
              Chia sẻ kết quả Việt Phục Remix
            </h3>
            <p className="text-xs text-stone-400">
              Khoe diện mạo cổ phục độc đáo của bạn đến bạn bè trên mạng xã hội:
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  window.open('https://facebook.com', '_blank');
                  setShowShareModal(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-[#1877F2] border border-[#1877F2]/40 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <Facebook className="w-4 h-4" />
                <span>Chia sẻ lên Facebook</span>
              </button>

              <button
                onClick={() => {
                  window.open('https://instagram.com', '_blank');
                  setShowShareModal(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-pink-900/20 hover:bg-pink-900/30 text-pink-400 border border-pink-700/40 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <Instagram className="w-4 h-4" />
                <span>Chia sẻ lên Instagram Story</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <Copy className="w-4 h-4 text-amber-400" />
                <span>{copyFeedback ? 'Đã sao chép liên kết!' : 'Sao chép liên kết'}</span>
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-2 text-stone-400 hover:text-white text-xs text-center pt-2"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
