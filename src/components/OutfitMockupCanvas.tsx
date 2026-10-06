import React, { useState } from 'react';
import { Garment, OutfitPiece, Accessory } from '../types';
import { ZoomIn, ZoomOut, RotateCcw, Eye, ShieldCheck, AlertTriangle } from 'lucide-react';

interface OutfitMockupCanvasProps {
  garment: Garment;
  outfit: OutfitPiece;
  selectedComponent: 'main' | 'inner' | 'pants' | 'head' | 'hand' | 'neck' | 'foot';
  onSelectComponent: (comp: 'main' | 'inner' | 'pants' | 'head' | 'hand' | 'neck' | 'foot') => void;
}

export const OutfitMockupCanvas: React.FC<OutfitMockupCanvasProps> = ({
  garment,
  outfit,
  selectedComponent,
  onSelectComponent
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewAngle, setViewAngle] = useState<'front' | 'angle'>('front');

  const primaryColor = outfit.primaryColor;
  const pantsColor = outfit.pantsColor || '#f8fafc';
  const hasHead = !!outfit.accessories.head;
  const hasHand = !!outfit.accessories.hand;
  const hasNeck = !!outfit.accessories.neck;
  const hasFoot = !!outfit.accessories.foot;

  const isNhatBinh = garment.type === 'Áo Nhật Bình' || garment.id === 'nhat-binh';
  const isAoTac = garment.type === 'Áo Tấc' || garment.id === 'ao-tac';
  const isNguThan = garment.type === 'Áo Ngũ Thân' || garment.id === 'ngu-than-tay-chen';
  const isGiaoLinh = garment.type === 'Áo Giao Lĩnh' || garment.id === 'giao-linh';

  // Check if red-flag footwear or glasses
  const isSneaker = outfit.accessories.foot?.id === 'sneaker-chunky';
  const isNeonShades = outfit.accessories.neck?.id === 'kinh-mat-neon';

  return (
    <div className="relative w-full h-[520px] bg-[#0c0e15] rounded-2xl border border-stone-800/90 overflow-hidden flex flex-col justify-between select-none">
      {/* Top Canvas Controls Bar (Zoom, View Angle, Reset) */}
      <div className="z-20 p-3.5 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest bg-amber-500/15 px-2.5 py-0.5 rounded border border-amber-500/30">
            {garment.name}
          </span>
          <span className="text-[11px] text-stone-400 font-mono">
            {viewAngle === 'front' ? 'Góc nhìn: Chính diện' : 'Góc nhìn: Nghiêng 30°'}
          </span>
        </div>

        {/* View Controls Toolbar */}
        <div className="flex items-center gap-1.5 bg-stone-900/90 backdrop-blur-md px-2 py-1 rounded-lg border border-stone-800">
          <button
            onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.1))}
            title="Phóng to"
            className="p-1 rounded hover:bg-stone-800 text-stone-300 hover:text-white transition"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(0.85, prev - 0.1))}
            title="Thu nhỏ"
            className="p-1 rounded hover:bg-stone-800 text-stone-300 hover:text-white transition"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewAngle(prev => (prev === 'front' ? 'angle' : 'front'))}
            title="Đổi góc nhìn"
            className="p-1 rounded hover:bg-stone-800 text-stone-300 hover:text-white transition"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              setZoomLevel(1);
              setViewAngle('front');
            }}
            title="Đặt lại"
            className="p-1 rounded hover:bg-stone-800 text-stone-300 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center Visual Mockup Display */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Ambient Palace Lighting & Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(180,120,40,0.12),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-6 w-56 h-12 bg-black/60 rounded-full blur-xl pointer-events-none" />

        {/* Scale Container */}
        <div
          className="relative transition-all duration-300 ease-out flex items-center justify-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* HIGH FIDELITY VICTORIAN / IMPERIAL VIETNAMESE OUTFIT VECTOR & SILHOUETTE */}
          <div className="relative w-[300px] h-[440px] flex items-center justify-center">
            {/* SVG Visual Presentation of Complete Outfit */}
            <svg
              viewBox="0 0 300 440"
              className="w-full h-full drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 20px 25px rgba(0,0,0,0.7))' }}
            >
              <defs>
                {/* Fabric gradient reflecting chosen color */}
                <linearGradient id="robeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
                  <stop offset="40%" stopColor={primaryColor} stopOpacity="0.88" />
                  <stop offset="80%" stopColor="#0a0c12" stopOpacity="0.65" />
                  <stop offset="100%" stopColor={primaryColor} stopOpacity="0.95" />
                </linearGradient>

                {/* Silk pants gradient */}
                <linearGradient id="pantsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#dcdcdc" />
                  <stop offset="35%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#c8c8c8" />
                </linearGradient>

                {/* Gold embroidery border gradient */}
                <linearGradient id="goldEmbroidery" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffe082" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#aa771c" />
                </linearGradient>

                {/* Ngũ hành sleeves gradient for Áo Nhật Bình */}
                <linearGradient id="nguHanhCuff" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e53935" />
                  <stop offset="25%" stopColor="#fdd835" />
                  <stop offset="50%" stopColor="#1e88e5" />
                  <stop offset="75%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#43a047" />
                </linearGradient>

                <filter id="fabricTexture" x="0%" y="0%" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                  <feBlend mode="overlay" in="SourceGraphic" in2="noise" />
                </filter>
              </defs>

              {/* 1. MANNEQUIN SILHOUETTE HEAD / NECK (Behind) */}
              <g onClick={() => onSelectComponent('head')} className="cursor-pointer group">
                {/* Head oval */}
                <ellipse cx="150" cy="52" rx="20" ry="25" fill="#e2c8b0" />
                {/* Neck */}
                <path d="M 142 75 L 142 98 L 158 98 L 158 75 Z" fill="#cfb29a" />

                {/* Neon Sunglasses if equipped (Red flag item) */}
                {isNeonShades && (
                  <g>
                    <rect x="135" y="47" width="30" height="9" rx="3" fill="#ff0055" />
                    <line x1="135" y1="51" x2="165" y2="51" stroke="#00ffff" strokeWidth="2" />
                  </g>
                )}

                {/* HEADPIECE: Mấn Hoàng Gia / Khăn Đóng */}
                {hasHead && (
                  <g>
                    {outfit.accessories.head?.id.includes('khan-dong') ? (
                      /* Khăn đóng nam (5 nếp chữ Nhân) */
                      <g>
                        <ellipse cx="150" cy="38" rx="23" ry="14" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                        <path d="M 128 38 Q 150 26 172 38" fill="none" stroke="#52525b" strokeWidth="2" />
                        <path d="M 130 42 Q 150 32 170 42" fill="none" stroke="#3f3f46" strokeWidth="2" />
                      </g>
                    ) : (
                      /* Mấn Hoàng Gia / Mấn đính ngọc */
                      <g>
                        <ellipse cx="150" cy="36" rx="25" ry="16" fill="#1e293b" stroke="url(#goldEmbroidery)" strokeWidth="3" />
                        <ellipse cx="150" cy="35" rx="22" ry="13" fill={primaryColor} />
                        {/* Ngọc trai / Kim tuyến đính mấn */}
                        <circle cx="150" cy="27" r="3" fill="#ffffff" stroke="#d4af37" strokeWidth="1" />
                        <circle cx="140" cy="31" r="2" fill="#fff" />
                        <circle cx="160" cy="31" r="2" fill="#fff" />
                      </g>
                    )}
                  </g>
                )}
              </g>

              {/* 2. INNER WHITE SHIRT (Bạch y) */}
              <g onClick={() => onSelectComponent('inner')} className="cursor-pointer">
                {/* White stand collar / V-neck inner */}
                <path d="M 138 92 Q 150 102 162 92 L 158 115 L 142 115 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
              </g>

              {/* 3. WHITE SILK PANTS (Quần Lụa Trắng Cổ Truyền) */}
              <g onClick={() => onSelectComponent('pants')} className="cursor-pointer">
                {/* Left pant leg */}
                <path
                  d="M 125 240 L 115 365 L 144 365 L 148 250 Z"
                  fill="url(#pantsGradient)"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />
                {/* Right pant leg */}
                <path
                  d="M 152 250 L 156 365 L 185 365 L 175 240 Z"
                  fill="url(#pantsGradient)"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />
                {/* Crease shadows */}
                <line x1="130" y1="260" x2="128" y2="355" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.4" />
                <line x1="170" y1="260" x2="172" y2="355" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.4" />
              </g>

              {/* 4. FOOTWEAR: Hài Nhung Thêu / Guốc Mộc / Sneaker */}
              <g onClick={() => onSelectComponent('foot')} className="cursor-pointer">
                {isSneaker ? (
                  /* Sneaker chunky thể thao (Red flag) */
                  <g>
                    <path d="M 110 363 L 145 363 L 145 378 L 105 378 Z" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
                    <path d="M 155 363 L 190 363 L 195 378 L 155 378 Z" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
                  </g>
                ) : (
                  /* Hài nhung thêu mũi cong truyền thống */
                  <g>
                    {/* Left shoe */}
                    <path d="M 118 363 Q 112 368 110 373 Q 130 376 142 373 L 142 363 Z" fill="#18181b" stroke="url(#goldEmbroidery)" strokeWidth="1.2" />
                    {/* Right shoe */}
                    <path d="M 158 363 L 158 373 Q 170 376 190 373 Q 188 368 182 363 Z" fill="#18181b" stroke="url(#goldEmbroidery)" strokeWidth="1.2" />
                  </g>
                )}
              </g>

              {/* 5. MAIN ROBE BODY & SLEEVES (Áo Tấc / Nhật Bình / Ngũ Thân) */}
              <g onClick={() => onSelectComponent('main')} className="cursor-pointer">
                {/* Left Wide Sleeve (Tay Thụng / Chẽn) */}
                {isAoTac ? (
                  /* Áo Tấc tay thụng rộng 1 tấc */
                  <path
                    d="M 130 102 L 60 170 L 68 250 L 126 195 Z"
                    fill="url(#robeGradient)"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    strokeOpacity="0.3"
                  />
                ) : (
                  /* Tay chẽn hoặc tay Nhật Bình */
                  <path
                    d="M 130 102 L 75 160 L 88 230 L 128 185 Z"
                    fill="url(#robeGradient)"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    strokeOpacity="0.3"
                  />
                )}

                {/* Right Wide Sleeve */}
                {isAoTac ? (
                  <path
                    d="M 170 102 L 240 170 L 232 250 L 174 195 Z"
                    fill="url(#robeGradient)"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    strokeOpacity="0.3"
                  />
                ) : (
                  <path
                    d="M 170 102 L 225 160 L 212 230 L 172 185 Z"
                    fill="url(#robeGradient)"
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    strokeOpacity="0.3"
                  />
                )}

                {/* ÁO NHẬT BÌNH: Dải Ngũ Hành ở tay áo */}
                {isNhatBinh && (
                  <g>
                    {/* Left cuff ngũ hành */}
                    <rect x="70" y="215" width="22" height="15" fill="url(#nguHanhCuff)" />
                    {/* Right cuff ngũ hành */}
                    <rect x="208" y="215" width="22" height="15" fill="url(#nguHanhCuff)" />
                  </g>
                )}

                {/* Main Body Robe (Vạt áo ngũ thân buông dài qua gối) */}
                <path
                  d="M 132 98 
                     Q 150 105 168 98 
                     L 192 195 
                     L 205 295 
                     L 95 295 
                     L 108 195 Z"
                  fill="url(#robeGradient)"
                  stroke="url(#goldEmbroidery)"
                  strokeWidth="0.8"
                />

                {/* ÁO NHẬT BÌNH: Cổ hình chữ nhật to bản trước ngực + Dải hoa lệ */}
                {isNhatBinh ? (
                  <g>
                    {/* Rectangular wide embroidered collar */}
                    <path
                      d="M 136 96 L 164 96 L 164 165 L 152 165 L 152 290 L 148 290 L 148 165 L 136 165 Z"
                      fill="#1a1c23"
                      stroke="url(#goldEmbroidery)"
                      strokeWidth="2.5"
                    />
                    {/* Gold Phoenix / cloud relief on chest */}
                    <circle cx="150" cy="130" r="10" fill="none" stroke="url(#goldEmbroidery)" strokeWidth="1.5" />
                    <path d="M 145 130 Q 150 124 155 130" stroke="#ffd700" strokeWidth="1.5" fill="none" />
                    {/* Dải hoa lệ thắt nút rủ trước ngực */}
                    <line x1="147" y1="165" x2="147" y2="215" stroke="#ef4444" strokeWidth="2.5" />
                    <line x1="153" y1="165" x2="153" y2="215" stroke="#ef4444" strokeWidth="2.5" />
                  </g>
                ) : (
                  /* Áo Tấc & Ngũ Thân: Cổ đứng cài 5 khuy bên phải */
                  <g>
                    {/* Stand Collar */}
                    <path d="M 138 92 L 162 92 L 162 102 L 138 102 Z" fill="#18181b" stroke="url(#goldEmbroidery)" strokeWidth="1.5" />
                    {/* Lapel seam diagonal to right armpit */}
                    <path d="M 152 102 Q 156 120 172 135 L 170 295" fill="none" stroke="url(#goldEmbroidery)" strokeWidth="1" strokeDasharray="3 2" />
                    {/* 5 Cúc cúc khuy vàng (Ngũ thường) */}
                    <circle cx="155" cy="106" r="2.2" fill="#d4af37" stroke="#fff" strokeWidth="0.5" />
                    <circle cx="160" cy="116" r="2.2" fill="#d4af37" stroke="#fff" strokeWidth="0.5" />
                    <circle cx="166" cy="128" r="2.2" fill="#d4af37" stroke="#fff" strokeWidth="0.5" />
                    <circle cx="169" cy="142" r="2.2" fill="#d4af37" stroke="#fff" strokeWidth="0.5" />
                    <circle cx="170" cy="158" r="2.2" fill="#d4af37" stroke="#fff" strokeWidth="0.5" />
                  </g>
                )}
              </g>

              {/* 6. CHEST ORNAMENT (Khánh Vàng Cung Đình / Chuỗi Ngọc) */}
              {hasNeck && !isNeonShades && (
                <g onClick={() => onSelectComponent('neck')} className="cursor-pointer">
                  {/* Khánh vàng đeo trước ngực */}
                  <path
                    d="M 143 96 Q 150 120 157 96"
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 142 120 Q 150 115 158 120 Q 150 128 142 120"
                    fill="#d4af37"
                    stroke="#aa771c"
                    strokeWidth="1"
                  />
                  {/* Tua đỏ rủ */}
                  <line x1="150" y1="126" x2="150" y2="138" stroke="#dc2626" strokeWidth="2" />
                </g>
              )}

              {/* 7. HANDHELD ACCESSORY (Quạt giấy điệp / Túi gấm) */}
              {hasHand && (
                <g onClick={() => onSelectComponent('hand')} className="cursor-pointer">
                  {outfit.accessories.hand?.id.includes('quat') ? (
                    /* Quạt giấy điệp xoè nhẹ bên tay phải */
                    <g transform="translate(198, 220) rotate(-25)">
                      <path
                        d="M 0 0 L -18 -32 Q 0 -40 18 -32 Z"
                        fill="#fef08a"
                        stroke="#b45309"
                        strokeWidth="1.2"
                      />
                      {/* Nan tre */}
                      <line x1="0" y1="0" x2="-10" y2="-34" stroke="#78350f" strokeWidth="1" />
                      <line x1="0" y1="0" x2="0" y2="-36" stroke="#78350f" strokeWidth="1" />
                      <line x1="0" y1="0" x2="10" y2="-34" stroke="#78350f" strokeWidth="1" />
                    </g>
                  ) : (
                    /* Túi gấm đeo */
                    <g transform="translate(85, 230)">
                      <rect x="0" y="0" width="22" height="26" rx="4" fill="#991b1b" stroke="#d4af37" strokeWidth="1.5" />
                      <path d="M 11 0 L 11 -12" stroke="#d4af37" strokeWidth="1" />
                    </g>
                  )}
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Interactive Selection Quick Indicator on Canvas Bottom */}
      <div className="z-20 px-4 py-2.5 bg-[#090b10]/90 backdrop-blur-md border-t border-stone-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-stone-400">Đang chọn tùy biến:</span>
          <span className="font-bold text-amber-300">
            {selectedComponent === 'main'
              ? 'Áo chính'
              : selectedComponent === 'inner'
              ? 'Áo lót trong (Bạch y)'
              : selectedComponent === 'pants'
              ? 'Quần / Váy lụa'
              : selectedComponent === 'head'
              ? 'Phụ kiện đầu'
              : selectedComponent === 'hand'
              ? 'Cầm tay'
              : selectedComponent === 'neck'
              ? 'Khánh / Chuỗi ngực'
              : 'Hài / Guốc'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
          <span>Click trực tiếp lên người mẫu để đổi chi tiết</span>
        </div>
      </div>
    </div>
  );
};
