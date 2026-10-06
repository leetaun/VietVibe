import React, { useState } from 'react';
import { Garment } from '../types';
import { CULTURAL_RULES } from '../data/culturalRules';
import {
  ShieldCheck,
  Package,
  Trash2,
  RotateCcw,
  Plus,
  Eye,
  EyeOff,
  AlertTriangle,
  Users,
  Shirt,
  Sparkles,
  BarChart3,
  X
} from 'lucide-react';

interface AdminViewProps {
  garments: Garment[];
  onAddGarment: (garment: Garment) => void;
  onDeleteGarment: (id: string) => void;
  onRestoreGarment: (garment: Garment) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  garments,
  onAddGarment,
  onDeleteGarment,
  onRestoreGarment
}) => {
  const [activeTab, setActiveTab] = useState<'garments' | 'rules' | 'trash'>('garments');
  const [trashList, setTrashList] = useState<Garment[]>([]);
  const [undoToast, setUndoToast] = useState<{ garment: Garment; timer: any } | null>(null);

  const handleSoftDelete = (garment: Garment) => {
    // Soft delete
    onDeleteGarment(garment.id);
    setTrashList(prev => [garment, ...prev]);

    // Show 5s Undo Toast as specified in PDF
    if (undoToast?.timer) clearTimeout(undoToast.timer);

    const timer = setTimeout(() => {
      setUndoToast(null);
    }, 5000);

    setUndoToast({ garment, timer });
  };

  const handleUndo = () => {
    if (!undoToast) return;
    if (undoToast.timer) clearTimeout(undoToast.timer);
    onRestoreGarment(undoToast.garment);
    setTrashList(prev => prev.filter(g => g.id !== undoToast.garment.id));
    setUndoToast(null);
  };

  const handleRestoreFromTrash = (garment: Garment) => {
    onRestoreGarment(garment);
    setTrashList(prev => prev.filter(g => g.id !== garment.id));
  };

  return (
    <div className="space-y-8 pb-20">
      {/* 5s Undo Toast */}
      {undoToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e2230] border border-amber-500/60 p-4 rounded-xl shadow-2xl flex items-center gap-4 text-xs animate-bounce">
          <div className="text-stone-200">
            Đã xóa <span className="font-bold text-amber-300">{undoToast.garment.name}</span> (Chuyển vào Thùng rác)
          </div>
          <button
            onClick={handleUndo}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Hoàn tác (5s)</span>
          </button>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-red-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span>Khu Vực Quản Trị Hệ Thống (Admin Panel)</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-100 mt-1">
            Bảng Quản Trị Dữ Liệu
          </h1>
          <p className="text-stone-400 text-xs mt-1">
            Quản lý kho phục trang, thùng rác khôi phục và quy tắc AI Cultural Guardrail
          </p>
        </div>

        {/* Overview Stats */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center">
            <div className="font-serif text-lg font-bold text-amber-300">{garments.length}</div>
            <div className="text-[10px] text-stone-400">Việt phục hoạt động</div>
          </div>
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center">
            <div className="font-serif text-lg font-bold text-emerald-400">{CULTURAL_RULES.length}</div>
            <div className="text-[10px] text-stone-400">Quy tắc Guardrail</div>
          </div>
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center">
            <div className="font-serif text-lg font-bold text-red-400">{trashList.length}</div>
            <div className="text-[10px] text-stone-400">Thùng rác</div>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-stone-800 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('garments')}
          className={`pb-3 transition cursor-pointer border-b-2 ${
            activeTab === 'garments'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-stone-400 hover:text-white'
          }`}
        >
          Quản lý Việt phục ({garments.length})
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`pb-3 transition cursor-pointer border-b-2 ${
            activeTab === 'rules'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-stone-400 hover:text-white'
          }`}
        >
          Quy tắc Văn hóa Cultural Guardrail ({CULTURAL_RULES.length})
        </button>

        <button
          onClick={() => setActiveTab('trash')}
          className={`pb-3 transition cursor-pointer border-b-2 ${
            activeTab === 'trash'
              ? 'border-red-400 text-red-300'
              : 'border-transparent text-stone-400 hover:text-white'
          }`}
        >
          Thùng rác & Khôi phục ({trashList.length})
        </button>
      </div>

      {/* TAB 1: GARMENTS TABLE */}
      {activeTab === 'garments' && (
        <div className="bg-[#141722] rounded-2xl border border-stone-800 overflow-hidden shadow-xl">
          <div className="p-4 border-b border-stone-800 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-200">Danh mục phục trang đang hiển thị</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-900/80 text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-800">
                <tr>
                  <th className="py-3 px-4">Tên & Phẩm trật</th>
                  <th className="py-3 px-4">Thời kỳ</th>
                  <th className="py-3 px-4">Kiểu dáng</th>
                  <th className="py-3 px-4">Giới tính</th>
                  <th className="py-3 px-4 text-right">Thao tác (Xóa mềm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 text-stone-300">
                {garments.map((g) => (
                  <tr key={g.id} className="hover:bg-stone-900/40 transition">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={g.imageUrl}
                        alt={g.name}
                        className="w-10 h-10 rounded-lg object-cover border border-stone-700"
                      />
                      <div>
                        <div className="font-serif font-bold text-amber-100">{g.name}</div>
                        <div className="text-[10px] text-stone-400 truncate max-w-xs">{g.rankTitle}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-amber-300">{g.dynasty}</td>
                    <td className="py-3 px-4">{g.type}</td>
                    <td className="py-3 px-4">{g.gender}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleSoftDelete(g)}
                        title="Xóa mềm (Có thể hoàn tác trong 5s hoặc vào Thùng rác)"
                        className="p-1.5 rounded-lg bg-stone-900 hover:bg-red-950/60 text-stone-400 hover:text-red-300 border border-stone-700 hover:border-red-600/50 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: RULES TABLE */}
      {activeTab === 'rules' && (
        <div className="bg-[#141722] rounded-2xl border border-stone-800 overflow-hidden shadow-xl p-5 space-y-4">
          <div className="text-xs text-stone-400">
            Quy tắc kiểm tra tự động cảnh báo Red-flag khi người dùng phối phụ kiện xung đột:
          </div>
          <div className="space-y-3">
            {CULTURAL_RULES.map((rule) => (
              <div
                key={rule.id}
                className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-amber-300">{rule.name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-800">
                    Mức độ: {rule.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-stone-300 font-light">{rule.description}</p>
                <div className="p-2.5 rounded-lg bg-black/40 text-[11px] text-amber-400/90 font-light">
                  <span className="font-semibold text-amber-300">Gợi ý AI 1-touch:</span> {rule.suggestionText}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TRASH & RECOVERY */}
      {activeTab === 'trash' && (
        <div className="bg-[#141722] rounded-2xl border border-stone-800 p-6 space-y-4 shadow-xl">
          <div className="text-xs text-stone-400">
            Nơi lưu trữ tạm thời các bộ Việt phục đã xóa. Bạn có thể nhấn Hoàn tác để khôi phục:
          </div>

          {trashList.length === 0 ? (
            <div className="text-center py-10 text-xs text-stone-500">
              Thùng rác hiện đang trống.
            </div>
          ) : (
            <div className="space-y-2.5">
              {trashList.map((g) => (
                <div
                  key={g.id}
                  className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={g.imageUrl}
                      alt={g.name}
                      className="w-9 h-9 rounded object-cover opacity-60"
                    />
                    <div>
                      <span className="font-bold text-stone-300 line-through">{g.name}</span>
                      <div className="text-[10px] text-stone-500">{g.dynastyLabel}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRestoreFromTrash(g)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 transition flex items-center gap-1.5 cursor-pointer text-xs font-semibold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Khôi phục</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
