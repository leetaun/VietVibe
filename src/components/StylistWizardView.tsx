import React, { useState } from 'react';
import { Garment, Occasion, StyleCategory, OutfitPiece } from '../types';
import { OCCASIONS, STYLES, COLOR_PALETTES } from '../data/presets';
import { ACCESSORIES } from '../data/accessories';
import { Sparkles, Wand2, Check, ArrowRight } from 'lucide-react';

interface StylistWizardViewProps {
  garments: Garment[];
  initialGarment?: Garment | null;
  onFinishWizard: (outfit: OutfitPiece, garment: Garment, occasion: Occasion, style: StyleCategory) => void;
}

export const StylistWizardView: React.FC<StylistWizardViewProps> = ({
  garments,
  initialGarment,
  onFinishWizard
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>('Tết cổ truyền');
  const [selectedStyle, setSelectedStyle] = useState<StyleCategory>('Truyền thống chuẩn mực');
  const [selectedPaletteId, setSelectedPaletteId] = useState<string>('do-cung-dinh');
  const [selectedGarmentId, setSelectedGarmentId] = useState<string>(
    initialGarment ? initialGarment.id : 'nhat-binh'
  );
  const [customNote, setCustomNote] = useState<string>('Em muốn phối thêm mấn và quạt cầm tay giấy điệp');
  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);
  const [processingStage, setProcessingStage] = useState<string>('');

  const selectedPalette = COLOR_PALETTES.find(p => p.id === selectedPaletteId) || COLOR_PALETTES[0];
  const activeGarment = garments.find(g => g.id === selectedGarmentId) || garments[0];

  const handleGenerate = () => {
    setIsAiProcessing(true);
    setProcessingStage('Đang giải mã điển tích & hoa văn triều đại...');

    setTimeout(() => {
      setProcessingStage('Đang phối hợp ngũ sắc và tính toán tương sinh ngũ hành...');
    }, 700);

    setTimeout(() => {
      setProcessingStage('Đang kiểm tra quy tắc bảo tồn Cultural Guardrail...');
    }, 1400);

    setTimeout(() => {
      setIsAiProcessing(false);
      // Construct outfit
      const headAcc = ACCESSORIES.find(a => a.category === 'head') || ACCESSORIES[0];
      const handAcc = ACCESSORIES.find(a => a.id === 'quat-giay-diep') || ACCESSORIES[4];
      const neckAcc = ACCESSORIES.find(a => a.id === 'khanh-vang');
      const footAcc = ACCESSORIES.find(a => a.id === 'hai-theu') || ACCESSORIES[11];

      const initialOutfit: OutfitPiece = {
        garmentId: activeGarment.id,
        primaryColor: selectedPalette.colors.primary,
        innerRobeColor: '#ffffff',
        pantsColor: activeGarment.defaultColors.pants || '#ffffff',
        collarColor: selectedPalette.colors.accent,
        accessories: {
          head: headAcc,
          hand: handAcc,
          neck: neckAcc,
          foot: footAcc
        }
      };

      onFinishWizard(initialOutfit, activeGarment, selectedOccasion, selectedStyle);
    }, 2200);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8 animate-fade-in">
      {/* AI Processing Animation Overlay */}
      {isAiProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md">
          <div className="bg-[#151824] p-8 rounded-2xl border border-amber-500/40 max-w-md w-full text-center space-y-6 shadow-2xl animate-fade-in">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 animate-ping" />
              <div className="w-full h-full rounded-full border-4 border-t-amber-400 border-r-amber-500 border-b-transparent border-l-transparent animate-spin flex items-center justify-center">
                <Wand2 className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-amber-100">
                AI Stylist Đang Sáng Tạo
              </h3>
              <p className="text-amber-300 text-xs font-mono">{processingStage}</p>
              <p className="text-stone-400 text-xs">
                Đang đề xuất bản phối hoàn hảo theo quy chuẩn di sản...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Screen Title & Subtitle Matching PDF STT 5 */}
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 uppercase tracking-wide">
          AI VIỆT PHỤC STYLIST
        </h1>
        <p className="text-stone-400 text-sm max-w-xl mx-auto">
          Thiết lập bối cảnh và sở thích để AI đề xuất outfit phù hợp nhất cho bạn
        </p>
      </div>

      {/* Main Setup Card Container (Structured like PDF STT 5) */}
      <div className="bg-[#141722] rounded-2xl border border-stone-800 p-6 sm:p-8 shadow-2xl space-y-7">
        {/* Bước 1: Chọn sự kiện / Bối cảnh */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <span>* Bước 1: Chọn sự kiện / Bối cảnh</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { id: 'Tết cổ truyền', label: 'Tết cổ truyền' },
              { id: 'Kỷ yếu học sinh', label: 'Kỷ yếu học sinh' },
              { id: 'Lễ cưới hỏi', label: 'Lễ cưới hỏi' },
              { id: 'Lễ hội / Đi chùa', label: 'Lễ hội / Đi chùa' },
              { id: 'Dạo phố nghệ thuật', label: 'Dạo phố nghệ thuật' }
            ].map((occ) => (
              <button
                key={occ.id}
                type="button"
                onClick={() => setSelectedOccasion(occ.id as Occasion)}
                className={`p-3.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  selectedOccasion === occ.id
                    ? 'bg-amber-950/30 border-amber-400 ring-2 ring-amber-500/30 text-amber-200 shadow-md'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700 hover:text-white'
                }`}
              >
                <span className="text-xs font-bold">{occ.label}</span>
                {selectedOccasion === occ.id && (
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bước 2: Chọn phong cách của bạn */}
        <div className="space-y-3 pt-5 border-t border-stone-800/80">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <span>* Bước 2: Chọn phong cách của bạn</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'Truyền thống chuẩn mực', label: 'Truyền thống' },
              { id: 'Hiện đại / Cách tân', label: 'Hiện đại / Cách tân' },
              { id: 'Thanh lịch nhã nhặn', label: 'Thanh lịch' },
              { id: 'Gen Z Remix', label: 'Gen Z / Độc đáo' }
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStyle(st.id as StyleCategory)}
                className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                  selectedStyle === st.id
                    ? 'bg-amber-950/30 border-amber-400 ring-2 ring-amber-500/30 text-amber-200 shadow-md font-bold'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700 hover:text-white'
                }`}
              >
                <span className="text-xs">{st.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bước 3: Chọn tông màu ưa thích */}
        <div className="space-y-3 pt-5 border-t border-stone-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              * Bước 3: Chọn tông màu ưa thích
            </span>
            <span className="text-[11px] text-stone-400">Color palette để người dùng click nhanh</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {COLOR_PALETTES.slice(0, 5).map((pal) => (
              <button
                key={pal.id}
                type="button"
                onClick={() => setSelectedPaletteId(pal.id)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
                  selectedPaletteId === pal.id
                    ? 'bg-amber-950/30 border-amber-400 ring-2 ring-amber-500/30 text-amber-200 shadow-md'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <div className="text-[11px] font-bold truncate">{pal.name}</div>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: pal.colors.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: pal.colors.secondary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: pal.colors.accent }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chọn trang phục ưu tiên */}
        <div className="space-y-3 pt-5 border-t border-stone-800/80">
          <div className="text-xs font-bold text-stone-300">
            Dáng trang phục muốn phối (Hoặc để AI tự đề xuất):
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {garments.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setSelectedGarmentId(g.id)}
                className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center truncate transition ${
                  selectedGarmentId === g.id
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bước 4 (Tùy chọn): Thêm ghi chú hoặc yêu cầu đặc biệt */}
        <div className="space-y-2.5 pt-5 border-t border-stone-800/80">
          <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider">
            * Bước 4 (Tùy chọn): Thêm ghi chú hoặc yêu cầu đặc biệt
          </label>
          <input
            type="text"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="Ví dụ: Em muốn phối thêm mấn và quạt cầm tay..."
            className="w-full px-4 py-3 bg-[#0e1017] border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        {/* Action Button at Bottom Right (Matching PDF STT 5) */}
        <div className="pt-4 border-t border-stone-800 flex justify-end">
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 text-sm font-bold tracking-wide shadow-xl shadow-amber-950/50 transition cursor-pointer"
          >
            <span>AI TẠO GỢI Ý PHỐI ĐỒ</span>
            <Sparkles className="w-4 h-4 text-stone-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
