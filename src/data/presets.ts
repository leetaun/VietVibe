import { Occasion, StyleCategory, TryOnPresetFace, LookbookAlbum, UserProfile, HistoryItem } from '../types';

export interface OccasionOption {
  id: Occasion;
  title: string;
  subtitle: string;
  iconName: string;
  recommendedGarmentIds: string[];
}

export const OCCASIONS: OccasionOption[] = [
  {
    id: 'Tết cổ truyền',
    title: 'Tết Cổ Truyền',
    subtitle: 'Du xuân, chúc Tết, họp mặt gia đình',
    iconName: 'Sparkles',
    recommendedGarmentIds: ['ngu-than-tay-chen', 'ao-tac', 'nhat-binh']
  },
  {
    id: 'Lễ cưới hỏi',
    title: 'Lễ Cưới Hỏi',
    subtitle: 'Dạm ngõ, ăn hỏi, lễ rước dâu trang trọng',
    iconName: 'HeartHandshake',
    recommendedGarmentIds: ['nhat-binh', 'ao-tac']
  },
  {
    id: 'Kỷ yếu học sinh',
    title: 'Kỷ Yếu Học Đường',
    subtitle: 'Lễ tốt nghiệp, thanh xuân lưu niệm',
    iconName: 'GraduationCap',
    recommendedGarmentIds: ['ao-tac', 'ngu-than-tay-chen']
  },
  {
    id: 'Lễ hội / Đi chùa',
    title: 'Lễ Hội / Đi Chùa',
    subtitle: 'Chiêm bái di tích, lễ chùa cầu an, hội làng',
    iconName: 'Landmark',
    recommendedGarmentIds: ['giao-linh', 'doi-kham', 'vien-linh']
  },
  {
    id: 'Dạo phố nghệ thuật',
    title: 'Dạo Phố Nghệ Thuật',
    subtitle: 'Triển lãm, cà phê phố cổ, chụp ảnh Gen Z',
    iconName: 'Camera',
    recommendedGarmentIds: ['ngu-than-tay-chen', 'doi-kham', 'giao-linh']
  }
];

export interface StyleOption {
  id: StyleCategory;
  title: string;
  subtitle: string;
  vibe: string;
}

export const STYLES: StyleOption[] = [
  {
    id: 'Truyền thống chuẩn mực',
    title: 'Truyền Thống Chuẩn Mực',
    subtitle: 'Đúng quy chế triều đại, chuẩn lễ nghi trang trọng',
    vibe: 'Cổ kính · Trầm ổn · Chuẩn mực'
  },
  {
    id: 'Thanh lịch nhã nhặn',
    title: 'Thanh Lịch Nhã Nhặn',
    subtitle: 'Gọn gàng, tinh tế, phù hợp giao lưu hiện đại',
    vibe: 'Nho nhã · Tinh khôi · Nhẹ nhàng'
  },
  {
    id: 'Gen Z Remix',
    title: 'Gen Z Remix',
    subtitle: 'Phối màu phá cách, điểm xuyết phụ kiện đương đại',
    vibe: 'Sáng tạo · Độc bản · Thời thượng'
  },
  {
    id: 'Hiện đại / Cách tân',
    title: 'Hiện Đại / Cách Tân',
    subtitle: 'Phom dáng tân thời, năng động và linh hoạt',
    vibe: 'Tươi mới · Trẻ trung · Tiện lợi'
  },
  {
    id: 'Tối giản',
    title: 'Tối Giản (Minimalism)',
    subtitle: 'Lược bớt chi tiết cầu kỳ, tập trung vào chất liệu lụa',
    vibe: 'Tối giản · Tự nhiên · Mộc mạc'
  }
];

