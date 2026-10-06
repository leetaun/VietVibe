export type HistoricalPeriod = 'Lý' | 'Trần' | 'Lê' | 'Nguyễn';
export type GarmentType = 'Áo Tấc' | 'Áo Nhật Bình' | 'Áo Ngũ Thân' | 'Áo Giao Lĩnh' | 'Áo Viên Lĩnh' | 'Áo Đối Khâm' | 'Áo Dài Cổ Phục';
export type Gender = 'Nam' | 'Nữ' | 'Unisex';
export type Occasion = 'Tết cổ truyền' | 'Lễ cưới hỏi' | 'Kỷ yếu học sinh' | 'Lễ hội / Đi chùa' | 'Dạo phố nghệ thuật' | 'Lễ nghi triều đình' | 'Dân gian';
export type StyleCategory = 'Truyền thống chuẩn mực' | 'Hiện đại / Cách tân' | 'Thanh lịch nhã nhặn' | 'Gen Z Remix' | 'Tối giản';

export interface Garment {
  id: string;
  name: string;
  dynasty: HistoricalPeriod;
  dynastyLabel: string; // e.g. "Thời Nguyễn (1802 - 1945)"
  type: GarmentType;
  gender: Gender;
  rankTitle: string; // e.g. "Trang phục hậu phi, công chúa triều Nguyễn"
  imageUrl: string;
  detailImages?: string[];
  description: string;
  historyOrigin: string; // Nguồn gốc & Lịch sử
  visualFeatures: string[]; // Đặc trưng nổi bật
  patternSymbolism: string; // Ý nghĩa hoa văn
  appropriateOccasions: string[]; // Hoàn cảnh sử dụng
  culturalGuardrails: string[]; // Lưu ý văn hóa & red-flags
  tags: Occasion[];
  defaultColors: {
    primary: string;
    secondary: string;
    pants: string;
    collar: string;
  };
  recommendedAccessories: string[];
}

export interface Accessory {
  id: string;
  name: string;
  category: 'head' | 'hand' | 'neck' | 'foot' | 'custom';
  categoryLabel: string;
  imageUrl: string;
  description: string;
  culturalCompatibility: 'appropriate' | 'neutral' | 'red_flag';
  conflictNote?: string;
  suggestedAlternative?: string;
  priceEstimate?: string;
}

export interface OutfitPiece {
  garmentId: string;
  primaryColor: string;
  innerRobeColor: string;
  pantsColor: string;
  collarColor: string;
  accessories: {
    head?: Accessory;
    hand?: Accessory;
    neck?: Accessory;
    foot?: Accessory;
    custom?: Accessory;
  };
  customAccessoryImage?: string;
  customAccessoryName?: string;
}

export interface CulturalCheckResult {
  isCompatible: boolean;
  score: number; // 0 - 100
  statusText: string;
  statusType: 'success' | 'warning' | 'danger';
  issues: {
    id: string;
    title: string;
    severity: 'high' | 'medium' | 'low';
    message: string;
    violatingItem: string;
    suggestion: string;
    fixAction: () => void;
  }[];
}

export interface TryOnPresetFace {
  id: string;
  name: string;
  gender: 'Nam' | 'Nữ';
  avatarUrl: string;
  bodyUrl: string;
}

export interface TryOnResult {
  id: string;
  originalPhotoUrl: string;
  resultPhotoUrl: string;
  garmentName: string;
  dynasty: string;
  colorsSummary: string;
  accessoriesSummary: string;
  createdAt: string;
  lookbookAlbumId?: string;
}

export interface LookbookAlbum {
  id: string;
  title: string;
  description: string;
  occasion: Occasion | 'Tất cả';
  coverImageUrl: string;
  outfitsCount: number;
  outfits: {
    id: string;
    title: string;
    garmentId: string;
    garmentName: string;
    dynasty: string;
    imageUrl: string;
    colors: string;
    accessories: string[];
    createdAt: string;
  }[];
  createdAt: string;
  isPublic: boolean;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  tierTitle: string; // e.g. "Người yêu di sản cấp 3"
  tierPoints: number;
  stats: {
    outfitsCreated: number;
    lookbooksSaved: number;
    tryOnSessions: number;
  };
}

export interface HistoryItem {
  id: string;
  type: 'stylist' | 'try_on';
  title: string;
  garmentName: string;
  timestamp: string;
  thumbnailUrl: string;
  details: string;
  outfitData?: OutfitPiece;
}

export type ActiveScreen = 
  | 'home'
  | 'explore'
  | 'stylist_wizard'
  | 'outfit_builder'
  | 'try_on_setup'
  | 'try_on_result'
  | 'lookbook'
  | 'profile'
  | 'admin';
