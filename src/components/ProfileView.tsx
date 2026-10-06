import React, { useState } from 'react';
import { UserProfile, HistoryItem } from '../types';
import {
  Award,
  History,
  Settings,
  Shield,
  Bell,
  KeyRound,
  Trash2,
  ExternalLink,
  CheckCircle2,
  LogOut,
  Edit3
} from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  historyItems: HistoryItem[];
  onOpenStylistWithItem?: (item: HistoryItem) => void;
  onDeleteHistoryItem?: (id: string) => void;
  onLogout?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  historyItems,
  onOpenStylistWithItem,
  onDeleteHistoryItem,
  onLogout
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
    <div className="max-w-6xl mx-auto space-y-7 pb-20 animate-fade-in">
      {/* Top Header Matching PDF STT 11 */}
      <div className="border-b border-stone-800 pb-4">
        <h1 className="font-serif text-3xl font-bold text-stone-100 uppercase tracking-wide">
          Màn hình Hồ sơ & Lịch sử
        </h1>
        <p className="text-stone-400 text-xs mt-0.5">
          Quản lý tài khoản cá nhân, xem lại lịch sử phối đồ và thiết lập bảo mật
        </p>
      </div>

      {/* 2-Column Split Layout Matching PDF STT 11 Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* LEFT COLUMN (4 cols): HỒ SƠ CỦA TÔI */}
        <div className="lg:col-span-4 bg-[#141722] rounded-2xl border border-stone-800 p-6 space-y-6 shadow-xl text-center">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider text-left pb-2 border-b border-stone-800">
            HỒ SƠ CỦA TÔI
          </div>

          {/* User Photo & Info */}
          <div className="space-y-3 flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-xl">
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-stone-100">
                {user.fullName}
              </h2>
              <p className="text-xs text-stone-400">{user.email}</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-semibold mt-2">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{user.tierTitle}</span>
              </div>
            </div>
          </div>

          {/* 3 Metric Counters Matching PDF Mockup: 12, 5, 3 */}
          <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-stone-800">
            <div className="p-2.5 rounded-xl bg-[#0e1017] border border-stone-800">
              <div className="font-serif text-lg font-bold text-amber-300">
                {user.stats.outfitsCreated}
              </div>
              <div className="text-[10px] text-stone-400">Outfit tạo</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0e1017] border border-stone-800">
              <div className="font-serif text-lg font-bold text-amber-300">
                {user.stats.lookbooksSaved}
              </div>
              <div className="text-[10px] text-stone-400">Lookbook</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0e1017] border border-stone-800">
              <div className="font-serif text-lg font-bold text-amber-300">
                {user.stats.tryOnSessions}
              </div>
              <div className="text-[10px] text-stone-400">Thử đồ AI</div>
            </div>
          </div>

          {/* Buttons: CHỈNH SỬA THÔNG TIN, ĐĂNG XUẤT */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => setActiveTab('settings')}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>CHỈNH SỬA THÔNG TIN</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="w-full py-2 px-4 rounded-xl text-stone-400 hover:text-red-400 text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>ĐĂNG XUẤT</span>
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN (8 cols): LỊCH SỬ HOẠT ĐỘNG & CÀI ĐẶT TÀI KHOẢN */}
        <div className="lg:col-span-8 bg-[#141722] rounded-2xl border border-stone-800 p-6 space-y-6 shadow-xl">
          {/* Header Switcher */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('history')}
                className={`transition cursor-pointer pb-1 border-b-2 ${
                  activeTab === 'history'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                LỊCH SỬ HOẠT ĐỘNG
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`transition cursor-pointer pb-1 border-b-2 ${
                  activeTab === 'settings'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                CÀI ĐẶT & BẢO MẬT
              </button>
            </div>
            <span className="text-[11px] text-stone-500 font-mono">Dòng thời gian</span>
          </div>

          {/* TAB 1: LỊCH SỬ HOẠT ĐỘNG (Timeline matching PDF STT 11) */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-800">
                {/* Node 1 */}
                <div className="relative space-y-1">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-[#141722]" />
                  <div className="text-[10px] text-stone-500 font-mono">Dòng qua: 15/01/2025</div>
                  <div className="p-3.5 rounded-xl bg-[#0e1017] border border-stone-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-stone-200">
                        Đã tạo bộ phối mới: "Áo Tấc Xanh Chàm"
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        Bối cảnh: Kỷ yếu học đường · Phong cách: Chuẩn mực
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-400 underline cursor-pointer">
                      Xem lại
                    </span>
                  </div>
                </div>

                {/* Node 2 */}
                <div className="relative space-y-1">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-[#141722]" />
                  <div className="text-[10px] text-stone-500 font-mono">Dòng qua: 18/01/2025</div>
                  <div className="p-3.5 rounded-xl bg-[#0e1017] border border-stone-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-stone-200">
                        Đã mặc thử áo: "Áo Nhật Bình" trên ảnh cá nhân
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        Đã kết xuất ảnh độ nét cao và lưu vào album Tết
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-400 underline cursor-pointer">
                      Xem lại
                    </span>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="relative space-y-1">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-[#141722]" />
                  <div className="text-[10px] text-stone-500 font-mono">Dòng qua: 22/01/2025</div>
                  <div className="p-3.5 rounded-xl bg-[#0e1017] border border-stone-800">
                    <div className="text-xs font-bold text-stone-200">
                      Đã lưu Album "Tết Ất Tỵ 2025" vào Lookbook
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      Gồm 3 bộ phối cổ phục du xuân
                    </div>
                  </div>
                </div>

                {/* Node 4 */}
                <div className="relative space-y-1">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-stone-600 ring-4 ring-[#141722]" />
                  <div className="text-[10px] text-stone-500 font-mono">Dòng qua: 20/09/2024</div>
                  <div className="p-3.5 rounded-xl bg-[#0e1017] border border-stone-800">
                    <div className="text-xs font-bold text-stone-200">
                      Tìm hiểu thẻ văn hóa: "Áo Ngũ Thân Tay Chẽn"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CÀI ĐẶT & BẢO MẬT */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
              {savedSettingsSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã lưu cập nhật cài đặt thành công!</span>
                </div>
              )}

              <div className="space-y-3">
                <span className="font-bold text-stone-200 block">Đổi mật khẩu:</span>
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-[#0e1017] border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">Mật khẩu mới</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-[#0e1017] border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 space-y-2">
                <span className="font-bold text-stone-200 block">Quyền riêng tư:</span>
                <label className="flex items-center gap-2 text-stone-300 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-stone-700" />
                  <span>Cho phép chia sẻ Lookbook công khai</span>
                </label>
                <label className="flex items-center gap-2 text-stone-300 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-stone-700" />
                  <span>Tự động xóa ảnh thử đồ sau 30 ngày</span>
                </label>
              </div>

              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition cursor-pointer"
              >
                Lưu cài đặt
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
