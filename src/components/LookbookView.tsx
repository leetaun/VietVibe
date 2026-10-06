import React, { useState } from 'react';
import { LookbookAlbum, Occasion } from '../types';
import {
  Bookmark,
  Plus,
  Search,
  Filter,
  Share2,
  Trash2,
  Edit2,
  FolderOpen,
  Lock,
  Globe,
  X,
  Copy,
  Check,
  Shirt,
  Calendar
} from 'lucide-react';

interface LookbookViewProps {
  lookbooks: LookbookAlbum[];
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onCreateAlbum: (title: string, description: string, occasion: Occasion) => void;
  onDeleteAlbum: (id: string) => void;
}

export const LookbookView: React.FC<LookbookViewProps> = ({
  lookbooks,
  isLoggedIn,
  onOpenLogin,
  onCreateAlbum,
  onDeleteAlbum
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOccasionFilter, setSelectedOccasionFilter] = useState<string>('all');
  const [activeAlbum, setActiveAlbum] = useState<LookbookAlbum | null>(null);
  const [isCreatingModalOpen, setIsCreatingModalOpen] = useState(false);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [newAlbumDesc, setNewAlbumDesc] = useState('');
  const [newAlbumOccasion, setNewAlbumOccasion] = useState<Occasion>('Tết cổ truyền');
  const [copyFeedback, setCopyFeedback] = useState(false);

  const filteredAlbums = lookbooks.filter((album) => {
    const matchesSearch =
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOccasion =
      selectedOccasionFilter === 'all' || album.occasion === selectedOccasionFilter;
    return matchesSearch && matchesOccasion;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumTitle.trim()) return;
    onCreateAlbum(newAlbumTitle, newAlbumDesc, newAlbumOccasion);
    setNewAlbumTitle('');
    setNewAlbumDesc('');
    setIsCreatingModalOpen(false);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header Info & Create Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 uppercase tracking-wide">
            LOOKBOOK CỦA TÔI
          </h1>
          <p className="text-stone-400 text-xs mt-1">
            Quản lý và chia sẻ các album bản phối Việt phục theo từng sự kiện và chủ đề
          </p>
        </div>

        <button
          onClick={() => {
            if (!isLoggedIn) {
              onOpenLogin();
            } else {
              setIsCreatingModalOpen(true);
            }
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs tracking-wide shadow-md shadow-amber-950/40 transition cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-stone-950 stroke-[3]" />
          <span>TẠO LOOKBOOK MỚI</span>
        </button>
      </div>

      {/* Guest Notice if not logged in */}
      {!isLoggedIn && (
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-600/30 flex items-center justify-between gap-4 text-xs">
          <div className="text-amber-200">
            Bạn đang xem Lookbook với tư cách <span className="font-bold">Khách (Guest)</span>. Đăng nhập để tạo thêm album cá nhân và đồng bộ mọi thiết kế.
          </div>
          <button
            onClick={onOpenLogin}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition shrink-0"
          >
            Đăng nhập ngay
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="space-y-4 bg-[#141722] p-5 rounded-2xl border border-stone-800 shadow-md">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm album lookbook..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#0e1017] border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['all', 'Tết cổ truyền', 'Kỷ yếu học sinh', 'Lễ cưới hỏi', 'Dạo phố nghệ thuật'].map(
              (occ) => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasionFilter(occ)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition border ${
                    selectedOccasionFilter === occ
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-semibold'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  {occ === 'all' ? 'Tất cả' : occ}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Lookbook Album Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAlbums.map((album) => (
          <div
            key={album.id}
            className="group bg-[#151824] rounded-2xl border border-stone-800 overflow-hidden hover:border-amber-600/50 hover:shadow-xl hover:shadow-amber-950/20 transition flex flex-col justify-between"
          >
            {/* Cover Image */}
            <div className="relative h-60 overflow-hidden bg-stone-900">
              <img
                src={album.coverImageUrl}
                alt={album.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151824] via-transparent to-black/30" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-black/75 backdrop-blur-md text-amber-300 border border-amber-500/30">
                  {album.occasion}
                </span>
              </div>

              <div className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-stone-300">
                {album.outfitsCount} bộ phối
              </div>
            </div>

            {/* Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-100 group-hover:text-amber-200 transition">
                  {album.title}
                </h3>
                <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                  {album.description}
                </p>
                <div className="flex items-center gap-2 mt-3 text-[11px] text-stone-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Ngày tạo: {album.createdAt}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-stone-800 flex items-center gap-2">
                <button
                  onClick={() => setActiveAlbum(album)}
                  className="flex-1 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white text-xs font-semibold border border-stone-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Xem album</span>
                </button>

                <button
                  onClick={handleCopyShareLink}
                  title="Chia sẻ link Lookbook"
                  className="py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white text-xs font-semibold border border-stone-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Chia sẻ</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Album Detail Modal */}
      {activeAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#141722] rounded-2xl border border-stone-700 p-6 sm:p-8 space-y-6 my-auto max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setActiveAlbum(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Album Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  {activeAlbum.occasion} · {activeAlbum.outfitsCount} bộ phối
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mt-1">
                  {activeAlbum.title}
                </h2>
                <p className="text-xs text-stone-400 mt-1">{activeAlbum.description}</p>
              </div>

              <button
                onClick={handleCopyShareLink}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{copyFeedback ? 'Đã sao chép link!' : 'Chia sẻ công khai'}</span>
              </button>
            </div>

            {/* Outfits in Album */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                Các bộ phối trong Album:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeAlbum.outfits.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-3"
                  >
                    <div className="relative h-44 rounded-lg overflow-hidden bg-black">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded bg-black/80 text-amber-300">
                        {item.dynasty}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-100">{item.title}</h4>
                      <p className="text-[11px] text-amber-400/90 font-medium">{item.colors}</p>
                      <div className="text-[10px] text-stone-400 mt-1 truncate">
                        Phụ kiện: {item.accessories.join(', ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setActiveAlbum(null)}
                className="px-5 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Album Modal */}
      {isCreatingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#141722] rounded-2xl border border-stone-700 p-6 max-w-md w-full space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-serif text-xl font-bold text-stone-100">Tạo Lookbook Mới</h3>
              <button
                onClick={() => setIsCreatingModalOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Tên Lookbook
                </label>
                <input
                  type="text"
                  required
                  value={newAlbumTitle}
                  onChange={(e) => setNewAlbumTitle(e.target.value)}
                  placeholder="Ví dụ: Lễ Hội Đền Hùng 2025..."
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Chủ đề / Dịp lễ
                </label>
                <select
                  value={newAlbumOccasion}
                  onChange={(e) => setNewAlbumOccasion(e.target.value as Occasion)}
                  className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="Tết cổ truyền">Tết cổ truyền</option>
                  <option value="Lễ cưới hỏi">Lễ cưới hỏi</option>
                  <option value="Kỷ yếu học sinh">Kỷ yếu học sinh</option>
                  <option value="Lễ hội / Đi chùa">Lễ hội / Đi chùa</option>
                  <option value="Dạo phố nghệ thuật">Dạo phố nghệ thuật</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Mô tả ngắn
                </label>
                <textarea
                  rows={3}
                  value={newAlbumDesc}
                  onChange={(e) => setNewAlbumDesc(e.target.value)}
                  placeholder="Mô tả ý tưởng hoặc bối cảnh của album..."
                  className="w-full px-3.5 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-400 text-xs font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition"
                >
                  Tạo Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
