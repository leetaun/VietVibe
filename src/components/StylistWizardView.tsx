import React, { useState } from 'react';
import { Garment, Occasion, StyleCategory, OutfitPiece } from '../types';
import { OCCASIONS, STYLES, COLOR_PALETTES } from '../data/presets';
import { ACCESSORIES } from '../data/accessories';
import { Sparkles, ArrowRight, ArrowLeft, Check, Wand2, Palette, ShieldCheck, Heart } from 'lucide-react';

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
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>('Tết cổ truyền');
  const [selectedStyle, setSelectedStyle] = useState<StyleCategory>('Truyền thống chuẩn mực');
  const [selectedPaletteId, setSelectedPaletteId] = useState<string>('do-cung-dinh');
  const [selectedGarmentId, setSelectedGarmentId] = useState<string>(
    initialGarment ? initialGarment.id : 'nhat-binh'
  );
  const [customNote, setCustomNote] = useState<string>('');
  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);
  const [processingStage, setProcessingStage] = useState<string>('');

  const selectedPalette = COLOR_PALETTES.find(p => p.id === selectedPaletteId) || COLOR_PALETTES[0];
  const activeGarment = garments.find(g => g.id === selectedGarmentId) || garments[0];

  const handleGenerate = () => {
    setIsAiProcessing(true);
    setProcessingStage('Đang giải mã điển tích & hoa văn triều đại...');

    setTimeout(() => {
      setProcessingStage('Đang phối hợp ngũ sắc và tính toán tương sinh ngũ hành...');
    }, 900);

    setTimeout(() => {
      setProcessingStage('Đang kiểm tra quy tắc bảo tồn Cultural Guardrail...');
    }, 1800);

    setTimeout(() => {
      setIsAiProcessing(false);
      // Construct outfit
      const headAcc = ACCESSORIES.find(a => a.category === 'head' && a.id.includes('man')) || ACCESSORIES[0];
      const handAcc = ACCESSORIES.find(a => a.id === 'quat-giay-diep') || ACCESSORIES[4];
      const neckAcc = ACCESSORIES.find(a => a.id === 'khanh-vang');
      const footAcc = ACCESSORIES.find(a => a.id === 'hai-theu') || ACCESSORIES[10];

      const initialOutfit: OutfitPiece = {
        garmentId: activeGarment.id,
        primaryColor: selectedPalette.colors.primary,
        innerRobeColor: '#ffffff',
        pantsColor: activeGarment.defaultColors.pants,
        collarColor: selectedPalette.colors.accent,
        accessories: {
          head: headAcc,
          hand: handAcc,
          neck: neckAcc,
          foot: footAcc
        }
      };

      onFinishWizard(initialOutfit, activeGarment, selectedOccasion, selectedStyle);
    }, 2600);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* AI Processing Overlay */}
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
                Đang đối chiếu dữ liệu lịch sử và phối màu cá nhân hóa cho bạn...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header of Wizard */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Trợ Lý Tạo Kiểu AI</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
          AI Việt Phục Stylist
        </h1>
        <p className="text-stone-400 text-sm max-w-xl mx-auto">
          Thiết lập bối cảnh, phong cách và sở thích để AI phân tích và đề xuất bộ trang phục chuẩn mực, thẩm mỹ nhất.
        </p>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep(step)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                  currentStep === step
                    ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-500/20'
                    : currentStep > step
                    ? 'bg-emerald-600 text-white'
                    : 'bg-stone-800 text-stone-400'
                }`}
              >
                {currentStep > step ? <Check className="w-4 h-4" /> : step}
              </button>
              {step < 4 && (
                <div
                  className={`w-8 sm:w-12 h-0.5 ${
                    currentStep > step ? 'bg-emerald-600' : 'bg-stone-800'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Wizard Steps Container */}
      <div className="bg-[#141722] rounded-2xl border border-stone-800 p-6 sm:p-8 shadow-xl space-y-8">
        {/* BƯỚC 1: Chọn bối cảnh/sự kiện */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Bước 1/4
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-100 mt-1">
                Chọn bối cảnh / sự kiện của bạn
              </h2>
              <p className="text-stone-400 text-xs mt-1">
                Mỗi dịp lễ nghi hay không gian đều có quy ước trang phục và màu sắc tương ứng.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {OCCASIONS.map((occ) => (
                <div
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`cursor-pointer p-5 rounded-xl border transition flex flex-col justify-between space-y-3 ${
                    selectedOccasion === occ.id
                      ? 'bg-amber-950/20 border-amber-400 ring-2 ring-amber-500/20'
                      : 'bg-[#181c2a] border-stone-800 hover:border-stone-700 hover:bg-[#1c2132]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base font-bold text-amber-100">
                      {occ.title}
                    </span>
                    {selectedOccasion === occ.id && (
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {occ.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Garment Choice for this Step */}
            <div className="pt-4 border-t border-stone-800">
              <label className="block text-xs font-semibold text-stone-300 mb-2">
                Trang phục chủ đạo mong muốn (Hoặc để AI tự chọn):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {garments.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedGarmentId(g.id)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border text-left truncate transition ${
                      selectedGarmentId === g.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BƯỚC 2: Chọn phong cách */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Bước 2/4
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-100 mt-1">
                Chọn phong cách bạn hướng tới
              </h2>
              <p className="text-stone-400 text-xs mt-1">
                Bạn muốn diện theo chuẩn mực truyền thống nguyên bản hay trải nghiệm phong cách Remix đương đại?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STYLES.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setSelectedStyle(st.id)}
                  className={`cursor-pointer p-5 rounded-xl border transition flex flex-col justify-between space-y-3 ${
                    selectedStyle === st.id
                      ? 'bg-amber-950/20 border-amber-400 ring-2 ring-amber-500/20'
                      : 'bg-[#181c2a] border-stone-800 hover:border-stone-700 hover:bg-[#1c2132]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-amber-100">
                        {st.title}
                      </h3>
                      <span className="text-[11px] text-amber-400/90 font-mono">
                        {st.vibe}
                      </span>
                    </div>
                    {selectedStyle === st.id && (
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {st.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BƯỚC 3: Chọn bảng màu mong muốn */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Bước 3/4
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-100 mt-1">
                Chọn tông màu chủ đạo mong muốn
              </h2>
              <p className="text-stone-400 text-xs mt-1">
                Bảng màu cung đình và dân gian lấy cảm hứng từ ngũ hành và chất liệu dệt tự nhiên.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COLOR_PALETTES.map((pal) => (
                <div
                  key={pal.id}
                  onClick={() => setSelectedPaletteId(pal.id)}
                  className={`cursor-pointer p-4 rounded-xl border transition flex flex-col justify-between space-y-3 ${
                    selectedPaletteId === pal.id
                      ? 'bg-amber-950/20 border-amber-400 ring-2 ring-amber-500/20'
                      : 'bg-[#181c2a] border-stone-800 hover:border-stone-700 hover:bg-[#1c2132]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-serif text-sm font-bold text-amber-100">
                        {pal.name}
                      </span>
                      <div className="text-[10px] text-stone-400">{pal.category}</div>
                    </div>
                    {selectedPaletteId === pal.id && (
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  {/* Swatches */}
                  <div className="flex items-center gap-2 pt-1">
                    <div
                      className="w-7 h-7 rounded-full shadow-inner border border-white/20"
                      style={{ backgroundColor: pal.colors.primary }}
                      title="Màu chính"
                    />
                    <div
                      className="w-7 h-7 rounded-full shadow-inner border border-white/20"
                      style={{ backgroundColor: pal.colors.secondary }}
                      title="Màu lót / phối"
                    />
                    <div
                      className="w-7 h-7 rounded-full shadow-inner border border-white/20"
                      style={{ backgroundColor: pal.colors.accent }}
                      title="Màu viền cúc"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BƯỚC 4: Ghi chú & Yêu cầu đặc biệt */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Bước 4/4
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-100 mt-1">
                Ghi chú hoặc yêu cầu phối đồ đặc biệt (Tùy chọn)
              </h2>
              <p className="text-stone-400 text-xs mt-1">
                Ví dụ: Bạn muốn phối thêm mấn hoàng gia, quạt giấy điệp, hoặc túi cói khi dạo phố.
              </p>
            </div>

            <div>
              <textarea
                rows={4}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Ví dụ: Em muốn phối thêm mấn và quạt cầm tay giấy điệp, phong cách trẻ trung để đi chụp ảnh Văn Miếu cùng bạn bè..."
                className="w-full p-4 bg-[#0e1017] border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Summary preview box */}
            <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 space-y-2 text-xs">
              <div className="font-semibold text-amber-300">Tóm tắt tiêu chí thiết lập:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-stone-300">
                <div>
                  <span className="text-stone-500 block">Sự kiện:</span> {selectedOccasion}
                </div>
                <div>
                  <span className="text-stone-500 block">Phong cách:</span> {selectedStyle}
                </div>
                <div>
                  <span className="text-stone-500 block">Trang phục:</span> {activeGarment.name}
                </div>
                <div>
                  <span className="text-stone-500 block">Tông màu:</span> {selectedPalette.name}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Navigation Buttons */}
        <div className="pt-6 border-t border-stone-800 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-700 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition shadow-md shadow-amber-950/30 cursor-pointer"
            >
              <span>Tiếp tục</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 text-sm font-bold tracking-wide transition shadow-xl shadow-amber-950/50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>AI TẠO GỢI Ý PHỐI ĐỒ</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
