import React, { useState } from 'react';
import { X, Eye, EyeOff, Sparkles, UserCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string, email: string) => void;
  onContinueAsGuest: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onContinueAsGuest
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('nguyenvana@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [fullName, setFullName] = useState('Nguyễn Văn A');
  const [confirmPassword, setConfirmPassword] = useState('12345678');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'login') {
      onLoginSuccess(fullName || 'Người dùng Việt Phục', email);
    } else {
      onLoginSuccess(fullName || 'Thành viên mới', email);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#141722] rounded-2xl border border-amber-900/40 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-stone-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Traditional Brand Identity Banner */}
        <div className="relative md:w-5/12 bg-gradient-to-b from-stone-900 via-red-950 to-stone-950 p-8 flex flex-col justify-between overflow-hidden min-h-[260px] md:min-h-full">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
              alt="Cổ phục Việt Nam"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />

          {/* Cultural & Brand Identity Tag */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Cultural & Brand Identity</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-amber-100 tracking-wide leading-tight">
              Việt Phục
              <br />
              <span className="text-amber-400">AI Stylist</span>
            </h2>
            <p className="mt-2 text-stone-300 text-sm font-light leading-relaxed">
              Khám Phá Di Sản Phục Trang Việt qua lăng kính công nghệ AI và góc nhìn đương đại.
            </p>
          </div>

          <div className="relative z-10 mt-6 pt-6 border-t border-amber-500/20 text-xs text-stone-400 space-y-1.5">
            <p className="flex items-center gap-2 text-stone-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Trải nghiệm AI Stylist cá nhân hóa
            </p>
            <p className="flex items-center gap-2 text-stone-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Lưu Lookbook & Khoảnh khắc di sản
            </p>
            <p className="flex items-center gap-2 text-stone-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Bảo tồn & chuẩn mực văn hóa Đại Việt
            </p>
          </div>
        </div>

        {/* Right Side: Auth Form Card */}
        <div className="md:w-7/12 bg-[#171b26] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Two Tabs: Đăng nhập / Đăng ký */}
            <div className="grid grid-cols-2 p-1 bg-stone-900/80 rounded-xl border border-stone-800 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`py-2.5 text-sm font-semibold rounded-lg transition ${
                  activeTab === 'login'
                    ? 'bg-amber-600 text-stone-950 shadow-md shadow-amber-950/40'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                ĐĂNG NHẬP
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className={`py-2.5 text-sm font-semibold rounded-lg transition ${
                  activeTab === 'register'
                    ? 'bg-amber-600 text-stone-950 shadow-md shadow-amber-950/40'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                ĐĂNG KÝ
              </button>
            </div>

            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl font-bold text-amber-100">
                {activeTab === 'login' ? 'Chào mừng bạn!' : 'Tạo tài khoản mới'}
              </h3>
              <p className="text-stone-400 text-xs mt-1">
                {activeTab === 'login'
                  ? 'Đăng nhập vào Việt Phục AI Stylist để quản lý outfit và lookbook'
                  : 'Bắt đầu hành trình khám phá và sáng tạo cùng di sản phục trang'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3.5 py-2.5 bg-stone-900/90 border border-stone-700/80 rounded-lg text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nguyenvana@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-stone-900/90 border border-stone-700/80 rounded-lg text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-stone-300">
                    Mật khẩu
                  </label>
                  {activeTab === 'login' && (
                    <button
                      type="button"
                      className="text-[11px] text-amber-400/90 hover:text-amber-300 transition"
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-stone-900/90 border border-stone-700/80 rounded-lg text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {activeTab === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-stone-900/90 border border-stone-700/80 rounded-lg text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-3 py-3 rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-950/40 transition cursor-pointer"
              >
                {activeTab === 'login' ? 'ĐĂNG NHẬP' : 'TẠO TÀI KHOẢN NGAY'}
              </button>
            </form>
          </div>

          {/* Guest Mode Trigger Button */}
          <div className="mt-6 pt-5 border-t border-stone-800 text-center">
            <button
              type="button"
              onClick={() => {
                onContinueAsGuest();
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-medium border border-stone-700/60 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>Bỏ qua & Trải nghiệm với tư cách Khách</span>
            </button>
            <p className="text-[11px] text-stone-400 mt-2">
              Khách có thể phối đồ, thử đồ AI và xem Thẻ văn hóa đầy đủ trước khi lưu kết quả.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
