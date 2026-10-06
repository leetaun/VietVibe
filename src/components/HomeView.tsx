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
    <div className="space-y-16 pb-20">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#12141c] via-[#1a141c] to-[#14121a] border border-amber-900/30 p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none">
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
            KHÁM PHÁ DI SẢN <br />
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
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-950/50 transition cursor-pointer"
            >
              <Shirt className="w-4 h-4 text-stone-950" />
              <span>BẮT ĐẦU PHỐI ĐỒ</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </button>

            <button
              onClick={() => onNavigate('explore')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700/70 text-sm font-semibold transition cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Khám phá ngay</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="pt-6 border-t border-stone-800/80 grid grid-cols-3 gap-4 text-left">
            <div>
              <div className="font-serif text-xl font-bold text-amber-300">6+</div>
              <div className="text-xs text-stone-400">Dòng Việt phục chuẩn</div>
            </div>
            <div>
              <div className="font-serif text-xl font-bold text-amber-300">100%</div>
              <div className="text-xs text-stone-400">Kiểm chuẩn văn hóa</div>
            </div>
            <div>
              <div className="font-serif text-xl font-bold text-amber-300">AI Try-On</div>
              <div className="text-xs text-stone-400">Ướm đồ trực tiếp</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VIỆT PHỤC TIÊU BIỂU (FEATURED CAROUSEL / SLIDER) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <Award className="w-4 h-4" />
              <span>Di Sản Tiêu Biểu</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mt-1">
              Việt Phục Tiêu Biểu
            </h2>
            <p className="text-stone-400 text-sm mt-1">
              Tuyển tập những phục trang tinh hoa của các triều đại Lý, Trần, Lê, Nguyễn
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300 transition"
          >
            <span>Xem tất cả</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal scroll cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {garments.slice(0, 4).map((garment) => (
            <div
              key={garment.id}
              className="group relative bg-[#151824] rounded-2xl border border-stone-800/80 overflow-hidden hover:border-amber-600/50 hover:shadow-xl hover:shadow-amber-950/20 transition flex flex-col"
            >
              {/* Image Thumbnail with Dynasty Badge */}
              <div className="relative h-64 overflow-hidden bg-stone-900">
                <img
                  src={garment.imageUrl}
                  alt={garment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151824] via-transparent to-black/30" />
                
                {/* Dynasty tag */}
                <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded bg-stone-950/80 backdrop-blur-sm text-amber-300 border border-amber-500/30">
                  {garment.dynastyLabel.split('(')[0].trim()}
                </span>

                <span className="absolute top-3 right-3 text-[11px] font-medium px-2 py-0.5 rounded bg-black/60 text-stone-300 backdrop-blur-sm">
                  {garment.gender}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition">
                    {garment.name}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium line-clamp-1 mt-0.5">
                    {garment.rankTitle}
                  </p>
                  <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                    {garment.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onSelectGarmentDetail(garment)}
                    className="flex-1 py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white text-xs font-semibold border border-stone-700/80 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Thẻ văn hóa</span>
                  </button>
                  <button
                    onClick={() => onStartStylistWithGarment(garment)}
                    className="py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition flex items-center justify-center cursor-pointer"
                    title="Phối đồ ngay với trang phục này"
                  >
                    <Shirt className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LỐI VÀO NHANH (QUICK ACCESS: 3 KHỐI CHỨC NĂNG TRỌNG TÂM) */}
      <section className="space-y-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Khám phá tính năng
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mt-1">
            Khối Truy Cập Nhanh
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Ba trải nghiệm trọng tâm dành cho bạn từ tiếp cận di sản tới ứng dụng thực tế
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Khám phá di sản */}
          <div
            onClick={() => onNavigate('explore')}
            className="group cursor-pointer bg-[#151824] rounded-2xl border border-stone-800/80 p-7 hover:border-amber-600/50 hover:bg-[#191c2b] transition flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-100 group-hover:text-amber-300 transition">
                Khám Phá Di Sản
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Thư viện tra cứu nguồn gốc lịch sử, ý nghĩa hoa văn ngũ hành và quy chế triều đình của từng loại cổ phục Việt Nam.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-amber-400 group-hover:text-amber-300">
              <span>Mở thư viện phục trang</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 2: AI Stylist cá nhân hóa */}
          <div
            onClick={() => onNavigate('stylist_wizard')}
            className="group cursor-pointer bg-gradient-to-b from-[#1b1c2b] to-[#151824] rounded-2xl border border-amber-500/30 p-7 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-950/30 transition flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
              Khuyên dùng
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:scale-110 transition">
                <Shirt className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition">
                AI Stylist Phối Đồ
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                Hệ thống AI đề xuất outfit trọn gói (áo, quần, mấn, hài, phụ kiện) theo sự kiện, phong cách truyền thống hay Gen Z Remix.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-amber-400 group-hover:text-amber-300">
              <span>Bắt đầu thiết lập phối đồ</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 3: AI Try-On ảo */}
          <div
            onClick={() => onNavigate('try_on_setup')}
            className="group cursor-pointer bg-[#151824] rounded-2xl border border-stone-800/80 p-7 hover:border-emerald-600/50 hover:bg-[#191c2b] transition flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-100 group-hover:text-emerald-300 transition">
                AI Virtual Try-On
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Tải ảnh cá nhân hoặc chọn ảnh mẫu, AI sẽ ghép bộ Việt phục và phụ kiện chân thực cùng thanh trượt so sánh Before/After.
              </p>
            </div>
            <div className="flex items-center text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              <span>Thử đồ trên ảnh thật</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