export interface ColorPalettePreset {
  id: string;
  name: string;
  category: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const COLOR_PALETTES: ColorPalettePreset[] = [
  {
    id: 'do-cung-dinh',
    name: 'Đỏ Trầm Cung Đình',
    category: 'Hoàng tộc',
    colors: { primary: '#9e1a1a', secondary: '#fef08a', accent: '#d4af37' }
  },
  {
    id: 'xanh-dai-duong',
    name: 'Xanh Chàm Đại Dương',
    category: 'Văn nho',
    colors: { primary: '#1e3a5f', secondary: '#ffffff', accent: '#38bdf8' }
  },
  {
    id: 'vang-hoang-gia',
    name: 'Vàng Hoàng Gia',
    category: 'Quyền quý',
    colors: { primary: '#d97706', secondary: '#fef3c7', accent: '#f59e0b' }
  },
  {
    id: 'luc-bao-co-phong',
    name: 'Xanh Lục Bảo',
    category: 'Thanh nhã',
    colors: { primary: '#15803d', secondary: '#ffffff', accent: '#86efac' }
  },
  {
    id: 'nau-dat-nung',
    name: 'Tự Nhiên / Đất Nung',
    category: 'Dân gian',
    colors: { primary: '#854d0e', secondary: '#fef9c3', accent: '#a16207' }
  },
  {
    id: 'pastel-hong-phan',
    name: 'Pastel Hồng Phấn',
    category: 'Trẻ trung',
    colors: { primary: '#db2777', secondary: '#fdf2f8', accent: '#f472b6' }
  }
];

export const PRESET_FACES: TryOnPresetFace[] = [
  {
    id: 'face-nu-1',
    name: 'Hà My (Hà Nội)',
    gender: 'Nữ',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    bodyUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'face-nam-1',
    name: 'Minh Quân (Huế)',
    gender: 'Nam',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    bodyUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'face-nu-2',
    name: 'Thanh Trúc (Sài Gòn)',
    gender: 'Nữ',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80',
    bodyUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'face-nam-2',
    name: 'Đức Anh (Hội An)',
    gender: 'Nam',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    bodyUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'user-01',
  fullName: 'Nguyễn Văn A',
  email: 'nguyenvana@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
  tierTitle: 'Người yêu di sản cấp 3',
  tierPoints: 340,
  stats: {
    outfitsCreated: 12,
    lookbooksSaved: 5,
    tryOnSessions: 8
  }
};

export const INITIAL_LOOKBOOKS: LookbookAlbum[] = [
  {
    id: 'lb-tet-2025',
    title: 'Tết Ất Tỵ 2025',
    description: 'Bộ sưu tập cổ phục du xuân đón Tết Giáp Thìn - Ất Tỵ mang sắc đỏ cát tường và xanh lam bình an.',
    occasion: 'Tết cổ truyền',
    coverImageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    outfitsCount: 3,
    createdAt: '15/01/2025',
    isPublic: true,
    outfits: [
      {
        id: 'outfit-tet-1',
        title: 'Áo Tấc Thời Nguyễn - Xanh Chàm Hoàng Gia',
        garmentId: 'ao-tac',
        garmentName: 'Áo Tấc',
        dynasty: 'Thời Nguyễn',
        imageUrl: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=600&q=80',
        colors: 'Xanh chàm + Quần lụa trắng',
        accessories: ['Khăn Đóng Nam', 'Quạt Giấy Điệp', 'Hài Nhung Thêu'],
        createdAt: '15/01/2025'
      },
      {
        id: 'outfit-tet-2',
        title: 'Áo Nhật Bình Sắc Đỏ Thắm Du Xuân',
        garmentId: 'nhat-binh',
        garmentName: 'Áo Nhật Bình',
        dynasty: 'Thời Nguyễn',
        imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
        colors: 'Đỏ thắm + Chỉ vàng hoàng kim',
        accessories: ['Mấn Hoàng Gia', 'Khánh Vàng Cung Đình', 'Quạt Lụa Thêu Sen'],
        createdAt: '18/01/2025'
      },
      {
        id: 'outfit-tet-3',
        title: 'Áo Ngũ Thân Lục Bảo Đi Lễ Đầu Năm',
        garmentId: 'ngu-than-tay-chen',
        garmentName: 'Áo Ngũ Thân Tay Chẽn',
        dynasty: 'Thời Nguyễn',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        colors: 'Xanh lục bảo + Quần trắng',
        accessories: ['Khăn Đóng Nam', 'Túi Gấm', 'Guốc Mộc'],
        createdAt: '22/01/2025'
      }
    ]
  },
  {
    id: 'lb-ky-yeu-12a',
    title: 'Kỷ Yếu Cổ Phục - 12A',
    description: 'Ảnh kỷ yếu tập thể nhóm học sinh niên khóa 2024 - 2025 trong tà Áo Tấc và Ngũ Thân trang nghiêm.',
    occasion: 'Kỷ yếu học sinh',
    coverImageUrl: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=800&q=80',
    outfitsCount: 5,
    createdAt: '10/05/2024',
    isPublic: true,
    outfits: [
      {
        id: 'outfit-ky-yeu-1',
        title: 'Áo Tấc Xanh Đại Dương Niên Khóa',
        garmentId: 'ao-tac',
        garmentName: 'Áo Tấc',
        dynasty: 'Thời Nguyễn',
        imageUrl: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=600&q=80',
        colors: 'Xanh đại dương + Quần trắng',
        accessories: ['Khăn Đóng', 'Quạt Trầm Tích'],
        createdAt: '10/05/2024'
      }
    ]
  },
  {
    id: 'lb-dao-pho-hanoi',
    title: 'Dạo Phố Thu Hà Nội',
    description: 'Phong cách dạo phố cà phê đường Phan Đình Phùng, Hoàng thành Thăng Long trong tà áo Ngũ Thân và Giao Lĩnh thanh tao.',
    occasion: 'Dạo phố nghệ thuật',
    coverImageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
    outfitsCount: 2,
    createdAt: '08/10/2024',
    isPublic: false,
    outfits: [
      {
        id: 'outfit-dao-pho-1',
        title: 'Áo Ngũ Thân Phối Túi Cói Vintage',
        garmentId: 'ngu-than-tay-chen',
        garmentName: 'Áo Ngũ Thân Tay Chẽn',
        dynasty: 'Thời Nguyễn',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        colors: 'Cam đất + Quần lụa kem',
        accessories: ['Túi Cói Dệt Thủ Công', 'Kính Tròn Vintage', 'Guốc Mộc'],
        createdAt: '08/10/2024'
      }
    ]
  },
  {
    id: 'lb-le-dam-ngo',
    title: 'Lễ Dạm Ngõ / Đám Hỏi',
    description: 'Trang phục đôi uyên ương cho ngày lành tháng tốt, gìn giữ nét đoan trang của phong tục cổ truyền.',
    occasion: 'Lễ cưới hỏi',
    coverImageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    outfitsCount: 1,
    createdAt: '02/11/2024',
    isPublic: true,
    outfits: [
      {
        id: 'outfit-cuoi-1',
        title: 'Áo Nhật Bình Cô Dâu Sắc Đỏ Hoàng Gia',
        garmentId: 'nhat-binh',
        garmentName: 'Áo Nhật Bình',
        dynasty: 'Thời Nguyễn',
        imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
        colors: 'Đỏ thắm + Quần lụa hồng phấn',
        accessories: ['Mấn Hoàng Gia', 'Khánh Vàng Cung Đình', 'Quạt Lụa Thêu Sen', 'Hài Nhung Thêu'],
        createdAt: '02/11/2024'
      }
    ]
  }
];

export const INITIAL_HISTORY: HistoryItem[] = [
  {
    id: 'hist-1',
    type: 'stylist',
    title: 'Phối đồ AI: Áo Tấc Xanh Chàm Cung Đình',
    garmentName: 'Áo Tấc (Thời Nguyễn)',
    timestamp: 'Hôm nay, 10:24',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=400&q=80',
    details: 'Bối cảnh: Kỷ yếu học sinh · Phong cách: Truyền thống chuẩn mực'
  },
  {
    id: 'hist-2',
    type: 'try_on',
    title: 'AI Try-on: Áo Nhật Bình trên ảnh cá nhân',
    garmentName: 'Áo Nhật Bình (Thời Nguyễn)',
    timestamp: 'Hôm qua, 16:45',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80',
    details: 'Kết quả thử đồ AI hoàn tất · Đã lưu vào Lookbook "Tết Ất Tỵ 2025"'
  },
  {
    id: 'hist-3',
    type: 'stylist',
    title: 'Phối đồ AI: Áo Ngũ Thân Tay Chẽn Remix',
    garmentName: 'Áo Ngũ Thân (Thời Nguyễn)',
    timestamp: '20/10/2024',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    details: 'Bối cảnh: Dạo phố nghệ thuật · Phong cách: Gen Z Remix'
  }
];
