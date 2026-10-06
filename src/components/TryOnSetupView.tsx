import React, { useState, useRef } from 'react';
import { Garment, OutfitPiece, Accessory, TryOnPresetFace } from '../types';
import { PRESET_FACES } from '../data/presets';
import { ACCESSORIES } from '../data/accessories';
import {
  Upload,
  Camera,
  Sparkles,
  Info,
  CheckCircle2,
  Image as ImageIcon,
  Plus,
  Wand2,
  AlertCircle
} from 'lucide-react';

interface TryOnSetupViewProps {
  garment: Garment;
  outfit: OutfitPiece;
  onStartTryOnProcess: (userImage: string, customAccImage?: string, customAccName?: string) => void;
  onBackToBuilder: () => void;
}

export const TryOnSetupView: React.FC<TryOnSetupViewProps> = ({
  garment,
  outfit,
  onStartTryOnProcess,
  onBackToBuilder
}) => {
  const [selectedUserImage, setSelectedUserImage] = useState<string>(PRESET_FACES[0].bodyUrl);
  const [selectedFaceId, setSelectedFaceId] = useState<string>(PRESET_FACES[0].id);
  const [isCustomUpload, setIsCustomUpload] = useState<boolean>(false);
  const [customAccessoryImage, setCustomAccessoryImage] = useState<string | undefined>(undefined);
  const [customAccessoryName, setCustomAccessoryName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processStep, setProcessStep] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const accessoryFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedUserImage(event.target.result as string);
          setIsCustomUpload(true);
          setSelectedFaceId('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAccessoryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomAccessoryImage(event.target.result as string);
          if (!customAccessoryName) {
            setCustomAccessoryName('Phụ kiện riêng tải lên');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLaunchTryOn = () => {
    setIsProcessing(true);
    setProcessStep('Khởi tạo mô hình AI Segment & Mesh 3D...');

    setTimeout(() => {
      setProcessStep('Bóc tách dáng người & ánh sáng phông nền...');
    }, 1000);

    setTimeout(() => {
      setProcessStep(`Ướm ghép nếp vải lụa ${garment.name} & dệt họa tiết...`);
    }, 2000);

    setTimeout(() => {
      setProcessStep('Cân chỉnh đổ bóng phụ kiện & kết xuất ảnh độ nét cao (HD)...');
    }, 3000);

    setTimeout(() => {
      setIsProcessing(false);
      onStartTryOnProcess(selectedUserImage, customAccessoryImage, customAccessoryName);
    }, 3800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md">
          <div className="bg-[#151824] p-8 rounded-2xl border border-emerald-500/40 max-w-md w-full text-center space-y-6 shadow-2xl animate-fade-in">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping" />
              <div className="w-full h-full rounded-full border-4 border-t-emerald-400 border-r-teal-500 border-b-transparent border-l-transparent animate-spin flex items-center justify-center">
                <Camera className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-stone-100">
                AI Try-On Đang Xử Lý
              </h3>
              <p className="text-emerald-300 text-xs font-mono">{processStep}</p>
              <p className="text-stone-400 text-xs">
                Ước tính thời gian: ~3 giây · Tự động ghép chính xác vóc dáng
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Screen Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Camera className="w-3.5 h-3.5" />
          <span>Thử Đồ Ảo Thông Minh</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
          THỬ ĐỒ ẢO AI (AI TRY-ON)
        </h1>
        <p className="text-stone-400 text-sm max-w-xl mx-auto">
          Tải ảnh của bạn để AI mặc thử bộ Việt phục trực quan và chân thực nhất
        </p>
      </div>

      {/* Main Grid: Upload photo vs Accessory & Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT (7 cols): Photo Upload & Preset Faces */}
        <div className="lg:col-span-7 bg-[#141722] p-6 sm:p-7 rounded-2xl border border-stone-800 space-y-6">
          <div>
            <h2 className="font-serif text-lg font-bold text-amber-100 flex items-center gap-2">
              <Upload className="w-4 h-4 text-amber-400" />
              <span>1. Tải ảnh bản thân (Hoặc chọn người mẫu mẫu)</span>
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Khuyên dùng ảnh chụp đứng thẳng, thấy rõ vai hoặc toàn thân để AI định vị nếp áo tốt nhất.
            </p>
          </div>

          {/* Current Photo Preview or Dropzone */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-stone-700 bg-stone-950 p-4 text-center hover:border-amber-500/50 transition">
            {selectedUserImage ? (
              <div className="relative group max-h-[360px] flex items-center justify-center overflow-hidden rounded-xl bg-black/40">
                <img
                  src={selectedUserImage}
                  alt="Ảnh người dùng"
                  className="max-h-[340px] w-auto object-contain rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition"
                  >
                    Đổi ảnh từ máy
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 space-y-3">
                <Upload className="w-10 h-10 text-stone-500 mx-auto" />
                <div>
                  <p className="text-sm font-semibold text-stone-200">
                    Kéo thả hoặc click để tải ảnh chân dung / toàn thân
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    Hỗ trợ định dạng JPG, PNG, WEBP (tối đa 15MB)
                  </p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Upload Button */}
          <div className="flex justify-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="py-2.5 px-5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold border border-stone-700 transition flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4 text-amber-400" />
              <span>CHỌN ẢNH TỪ MÁY TÍNH / ĐIỆN THOẠI</span>
            </button>
          </div>

          {/* Preset Model Faces */}
          <div className="pt-5 border-t border-stone-800 space-y-3">
            <div className="text-xs font-semibold text-stone-300">
              Hoặc chọn ảnh người mẫu có sẵn nếu không muốn tải ảnh cá nhân:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PRESET_FACES.map((face) => (
                <button
                  key={face.id}
                  onClick={() => {
                    setSelectedUserImage(face.bodyUrl);
                    setSelectedFaceId(face.id);
                    setIsCustomUpload(false);
                  }}
                  className={`group relative rounded-xl overflow-hidden border p-2 text-left transition cursor-pointer ${
                    selectedFaceId === face.id
                      ? 'bg-amber-950/30 border-amber-400 ring-2 ring-amber-500/30'
                      : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-black/40 mb-2">
                    <img
                      src={face.avatarUrl}
                      alt={face.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <span className="absolute bottom-1 right-1 text-[9px] px-1.5 py-0.2 rounded bg-black/70 text-stone-300">
                      {face.gender}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-stone-200 truncate">
                    {face.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT (5 cols): Accessories & Launch Try-On */}
        <div className="lg:col-span-5 bg-[#141722] p-6 sm:p-7 rounded-2xl border border-stone-800 space-y-6">
          {/* Selected Outfit Summary */}
          <div>
            <h2 className="font-serif text-lg font-bold text-amber-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>2. Bộ Việt phục chuẩn bị ướm thử</span>
            </h2>
            <div className="mt-3 p-4 rounded-xl bg-stone-900/90 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={garment.imageUrl}
                  alt={garment.name}
                  className="w-14 h-14 rounded-lg object-cover border border-amber-500/30"
                />
                <div>
                  <h3 className="font-serif text-base font-bold text-amber-200">
                    {garment.name}
                  </h3>
                  <p className="text-xs text-stone-400">{garment.dynastyLabel}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-stone-300">
                    <span>Màu áo:</span>
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 inline-block"
                      style={{ backgroundColor: outfit.primaryColor }}
                    />
                  </div>
                </div>
              </div>

              {/* Equipped accessories summary */}
              <div className="text-xs text-stone-300 pt-2 border-t border-stone-800/80 space-y-1">
                <div className="text-[11px] text-stone-400 font-semibold uppercase">
                  Phụ kiện đi kèm:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {outfit.accessories.head && (
                    <span className="px-2 py-0.5 rounded bg-black/40 text-[10px] text-amber-300 border border-amber-500/20">
                      👑 {outfit.accessories.head.name}
                    </span>
                  )}
                  {outfit.accessories.hand && (
                    <span className="px-2 py-0.5 rounded bg-black/40 text-[10px] text-amber-300 border border-amber-500/20">
                      🪭 {outfit.accessories.hand.name}
                    </span>
                  )}
                  {outfit.accessories.neck && (
                    <span className="px-2 py-0.5 rounded bg-black/40 text-[10px] text-amber-300 border border-amber-500/20">
                      📿 {outfit.accessories.neck.name}
                    </span>
                  )}
                  {outfit.accessories.foot && (
                    <span className="px-2 py-0.5 rounded bg-black/40 text-[10px] text-stone-300 border border-stone-700">
                      👞 {outfit.accessories.foot.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Upload Custom Accessory Box (Tính năng số 5 trong PDF: Tải phụ kiện riêng) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-200">
                3. Tải lên phụ kiện riêng của bạn (Tùy chọn):
              </span>
              <span className="text-[10px] text-amber-400">Cá nhân hóa</span>
            </div>
            <p className="text-[11px] text-stone-400">
              Bạn có thể tải ảnh chụp phụ kiện cá nhân (kính, quạt, vòng cổ, túi xách) để AI ghép trực tiếp cùng Việt phục.
            </p>

            <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-3">
              {customAccessoryImage ? (
                <div className="flex items-center gap-3">
                  <img
                    src={customAccessoryImage}
                    alt="Phụ kiện riêng"
                    className="w-12 h-12 rounded-lg object-cover border border-amber-400"
                  />
                  <div>
                    <input
                      type="text"
                      value={customAccessoryName}
                      onChange={(e) => setCustomAccessoryName(e.target.value)}
                      placeholder="Tên phụ kiện..."
                      className="text-xs bg-black/40 px-2 py-1 rounded text-stone-200 border border-stone-700"
                    />
                    <div className="text-[10px] text-emerald-400 mt-1">Đã sẵn sàng ghép vào ảnh</div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-stone-400">Chưa tải phụ kiện riêng</div>
              )}

              <button
                type="button"
                onClick={() => accessoryFileInputRef.current?.click()}
                className="py-2 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{customAccessoryImage ? 'Đổi ảnh' : 'Tải ảnh phụ kiện'}</span>
              </button>

              <input
                ref={accessoryFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAccessoryUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Photo guide tips */}
          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2 text-xs text-stone-400">
            <div className="flex items-center gap-1.5 text-stone-300 font-semibold">
              <Info className="w-4 h-4 text-amber-400" />
              <span>Mẹo chụp ảnh đẹp:</span>
            </div>
            <ul className="space-y-1 list-disc pl-5 text-[11px]">
              <li>Nên chụp phòng đủ sáng, không che khuất khuôn mặt và cổ</li>
              <li>Tư thế đứng thẳng tự nhiên giúp phom áo ngũ thân ôm đúng dáng</li>
            </ul>
          </div>

          {/* Trigger AI Try-On Button */}
          <div className="pt-2">
            <button
              onClick={handleLaunchTryOn}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-emerald-950/50 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Camera className="w-5 h-5" />
              <span>TIẾN HÀNH THỬ ĐỒ BẰNG AI</span>
            </button>
            <div className="text-center text-[11px] text-stone-500 mt-2">
              Thời gian xử lý: ~3 - 5 giây · Độ nét cao HD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
