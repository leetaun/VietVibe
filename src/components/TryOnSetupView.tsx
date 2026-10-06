import React, { useState, useRef } from 'react';
import { Garment, OutfitPiece, TryOnPresetFace } from '../types';
import { PRESET_FACES } from '../data/presets';
import {
  Upload,
  Camera,
  Info,
  Check,
  Sparkles,
  ArrowRight,
  Plus
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
  const [customAccessoryImage, setCustomAccessoryImage] = useState<string | undefined>(undefined);
  const [customAccessoryName, setCustomAccessoryName] = useState<string>('Quạt / Phụ kiện cá nhân');
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
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLaunchTryOn = () => {
    setIsProcessing(true);
    setProcessStep('Bóc tách khuôn mặt & dáng người...');

    setTimeout(() => {
      setProcessStep(`Ướm nếp vải ${garment.name} & hoa văn...`);
    }, 900);

    setTimeout(() => {
      setProcessStep('Hoàn thiện ánh sáng Before/After...');
    }, 1800);

    setTimeout(() => {
      setIsProcessing(false);
      onStartTryOnProcess(selectedUserImage, customAccessoryImage, customAccessoryName);
    }, 2400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-20 animate-fade-in">
      {/* Loading Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md">
          <div className="bg-[#151824] p-8 rounded-2xl border border-amber-500/40 max-w-md w-full text-center space-y-6 shadow-2xl animate-fade-in">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 animate-ping" />
              <div className="w-full h-full rounded-full border-4 border-t-amber-400 border-r-amber-500 border-b-transparent border-l-transparent animate-spin flex items-center justify-center">
                <Camera className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-stone-100">
                AI Try-On Đang Xử Lý
              </h3>
              <p className="text-amber-300 text-xs font-mono">{processStep}</p>
              <p className="text-stone-400 text-xs">
                Ước lượng thời gian: ~2-3 giây · Độ nét cao HD
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Screen Title (Matching PDF STT 8) */}
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 uppercase tracking-wide">
          THỬ ĐỒ ẢO AI (AI TRY-ON)
        </h1>
        <p className="text-stone-400 text-sm max-w-xl mx-auto">
          Tải ảnh của bạn để AI mặc thử Việt phục trực quan nhất
        </p>
      </div>

      {/* Main 2-Section Card (Matching PDF STT 8 layout) */}
      <div className="bg-[#141722] rounded-2xl border border-stone-800 p-6 sm:p-8 shadow-2xl space-y-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* LEFT: Upload ảnh bản thân */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Upload ảnh bản thân
            </h2>

            {/* Drag & drop upload box */}
            <div className="relative rounded-2xl border-2 border-dashed border-stone-700 bg-[#0e1017] p-5 text-center hover:border-amber-500/50 transition">
              {selectedUserImage ? (
                <div className="relative group max-h-[260px] flex items-center justify-center overflow-hidden rounded-xl bg-black">
                  <img
                    src={selectedUserImage}
                    alt="Người dùng"
                    className="max-h-[250px] w-auto object-contain rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-lg bg-amber-600 text-stone-950 font-bold text-xs"
                    >
                      Đổi ảnh từ máy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-10 space-y-2">
                  <Upload className="w-8 h-8 text-stone-500 mx-auto" />
                  <p className="text-xs font-semibold text-stone-200">
                    Kéo thả hoặc Click để tải ảnh toàn thân / chân dung của bạn
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="py-2 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition cursor-pointer"
                >
                  CHỌN ẢNH TỪ MÁY
                </button>
              </div>
            </div>

            {/* Mẹo chụp note box */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-stone-800 text-[11px] text-stone-400 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Mẹo chụp: Nên chụp chính diện, đủ sáng, không bị che khuất cơ thể.</span>
            </div>

            {/* Presets Row (Matching PDF mockup bottom left) */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] text-stone-400 block font-medium">
                Hoặc chọn ảnh mẫu có sẵn nếu không muốn tải ảnh cá nhân:
              </span>
              <div className="flex items-center gap-3">
                {PRESET_FACES.map((face) => (
                  <button
                    key={face.id}
                    onClick={() => {
                      setSelectedUserImage(face.bodyUrl);
                      setSelectedFaceId(face.id);
                    }}
                    className={`relative w-14 h-14 rounded-full overflow-hidden border-2 transition cursor-pointer shrink-0 ${
                      selectedFaceId === face.id
                        ? 'border-amber-400 ring-2 ring-amber-500/40'
                        : 'border-stone-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={face.avatarUrl} alt={face.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Tải lên phụ kiện cá nhân (Tùy chọn) */}
          <div className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Tải lên phụ kiện cá nhân (Tùy chọn)
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Bạn muốn phối thêm phụ kiện riêng? Tải lên ảnh phụ kiện cá nhân (như kính, quạt, trang sức riêng) để AI ghép vào ảnh kết quả.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0e1017] border border-stone-700/80 flex items-center justify-between gap-3">
              {customAccessoryImage ? (
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={customAccessoryImage}
                    alt="Phụ kiện riêng"
                    className="w-12 h-12 rounded-lg object-cover border border-amber-400"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-stone-200 block truncate">
                      {customAccessoryName}
                    </span>
                    <span className="text-[10px] text-emerald-400">Đã sẵn sàng ghép vào ảnh</span>
                  </div>
                </div>
              ) : (
                <span className="text-xs text-stone-500">Chưa tải ảnh phụ kiện riêng</span>
              )}

              <button
                type="button"
                onClick={() => accessoryFileInputRef.current?.click()}
                className="py-2 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition cursor-pointer shrink-0"
              >
                CHỌN PHỤ KIỆN RIÊNG
              </button>

              <input
                ref={accessoryFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAccessoryUpload}
                className="hidden"
              />
            </div>

            {/* Selected Outfit Summary */}
            <div className="p-4 rounded-xl bg-black/40 border border-stone-800 space-y-2 text-xs">
              <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                Bộ Việt phục đã chọn:
              </div>
              <div className="font-serif text-base font-bold text-stone-100">
                {garment.name} ({garment.dynastyLabel})
              </div>
              <div className="text-stone-400 text-[11px]">
                {outfit.accessories.head?.name ? `+ ${outfit.accessories.head.name}` : ''}{' '}
                {outfit.accessories.hand?.name ? `+ ${outfit.accessories.hand.name}` : ''}{' '}
                {outfit.accessories.foot?.name ? `+ ${outfit.accessories.foot.name}` : ''}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTON: "TIẾN HÀNH THỬ ĐỒ BẰNG AI ⚡" */}
        <div className="pt-4 border-t border-stone-800 flex justify-center">
          <button
            onClick={handleLaunchTryOn}
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-950/50 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>TIẾN HÀNH THỬ ĐỒ BẰNG AI</span>
            <Sparkles className="w-4 h-4 text-stone-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
