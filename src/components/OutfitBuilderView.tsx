import React, { useState } from 'react';
import { Garment, OutfitPiece, Accessory, CulturalCheckResult } from '../types';
import { ACCESSORIES } from '../data/accessories';
import { runCulturalCompatibilityCheck } from '../data/culturalRules';
import { OutfitMockupCanvas } from './OutfitMockupCanvas';
import {
  ShieldCheck,
  AlertTriangle,
  Shirt,
  Sparkles,
  Camera,
  CheckCircle2,
  ChevronRight,
  Layers,
  ArrowRight,
  RefreshCw,
  Palette
} from 'lucide-react';

interface OutfitBuilderViewProps {
  outfit: OutfitPiece;
  garment: Garment;
  onUpdateOutfit: (updated: OutfitPiece) => void;
  onOpenCulturalCheck: () => void;
  onProceedToTryOn: () => void;
  onBackToWizard: () => void;
}

export const OutfitBuilderView: React.FC<OutfitBuilderViewProps> = ({
  outfit,
  garment,
  onUpdateOutfit,
  onOpenCulturalCheck,
  onProceedToTryOn,
  onBackToWizard
}) => {
  const [selectedComponent, setSelectedComponent] = useState<
    'main' | 'inner' | 'pants' | 'head' | 'hand' | 'neck' | 'foot'
  >('main');

  // Realtime Cultural Check
  const culturalStatus: CulturalCheckResult = runCulturalCompatibilityCheck(outfit, garment);

  // Traditional Fabric Colors
  const fabricColors = [
    { name: 'Xanh chàm cổ phong', value: '#1e3a5f' },
    { name: 'Đỏ thắm cung đình', value: '#9e1a1a' },
    { name: 'Vàng hoàng gia', value: '#d97706' },
    { name: 'Xanh lục bảo', value: '#15803d' },
    { name: 'Tím hoa cà', value: '#6b21a8' },
    { name: 'Nâu đất nung', value: '#854d0e' },
    { name: 'Hồng phấn nhã nhặn', value: '#db2777' },
    { name: 'Xanh lam đại dương', value: '#1d4ed8' },
    { name: 'Trắng lụa tơ tằm', value: '#f8fafc' },
    { name: 'Đen tuyền quý phái', value: '#18181b' }
  ];

  const handleColorChange = (hex: string) => {
    if (selectedComponent === 'pants') {
      onUpdateOutfit({ ...outfit, pantsColor: hex });
    } else {
      onUpdateOutfit({ ...outfit, primaryColor: hex });
    }
  };

  const handleSelectAccessory = (accessory: Accessory) => {
    const updatedAcc = { ...outfit.accessories };
    if (accessory.category === 'head') updatedAcc.head = accessory;
    if (accessory.category === 'hand') updatedAcc.hand = accessory;
    if (accessory.category === 'neck') updatedAcc.neck = accessory;
    if (accessory.category === 'foot') updatedAcc.foot = accessory;

    onUpdateOutfit({
      ...outfit,
      accessories: updatedAcc
    });
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* Top Header matching PDF: "Việt Phục AI Stylist | AI GỢI Ý & TÙY CHỈNH OUTFIT" */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
            <span className="font-serif">Việt Phục AI Stylist</span>
            <span>·</span>
            <span>Bản phối thông minh</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mt-0.5">
            AI GỢI Ý & TÙY CHỈNH OUTFIT
          </h1>
          <p className="text-xs text-stone-400">
            Dáng áo: <span className="text-amber-300 font-semibold">{garment.name}</span> ({garment.dynastyLabel})
          </p>
        </div>

        <button
          onClick={onBackToWizard}
          className="text-xs text-stone-400 hover:text-amber-300 underline self-start sm:self-auto cursor-pointer"
        >
          ← Đổi bối cảnh / phong cách khác
        </button>
      </div>

      {/* Main 3-Column Layout: Left (Thành phần) - Center (Mockup Preview) - Right (Tùy chỉnh & Phụ kiện) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUMN 1: Cột Trái (3 cols) - "Lựa chọn & Thành phần" */}
        <div className="lg:col-span-3 bg-[#131620] rounded-2xl border border-stone-800/90 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <h2 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Lựa chọn & Thành phần</span>
            </h2>
          </div>

          <div className="space-y-2.5">
            {/* 1. Áo chính */}
            <button
              onClick={() => setSelectedComponent('main')}
              className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between gap-2.5 cursor-pointer ${
                selectedComponent === 'main'
                  ? 'bg-amber-950/30 border-amber-400 ring-1 ring-amber-500/40 text-amber-200'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-lg overflow-hidden border border-stone-700 shrink-0 bg-stone-950 flex items-center justify-center"
                  style={{ backgroundColor: outfit.primaryColor }}
                >
                  <img
                    src={garment.imageUrl}
                    alt={garment.name}
                    className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-stone-400 font-medium">Áo chính</div>
                  <div className="text-xs font-bold text-stone-100 truncate">{garment.name}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
            </button>

            {/* 2. Áo lót trong (Bạch y) */}
            <button
              onClick={() => setSelectedComponent('inner')}
              className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between gap-2.5 cursor-pointer ${
                selectedComponent === 'inner'
                  ? 'bg-amber-950/30 border-amber-400 ring-1 ring-amber-500/40 text-amber-200'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-700 shrink-0 bg-white flex items-center justify-center">
                  <span className="text-[9px] font-bold text-stone-700">LỤA</span>
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-stone-400 font-medium">Áo lót trong</div>
                  <div className="text-xs font-bold text-stone-100 truncate">Bạch y tơ tằm</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
            </button>

            {/* 3. Quần / Váy */}
            <button
              onClick={() => setSelectedComponent('pants')}
              className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between gap-2.5 cursor-pointer ${
                selectedComponent === 'pants'
                  ? 'bg-amber-950/30 border-amber-400 ring-1 ring-amber-500/40 text-amber-200'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-lg overflow-hidden border border-stone-700 shrink-0 flex items-center justify-center shadow-inner"
                  style={{ backgroundColor: outfit.pantsColor || '#ffffff' }}
                >
                  <span className="text-[9px] font-bold text-stone-800">QUẦN</span>
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-stone-400 font-medium">Quần / Váy</div>
                  <div className="text-xs font-bold text-stone-100 truncate">Quần lụa trắng</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
            </button>

            {/* 4. Phụ kiện đầu */}
            <button
              onClick={() => setSelectedComponent('head')}
              className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between gap-2.5 cursor-pointer ${
                selectedComponent === 'head'
                  ? 'bg-amber-950/30 border-amber-400 ring-1 ring-amber-500/40 text-amber-200'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-700 shrink-0 bg-stone-950">
                  <img
                    src={outfit.accessories.head?.imageUrl || ACCESSORIES[0].imageUrl}
                    alt="Đầu"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-stone-400 font-medium">Phụ kiện đầu</div>
                  <div className="text-xs font-bold text-stone-100 truncate">
                    {outfit.accessories.head?.name || 'Mấn hoàng gia'}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
            </button>

            {/* 5. Cầm tay */}
            <button
              onClick={() => setSelectedComponent('hand')}
              className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between gap-2.5 cursor-pointer ${
                selectedComponent === 'hand'
                  ? 'bg-amber-950/30 border-amber-400 ring-1 ring-amber-500/40 text-amber-200'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-700 shrink-0 bg-stone-950">
                  <img
                    src={outfit.accessories.hand?.imageUrl || ACCESSORIES[4].imageUrl}
                    alt="Cầm tay"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-stone-400 font-medium">Cầm tay</div>
                  <div className="text-xs font-bold text-stone-100 truncate">
                    {outfit.accessories.hand?.name || 'Quạt giấy điệp'}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
            </button>

            {/* 6. Hài / Giày */}
            <button
              onClick={() => setSelectedComponent('foot')}
              className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between gap-2.5 cursor-pointer ${
                selectedComponent === 'foot'
                  ? 'bg-amber-950/30 border-amber-400 ring-1 ring-amber-500/40 text-amber-200'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-700 shrink-0 bg-stone-950">
                  <img
                    src={outfit.accessories.foot?.imageUrl || ACCESSORIES[11].imageUrl}
                    alt="Giày hài"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-stone-400 font-medium">Hài / Giày</div>
                  <div className="text-xs font-bold text-stone-100 truncate">
                    {outfit.accessories.foot?.name || 'Hài thêu hoa'}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
            </button>
          </div>
        </div>

        {/* COLUMN 2: Cột Giữa (5 cols) - "Hình ảnh bộ đồ Preview" */}
        <div className="lg:col-span-5 bg-[#131620] rounded-2xl border border-stone-800/90 p-5 space-y-4 shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <h2 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Hình ảnh bộ đồ Preview</span>
            </h2>
            <span className="text-[11px] text-stone-400">Mockup trực quan toàn thân</span>
          </div>

          {/* REALISTIC HIGH-FIDELITY FULL-BODY OUTFIT MOCKUP CANVAS */}
          <OutfitMockupCanvas
            garment={garment}
            outfit={outfit}
            selectedComponent={selectedComponent}
            onSelectComponent={setSelectedComponent}
          />

          {/* CULTURAL STATUS INDICATOR & SCORE UNDER PREVIEW (Exact match PDF STT 6) */}
          <div
            onClick={onOpenCulturalCheck}
            className={`cursor-pointer p-3.5 rounded-xl border transition flex items-center justify-between gap-3 ${
              culturalStatus.isCompatible
                ? 'bg-emerald-950/30 border-emerald-500/40 hover:bg-emerald-950/50'
                : 'bg-red-950/30 border-red-500/50 hover:bg-red-950/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {culturalStatus.isCompatible ? (
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
              )}
              <div className="text-left">
                <div className="text-xs font-bold text-stone-100">
                  Đánh giá mức độ phù hợp văn hóa:
                </div>
                <div
                  className={`text-xs font-semibold ${
                    culturalStatus.isCompatible ? 'text-emerald-300' : 'text-amber-300'
                  }`}
                >
                  {culturalStatus.isCompatible ? '✓ Đang chuẩn mực' : '⚠️ Có cảnh báo chưa phù hợp'} (
                  {culturalStatus.score}%)
                </div>
              </div>
            </div>
            <span className="text-[11px] text-amber-400 font-medium underline shrink-0">
              Chi tiết →
            </span>
          </div>

          {/* TWO PRIMARY ACTION BUTTONS (Exact match PDF STT 6) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={onOpenCulturalCheck}
              className="py-3 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white text-xs font-bold border border-stone-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="truncate">TIẾP TỤC / KIỂM TRA VĂN HÓA</span>
            </button>

            <button
              onClick={onProceedToTryOn}
              className="py-3 px-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-950/40 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-stone-950" />
              <span>AI TRY-ON</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* COLUMN 3: Cột Phải (4 cols) - "Tùy chỉnh & Phụ kiện" */}
        <div className="lg:col-span-4 bg-[#131620] rounded-2xl border border-stone-800/90 p-5 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <h2 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-amber-400" />
              <span>Tùy chỉnh & Phụ kiện</span>
            </h2>
          </div>

          {/* SECTION 1: Đổi màu vải */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-200">
                Đổi màu vải ({selectedComponent === 'pants' ? 'Quần' : 'Áo chính'})
              </span>
              <span className="text-[10px] text-stone-400">Click để chọn</span>
            </div>

            <div className="grid grid-cols-5 gap-2.5">
              {fabricColors.map((color) => {
                const isSelected =
                  (selectedComponent === 'pants' ? outfit.pantsColor : outfit.primaryColor) ===
                  color.value;
                return (
                  <button
                    key={color.value}
                    onClick={() => handleColorChange(color.value)}
                    title={color.name}
                    className={`group relative aspect-square rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                      isSelected
                        ? 'border-amber-400 ring-2 ring-amber-500/40 scale-105'
                        : 'border-stone-800 hover:border-stone-600'
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-white shadow-md" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: Kho Phụ Kiện (Library Grid) */}
          <div className="space-y-3 pt-4 border-t border-stone-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-200">Kho Phụ Kiện</span>
              <span className="text-[10px] text-amber-400 font-medium">Chọn để phối</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {ACCESSORIES.map((acc) => {
                const isEquipped =
                  outfit.accessories.head?.id === acc.id ||
                  outfit.accessories.hand?.id === acc.id ||
                  outfit.accessories.neck?.id === acc.id ||
                  outfit.accessories.foot?.id === acc.id;

                const isRedFlag = acc.culturalCompatibility === 'red_flag';

                return (
                  <div
                    key={acc.id}
                    onClick={() => handleSelectAccessory(acc)}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
                      isEquipped
                        ? 'bg-amber-950/30 border-amber-400 ring-1 ring-amber-500/30'
                        : isRedFlag
                        ? 'bg-red-950/20 border-red-900/50 hover:border-red-600/60'
                        : 'bg-stone-900/90 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-black/40">
                      <img
                        src={acc.imageUrl}
                        alt={acc.name}
                        className="w-full h-full object-cover"
                      />
                      {isRedFlag && (
                        <span className="absolute top-1 right-1 text-[8px] font-bold px-1 py-0.2 rounded bg-red-900/90 text-red-200">
                          Red-flag
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-stone-100 truncate">
                        {acc.name}
                      </div>
                      <div className="text-[9px] text-stone-400 truncate">
                        {acc.categoryLabel}
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`w-full py-1 rounded text-[10px] font-bold transition ${
                        isEquipped
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      {isEquipped ? 'Đang dùng' : 'Chọn phối'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
