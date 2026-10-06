import React, { useState } from 'react';
import { UserProfile, HistoryItem } from '../types';
import {
  User,
  Award,
  History,
  Settings,
  Shield,
  Bell,
  KeyRound,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Camera,
  Shirt
} from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  historyItems: HistoryItem[];
  onOpenStylistWithItem?: (item: HistoryItem) => void;
  onDeleteHistoryItem?: (id: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  historyItems,
  onOpenStylistWithItem,
  onDeleteHistoryItem
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'settings'>('history');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSettingsSuccess(true);
    setTimeout(() => setSavedSettingsSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* 1. Header Card: Thông tin cá nhân & Cấp độ di sản */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#171a27] via-[#1b1c2b] to-[#161824] rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {/* Avatar with heritage ring */}
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="w-24 h-24 rounded-2xl object-cover ring-2 ring-amber-500/50 shadow-xl"
            />
            <span className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-amber-600 text-stone-950 font-bold text-[10px] shadow">
              Lv.3
            </span>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 justify-center sm:justify-start">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
                {user.fullName}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold self-center sm:self-auto">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{user.tierTitle}</span>
              </span>
            </div>

            <p className="text-xs text-stone-400">{user.email}</p>
            <p className="text-xs text-amber-200/90 font-light">
              Đã tích lũy {user.tierPoints} điểm cống hiến quảng bá di sản phục trang
            </p>

            {/* Metrics Counters */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-stone-800/80 max-w-md">
              <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                <div className="font-serif text-lg font-bold text-amber-300">
                  {user.stats.outfitsCreated}
                </div>
                <div className="text-[10px] text-stone-400">Bộ phối tạo ra</div>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                <div className="font-serif text-lg font-bold text-amber-300">
                  {user.stats.lookbooksSaved}
                </div>
                <div className="text-[10px] text-stone-400">Lookbook lưu</div>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                <div className="font-serif text-lg font-bold text-amber-300">
                  {user.stats.tryOnSessions}
                </div>
                <div className="text-[10px] text-stone-400">Lượt thử đồ AI</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher: Lịch sử phối đồ vs Cài đặt tài khoản */}
      <div className="flex border-b border-stone-800 gap-6 text-sm">
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 font-semibold transition flex items-center gap-2 cursor-pointer border-b-2 ${
            activeTab === 'history'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Dòng thời gian lịch sử ({historyItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 font-semibold transition flex items-center gap-2 cursor-pointer border-b-2 ${
            activeTab === 'settings'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Cài đặt tài khoản & Bảo mật</span>
        </button>
      </div>

      {/* TAB 1: HISTORY TIMELINE */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="text-xs text-stone-400">
            Xem lại các phiên tạo gợi ý AI Stylist và lịch sử ảnh ghép thử đồ AI trước đó:
          </div>

          <div className="space-y-3">
            {historyItems.map((item) => (
              <div
                key={item.id}
                className="group p-4 rounded-2xl bg-[#141722] border border-stone-800 hover:border-amber-600/40 transition flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-stone-700">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <span className="absolute bottom-1 right-1 p-1 rounded bg-black/80 text-[10px]">
                      {item.type === 'try_on' ? (
                        <Camera className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Shirt className="w-3 h-3 text-amber-400" />
                      )}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-sm font-bold text-stone-100 truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-stone-500 font-mono shrink-0">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-amber-400/90 font-medium mt-0.5 truncate">
                      {item.garmentName}
                    </p>
                    <p className="text-[11px] text-stone-400 mt-0.5 truncate">{item.details}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {onDeleteHistoryItem && (
                    <button
                      onClick={() => onDeleteHistoryItem(item.id)}
                      title="Xóa khỏi lịch sử"
                      className="p-2 rounded-lg text-stone-400 hover:text-red-400 hover:bg-stone-900 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ACCOUNT SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-[#141722] p-6 sm:p-8 rounded-2xl border border-stone-800 space-y-6">
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-xl">
            {savedSettingsSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Đã lưu cập nhật cài đặt tài khoản thành công!</span>
              </div>
            )}

            {/* Đổi mật khẩu */}
            <div className="space-y-3">
              <h3 className="font-serif text-base font-bold text-stone-100 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>Đổi mật khẩu</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Quyền riêng tư */}
            <div className="pt-4 border-t border-stone-800 space-y-3">
              <h3 className="font-serif text-base font-bold text-stone-100 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Quyền riêng tư & Lookbook</span>
              </h3>

              <label className="flex items-center gap-3 text-xs text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-stone-700 text-amber-500 focus:ring-0"
                />
                <span>Cho phép người khác xem Lookbook công khai của tôi</span>
              </label>

              <label className="flex items-center gap-3 text-xs text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-stone-700 text-amber-500 focus:ring-0"
                />
                <span>Tự động xóa ảnh cá nhân tải lên AI Try-On sau 30 ngày</span>
              </label>
            </div>

            {/* Thông báo */}
            <div className="pt-4 border-t border-stone-800 space-y-3">
              <h3 className="font-serif text-base font-bold text-stone-100 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Thiết lập thông báo</span>
              </h3>

              <label className="flex items-center gap-3 text-xs text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-stone-700 text-amber-500 focus:ring-0"
                />
                <span>Nhận thông báo khi có bộ sưu tập cổ phục mới</span>
              </label>
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition cursor-pointer"
            >
              Lưu thay đổi
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
