import React from 'react';
import { Garment, ActiveScreen } from '../types';
import { Sparkles, ArrowRight, Compass, Shirt, Camera, BookOpen, ChevronRight, Award } from 'lucide-react';

interface HomeViewProps {
  garments: Garment[];
  onNavigate: (screen: ActiveScreen) => void;
  onSelectGarmentDetail: (garment: Garment) => void;
  onStartStylistWithGarment: (garment: Garment) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  garments,
  onNavigate,
  onSelectGarmentDetail,
  onStartStylistWithGarment
}) => {
  return (
    <div className="space-y-16 pb-20 animate-fade-in">
      {/* 1. HERO BANNER (Matching PDF STT 2) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#12141c] via-[#1a141c] to-[#14121a] border border-amber-900/40 p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=1600&q=80"
            alt="Việt phục nền"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0e1017] via-[#0e1017]/85 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Nền tảng Di sản Văn hóa & Công nghệ AI</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-amber-100 tracking-tight leading-[1.15]">
            KHÁM PHÁ DI SẢN - <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              SÁNG TẠO PHONG CÁCH
            </span>
          </h1>

          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Hồi sinh vẻ đẹp ngàn năm của cổ phục Việt (Áo Tấc, Nhật Bình, Ngũ Thân...) qua lăng kính công nghệ AI Stylist thông minh, giữ trọn nét tôn nghiêm mà vẫn rạng ngời cá tính hiện đại.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('stylist_wizard')}
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-950/50 transition cursor-pointer"
            >
              <Shirt className="w-4 h-4 text-stone-950" />
              <span>BẮT ĐẦU PHỐI ĐỒ</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </button>

            <button
              onClick={() => onNavigate('explore')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700/70 text-sm font-semibold transition cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Khám phá ngay</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. VIỆT PHỤC TIÊU BIỂU (FEATURED - Matching PDF STT 2) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Di sản phục trang
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mt-1">
              VIỆT PHỤC TIÊU BIỂU
            </h2>
            <p className="text-stone-400 text-xs mt-1">
              Thẻ trượt giới thiệu nhanh các bộ trang phục nổi bật kèm triều đại
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition cursor-pointer"
          >
            <span>Xem tất cả</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {garments.slice(0, 5).map((garment) => (
            <div
              key={garment.id}
              onClick={() => onSelectGarmentDetail(garment)}
              className="group cursor-pointer bg-[#141722] rounded-2xl border border-stone-800/80 p-4 hover:border-amber-500/50 hover:bg-[#181c2b] transition flex flex-col items-center text-center space-y-3"
            >
              {/* Circular portrait image matching PDF mockup */}
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-stone-700 group-hover:border-amber-400 group-hover:scale-105 transition shadow-lg">
                <img
                  src={garment.imageUrl}
                  alt={garment.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-serif text-sm font-bold text-stone-100 group-hover:text-amber-300 transition">
                  {garment.name}
                </h3>
                <span className="text-[11px] text-amber-400/90 font-mono block mt-0.5">
                  {garment.dynastyLabel.split('(')[0].trim()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. KHỐI TRUY CẬP NHANH (QUICK ACCESS: 3 KHỐI TRỌNG TÂM - Matching PDF STT 2) */}
      <section className="space-y-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Lối vào nhanh
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mt-1">
            KHỐI TRUY CẬP NHANH
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            3 khối chức năng trọng tâm: Stylist cá nhân hóa, AI Try-on ảo và Khám phá di sản
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Block 1: AI Stylist */}
          <div
            onClick={() => onNavigate('stylist_wizard')}
            className="group cursor-pointer bg-gradient-to-b from-[#1b1c2b] to-[#141722] rounded-2xl border border-amber-500/40 p-7 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-950/30 transition flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:scale-110 transition">
                <Shirt className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition">
                AI Stylist
              </h3>
              <p className="text-stone-300 text-xs leading-relaxed">
                Gợi ý trang phục: Thuật toán AI phân tích bối cảnh, sự kiện và đề xuất trọn bộ outfit cổ phục kèm phụ kiện chuẩn mực.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-amber-400 group-hover:text-amber-300">
              <span>Bắt đầu thiết lập phối đồ</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Block 2: AI Try-on */}
          <div
            onClick={() => onNavigate('try_on_setup')}
            className="group cursor-pointer bg-[#141722] rounded-2xl border border-stone-800 p-7 hover:border-emerald-600/50 hover:bg-[#181c2b] transition flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-100 group-hover:text-emerald-300 transition">
                AI Try-on
              </h3>
              <p className="text-stone-400 text-xs leading-relaxed">
                Thử đồ ảo: Tải ảnh của bạn để AI mặc thử Việt phục trực quan kèm thanh trượt kéo Before / After so sánh chi tiết.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
              <span>Thử đồ trên ảnh thật</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Block 3: Khám phá di sản */}
          <div
            onClick={() => onNavigate('explore')}
            className="group cursor-pointer bg-[#141722] rounded-2xl border border-stone-800 p-7 hover:border-amber-600/50 hover:bg-[#181c2b] transition flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-100 group-hover:text-amber-300 transition">
                Khám phá
              </h3>
              <p className="text-stone-400 text-xs leading-relaxed">
                Thư viện văn hóa: Tra cứu thông tin nguồn gốc, quy chế triều đình, hoa văn ngũ hành và các lưu ý bảo tồn của từng trang phục.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-amber-400 group-hover:text-amber-300">
              <span>Mở thư viện cổ phục</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
