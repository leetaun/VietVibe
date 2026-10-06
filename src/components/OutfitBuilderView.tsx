import React, { useState } from 'react';
import { Garment, OutfitPiece, Accessory, CulturalCheckResult } from '../types';
import { ACCESSORIES } from '../data/accessories';
import { runCulturalCompatibilityCheck } from '../data/culturalRules';
import {
  ShieldCheck,
  AlertTriangle,
  Shirt,
  Sparkles,
  Camera,
  CheckCircle2,
  RefreshCw,
  Palette,
  Layers,
  ZoomIn
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
  const [activeTabSide, setActiveTabSide] = useState<'colors' | 'accessories'>('colors');
  const [selectedComponent, setSelectedComponent] = useState<'main' | 'pants' | 'head' | 'hand' | 'neck' | 'foot'>('main');

  // Run realtime cultural check indicator
  const culturalStatus: CulturalCheckResult = runCulturalCompatibilityCheck(outfit, garment);

  // Quick palette colors
  const fabricColors = [
    { name: 'Đỏ thắm hoàng gia', value: '#9e1a1a' },
    { name: 'Đỏ son truyền thống', value: '#b91c1c' },
    { name: 'Xanh chàm cổ phong', value: '#1e3a5f' },
    { name: 'Xanh lam đại dương', value: '#1d4ed8' },
    { name: 'Xanh lục bảo', value: '#15803d' },
    { name: 'Vàng hoàng kim', value: '#d97706' },
    { name: 'Vàng mơ nhã nhặn', value: '#ca8a04' },
    { name: 'Nâu đất nung', value: '#854d0e' },
    { name: 'Tím hoa cà cung đình', value: '#6b21a8' },
    { name: 'Trắng lụa tơ tằm', value: '#f8fafc' },
    { name: 'Hồng phấn thiếu nữ', value: '#db2777' },
    { name: 'Đen tuyền quý phái', value: '#18181b' }
  ];

  const handleColorChange = (hex: string) => {
    if (selectedComponent === 'main') {
      onUpdateOutfit({ ...outfit, primaryColor: hex });
    } else if (selectedComponent === 'pants') {
      onUpdateOutfit({ ...outfit, pantsColor: hex });
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

  const handleRemoveAccessory = (category: 'head' | 'hand' | 'neck' | 'foot') => {
    const updatedAcc = { ...outfit.accessories };
    delete updatedAcc[category];
    onUpdateOutfit({
      ...outfit,
      accessories: updatedAcc
    });
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner & Cultural Indicator */}
      <div className="bg-[#141722] p-4 sm:p-5 rounded-2xl border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Outfit Builder</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-stone-100 mt-0.5">
            AI Gợi Ý & Tùy Chỉnh Outfit
          </h1>
          <p className="text-stone-400 text-xs">
            Đang phối: <span className="text-amber-300 font-semibold">{garment.name}</span> ({garment.dynastyLabel.split('(')[0].trim()})
          </p>
        </div>

        {/* REAL-TIME CULTURAL INDICATOR */}
        <div
          onClick={onOpenCulturalCheck}
          className={`cursor-pointer px-4 py-2.5 rounded-xl border transition flex items-center gap-3 w-full md:w-auto ${
            culturalStatus.isCompatible
              ? 'bg-emerald-950/30 border-emerald-500/40 hover:bg-emerald-950/50'
              : culturalStatus.statusType === 'danger'
              ? 'bg-red-950/40 border-red-500/50 hover:bg-red-950/60'
              : 'bg-amber-950/30 border-amber-500/40 hover:bg-amber-950/50'
          }`}
        >
          <div className="flex items-center gap-2">
            {culturalStatus.isCompatible ? (
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
            )}
            <div className="text-left">
              <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                <span
                  className={
                    culturalStatus.isCompatible
                      ? 'text-emerald-300'
                      : culturalStatus.statusType === 'danger'
                      ? 'text-red-300'
                      : 'text-amber-300'
                  }
                >
                  {culturalStatus.statusText}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40 font-mono">
                  {culturalStatus.score}%
                </span>
              </div>
              <div className="text-[10px] text-stone-400">
                {culturalStatus.issues.length === 0
                  ? 'Bấm để xem phân tích quy chuẩn văn hóa'
                  : `Phát hiện ${culturalStatus.issues.length} điểm cần lưu ý · Bấm để xem`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Column Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUMN 1 (Left - 3 Cols): Lựa chọn & Thành phần */}
        <div className="lg:col-span-3 bg-[#141722] p-5 rounded-2xl border border-stone-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Thành phần trang phục</span>
            </h3>
          </div>

          <div className="space-y-2">
            {/* Áo chính */}
            <button
              onClick={() => setSelectedComponent('main')}
              className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                selectedComponent === 'main'
                  ? 'bg-amber-950/20 border-amber-400 text-amber-200 shadow-sm'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <div>
                <div className="text-xs font-semibold">Áo chính</div>
                <div className="text-[11px] text-stone-400 font-light truncate">{garment.name}</div>
              </div>
              <div
                className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                style={{ backgroundColor: outfit.primaryColor }}
              />
            </button>

            {/* Quần lụa */}
            <button
              onClick={() => setSelectedComponent('pants')}
              className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                selectedComponent === 'pants'
                  ? 'bg-amber-950/20 border-amber-400 text-amber-200 shadow-sm'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <div>
                <div className="text-xs font-semibold">Quần / Váy lụa</div>
                <div className="text-[11px] text-stone-400 font-light">Lụa tơ tằm cổ truyền</div>
              </div>
              <div
                className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                style={{ backgroundColor: outfit.pantsColor }}
              />
            </button>

            {/* Phụ kiện đầu */}
            <button
              onClick={() => {
                setSelectedComponent('head');
                setActiveTabSide('accessories');
              }}
              className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                selectedComponent === 'head'
                  ? 'bg-amber-950/20 border-amber-400 text-amber-200'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <div>
                <div className="text-xs font-semibold">Phụ kiện đầu</div>
                <div className="text-[11px] text-stone-400 font-light truncate">
                  {outfit.accessories.head?.name || 'Chưa chọn'}
                </div>
              </div>
              <span className="text-[10px] text-amber-400 font-medium">Đổi</span>
            </button>

            {/* Cầm tay */}
            <button
              onClick={() => {
                setSelectedComponent('hand');
                setActiveTabSide('accessories');
              }}
              className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                selectedComponent === 'hand'
                  ? 'bg-amber-950/20 border-amber-400 text-amber-200'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <div>
                <div className="text-xs font-semibold">Cầm tay</div>
                <div className="text-[11px] text-stone-400 font-light truncate">
                  {outfit.accessories.hand?.name || 'Chưa chọn'}
                </div>
              </div>
              <span className="text-[10px] text-amber-400 font-medium">Đổi</span>
            </button>

            {/* Cổ / Ngực */}
            <button
              onClick={() => {
                setSelectedComponent('neck');
                setActiveTabSide('accessories');
              }}
              className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                selectedComponent === 'neck'
                  ? 'bg-amber-950/20 border-amber-400 text-amber-200'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <div>
                <div className="text-xs font-semibold">Khánh / Chuỗi ngọc / Kính</div>
                <div className="text-[11px] text-stone-400 font-light truncate">
                  {outfit.accessories.neck?.name || 'Chưa chọn'}
                </div>
              </div>
              <span className="text-[10px] text-amber-400 font-medium">Đổi</span>
            </button>

            {/* Hài / Giày */}
            <button
              onClick={() => {
                setSelectedComponent('foot');
                setActiveTabSide('accessories');
              }}
              className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between ${
                selectedComponent === 'foot'
                  ? 'bg-amber-950/20 border-amber-400 text-amber-200'
                  : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
              }`}
            >
              <div>
                <div className="text-xs font-semibold">Hài / Guốc / Giày</div>
                <div className="text-[11px] text-stone-400 font-light truncate">
                  {outfit.accessories.foot?.name || 'Chưa chọn'}
                </div>
              </div>
              <span className="text-[10px] text-amber-400 font-medium">Đổi</span>
            </button>
          </div>

          <button
            onClick={onBackToWizard}
            className="w-full py-2 text-center text-xs text-stone-400 hover:text-stone-200 pt-2 border-t border-stone-800/80 cursor-pointer"
          >
            ← Đổi phong cách / bối cảnh khác
          </button>
        </div>

        {/* COLUMN 2 (Center - 5 Cols): Mockup trực quan toàn bộ outfit */}
        <div className="lg:col-span-5 bg-[#12141d] rounded-2xl border border-amber-900/30 p-6 flex flex-col justify-between items-center relative min-h-[520px] shadow-2xl">
          <div className="w-full flex items-center justify-between text-xs text-stone-400 pb-2">
            <span className="font-serif font-bold text-amber-200">Hình ảnh bộ đồ Preview</span>
            <span className="text-[11px] text-amber-400/90 font-mono">Tương tác trực quan</span>
          </div>

          {/* Interactive Visual Outfit Mockup Canvas Area */}
          <div className="relative w-full max-w-[340px] h-[400px] mx-auto flex items-center justify-center">
            {/* Background Arch & Glow */}
            <div className="absolute inset-4 rounded-t-full bg-gradient-to-b from-amber-500/10 via-amber-900/5 to-transparent border border-amber-500/20 pointer-events-none" />

            {/* Base Garment Photo with Dynamic Fabric Hue / Lighting */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-stone-800">
              <img
                src={garment.imageUrl}
                alt={garment.name}
                className="w-full h-full object-cover transition duration-300"
              />

              {/* Tint overlay reflecting primary color selection */}
              <div
                className="absolute inset-0 mix-blend-color opacity-50 transition duration-300 pointer-events-none"
                style={{ backgroundColor: outfit.primaryColor }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141d] via-transparent to-black/30 pointer-events-none" />

              {/* Dynamic Accessory Overlays / Tags on the Mockup */}
              {outfit.accessories.head && (
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow">
                  <span>👑 {outfit.accessories.head.name}</span>
                </div>
              )}

              {outfit.accessories.hand && (
                <div className="absolute bottom-16 right-4 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow">
                  <span>🪭 {outfit.accessories.hand.name}</span>
                </div>
              )}

              {outfit.accessories.foot && (
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-stone-200 border border-stone-700/80 flex items-center gap-1.5 shadow">
                  <span>👞 {outfit.accessories.foot.name}</span>
                </div>
              )}

              {outfit.accessories.neck && (
                <div className="absolute top-16 right-4 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow">
                  <span>📿 {outfit.accessories.neck.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Buttons Below Mockup */}
          <div className="w-full pt-4 grid grid-cols-2 gap-3">
            <button
              onClick={onOpenCulturalCheck}
              className="py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white text-xs font-semibold border border-stone-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>TIẾP TỤC / KIỂM TRA VĂN HÓA</span>
            </button>

            <button
              onClick={onProceedToTryOn}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>AI TRY-ON</span>
            </button>
          </div>
        </div>

        {/* COLUMN 3 (Right - 4 Cols): Bảng công cụ tùy chỉnh (Side Panel) */}
        <div className="lg:col-span-4 bg-[#141722] p-5 rounded-2xl border border-stone-800 space-y-5">
          {/* Side Panel Tabs: Màu vải vs Kho phụ kiện */}
          <div className="grid grid-cols-2 p-1 bg-stone-900 rounded-xl border border-stone-800">
            <button
              onClick={() => setActiveTabSide('colors')}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                activeTabSide === 'colors'
                  ? 'bg-amber-600 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Đổi màu vải
            </button>
            <button
              onClick={() => setActiveTabSide('accessories')}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                activeTabSide === 'accessories'
                  ? 'bg-amber-600 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Kho Phụ Kiện
            </button>
          </div>

          {/* TAB 1: COLOR PALETTE */}
          {activeTabSide === 'colors' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  Chọn màu cho: {selectedComponent === 'pants' ? 'Quần / Váy lụa' : 'Áo chính'}
                </label>
                <p className="text-[11px] text-stone-400">
                  Bấm vào màu bên dưới để áp dụng trực tiếp lên mẫu mockup:
                </p>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {fabricColors.map((color) => {
                  const isCurrent =
                    (selectedComponent === 'pants' ? outfit.pantsColor : outfit.primaryColor) ===
                    color.value;
                  return (
                    <button
                      key={color.value}
                      onClick={() => handleColorChange(color.value)}
                      title={color.name}
                      className={`group flex flex-col items-center gap-1.5 p-2 rounded-xl border transition cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-950/30 border-amber-400 ring-2 ring-amber-500/30'
                          : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full border border-white/20 shadow-inner group-hover:scale-110 transition"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-[9px] text-stone-400 truncate w-full text-center">
                        {color.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom hex picker */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                <span className="text-xs text-stone-400">Tùy chỉnh mã màu:</span>
                <input
                  type="color"
                  value={selectedComponent === 'pants' ? outfit.pantsColor : outfit.primaryColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-8 h-8 rounded border border-stone-700 cursor-pointer bg-transparent"
                />
              </div>
            </div>
          )}

          {/* TAB 2: ACCESSORIES LIBRARY */}
          {activeTabSide === 'accessories' && (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-300">Thư viện phụ kiện cổ & tân:</span>
                <span className="text-[10px] text-stone-400">{ACCESSORIES.length} món</span>
              </div>

              <div className="space-y-2.5">
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
                      className={`p-3 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                        isEquipped
                          ? 'bg-amber-950/30 border-amber-400 ring-1 ring-amber-500/30'
                          : isRedFlag
                          ? 'bg-red-950/15 border-red-900/40 hover:border-red-600/50'
                          : 'bg-stone-900/80 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={acc.imageUrl}
                          alt={acc.name}
                          className="w-11 h-11 rounded-lg object-cover border border-stone-700 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-stone-100 truncate">
                              {acc.name}
                            </span>
                            {isRedFlag && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-red-900/50 text-red-300 border border-red-700/50">
                                Cảnh báo
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-stone-400 truncate">
                            {acc.categoryLabel} · {acc.description}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`text-xs font-bold px-2.5 py-1 rounded-md shrink-0 transition ${
                          isEquipped
                            ? 'bg-amber-500 text-stone-950'
                            : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                        }`}
                      >
                        {isEquipped ? 'Đang dùng' : 'Chọn'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
