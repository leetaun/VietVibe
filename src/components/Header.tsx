import React, { useState } from 'react';
import { ActiveScreen, UserProfile } from '../types';
import { Sparkles, Compass, Shirt, Camera, Bookmark, User, ShieldCheck, LogIn, LogOut, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  isLoggedIn: boolean;
  currentUser: UserProfile | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  isAdminMode: boolean;
  onToggleAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  isLoggedIn,
  currentUser,
  onOpenLogin,
  onLogout,
  isAdminMode,
  onToggleAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (screen: ActiveScreen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0e14]/90 backdrop-blur-md border-b border-[#2a261f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left transition cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 via-amber-500 to-red-800 p-[2px] shadow-lg shadow-amber-950/40">
            <div className="w-full h-full bg-[#12141c] rounded-[10px] flex items-center justify-center border border-amber-400/30">
              <span className="text-amber-400 font-serif font-black text-xl tracking-wider">VP</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-amber-200 tracking-wide group-hover:text-amber-100 transition">
                Việt Phục Remix
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                AI Stylist
              </span>
            </div>
            <p className="text-xs text-stone-400 font-light">Khám phá di sản · Sáng tạo phong cách</p>
          </div>
        </button>

        {/* Navigation Menu (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              currentScreen === 'home'
                ? 'text-amber-300 bg-amber-500/10 font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/40'
            }`}
          >
            Trang chủ
          </button>
          <button
            onClick={() => handleNavClick('explore')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              currentScreen === 'explore'
                ? 'text-amber-300 bg-amber-500/10 font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/40'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-400" />
            Khám phá
          </button>
          <button
            onClick={() => handleNavClick('stylist_wizard')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              currentScreen === 'stylist_wizard' || currentScreen === 'outfit_builder'
                ? 'text-amber-300 bg-amber-500/10 font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/40'
            }`}
          >
            <Shirt className="w-4 h-4 text-amber-400" />
            AI Stylist
          </button>
          <button
            onClick={() => handleNavClick('try_on_setup')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              currentScreen === 'try_on_setup' || currentScreen === 'try_on_result'
                ? 'text-amber-300 bg-amber-500/10 font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/40'
            }`}
          >
            <Camera className="w-4 h-4 text-emerald-400" />
            Thử đồ AI
          </button>
          <button
            onClick={() => handleNavClick('lookbook')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
              currentScreen === 'lookbook'
                ? 'text-amber-300 bg-amber-500/10 font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800/40'
            }`}
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            Lookbook
          </button>
        </nav>

        {/* User / Guest Action Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin toggle shortcut */}
          <button
            onClick={onToggleAdmin}
            title={isAdminMode ? 'Thoát chế độ Quản trị' : 'Vào Chế độ Quản trị (Admin)'}
            className={`p-2 rounded-lg text-xs font-medium border transition cursor-pointer ${
              isAdminMode
                ? 'bg-red-950/60 border-red-500/60 text-red-300'
                : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="hidden lg:inline-block text-xs text-stone-400 bg-stone-900/80 px-2.5 py-1 rounded-full border border-stone-800">
                Chế độ Khách (Guest)
              </span>
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-semibold shadow-md shadow-amber-900/30 transition cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-stone-950" />
                <span>Đăng nhập</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => handleNavClick('profile')}
                className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-stone-900/80 border border-stone-800/80 hover:border-amber-600/50 transition cursor-pointer text-left"
              >
                <img
                  src={currentUser?.avatarUrl}
                  alt={currentUser?.fullName}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-amber-500/40"
                />
                <div className="hidden sm:block">
                  <div className="text-xs font-medium text-stone-200 leading-tight">
                    {currentUser?.fullName}
                  </div>
                  <div className="text-[10px] text-amber-400 font-light">
                    {currentUser?.tierTitle}
                  </div>
                </div>
              </button>
              <button
                onClick={onLogout}
                title="Đăng xuất"
                className="p-2 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-stone-900 border border-stone-800 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-400 hover:text-white bg-stone-900 border border-stone-800 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-[#0e1017] px-4 py-3 space-y-1">
          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-stone-200 hover:bg-stone-800"
          >
            Trang chủ
          </button>
          <button
            onClick={() => handleNavClick('explore')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-stone-200 hover:bg-stone-800 flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            Khám phá di sản
          </button>
          <button
            onClick={() => handleNavClick('stylist_wizard')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-stone-200 hover:bg-stone-800 flex items-center gap-2"
          >
            <Shirt className="w-4 h-4 text-amber-400" />
            AI Stylist
          </button>
          <button
            onClick={() => handleNavClick('try_on_setup')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-stone-200 hover:bg-stone-800 flex items-center gap-2"
          >
            <Camera className="w-4 h-4 text-emerald-400" />
            Thử đồ AI
          </button>
          <button
            onClick={() => handleNavClick('lookbook')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-stone-200 hover:bg-stone-800 flex items-center gap-2"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            Lookbook cá nhân
          </button>
          {isLoggedIn && (
            <button
              onClick={() => handleNavClick('profile')}
              className="w-full text-left py-2 px-3 rounded-lg text-sm text-stone-200 hover:bg-stone-800 flex items-center gap-2"
            >
              <User className="w-4 h-4 text-amber-400" />
              Hồ sơ & Lịch sử
            </button>
          )}
        </div>
      )}
    </header>
  );
};

