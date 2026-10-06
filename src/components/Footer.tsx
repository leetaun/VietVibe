import React from 'react';
import { ActiveScreen } from '../types';
import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#2a261f] bg-[#090b10] text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-600 to-red-800 p-[1.5px]">
              <div className="w-full h-full bg-[#12141c] rounded-[7px] flex items-center justify-center">
                <span className="text-amber-400 font-serif font-black text-sm">VP</span>
              </div>
            </div>
            <div>
              <span className="font-serif font-bold text-amber-200 text-base">Việt Phục Remix</span>
              <p className="text-xs text-stone-500 font-light">Tôn vinh di sản phục trang Đại Việt qua công nghệ AI</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
            <button onClick={() => onNavigate('home')} className="hover:text-amber-300 transition">
              Trang chủ
            </button>
            <button onClick={() => onNavigate('explore')} className="hover:text-amber-300 transition">
              Khám phá di sản
            </button>
            <button onClick={() => onNavigate('stylist_wizard')} className="hover:text-amber-300 transition">
              AI Stylist
            </button>
            <button onClick={() => onNavigate('try_on_setup')} className="hover:text-amber-300 transition">
              AI Try-On
            </button>
            <button onClick={() => onNavigate('lookbook')} className="hover:text-amber-300 transition">
              Lookbook
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2025 - 2026 Việt Phục Remix · Dự án số hóa & cách tân cổ phục Việt Nam chuẩn mực di sản.</p>
          <p className="flex items-center gap-1.5">
            <span>Được gìn giữ với tình yêu cổ phong</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
