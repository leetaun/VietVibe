import { OutfitPiece, CulturalCheckResult, Garment } from '../types';
import { ACCESSORIES } from './accessories';

export interface RuleDefinition {
  id: string;
  name: string;
  targetGarmentTypes: string[]; // e.g. ['Áo Tấc', 'Áo Nhật Bình'] or ['ALL']
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  checkConflict: (outfit: OutfitPiece, garment: Garment) => boolean;
  violatingItemName: (outfit: OutfitPiece) => string;
  suggestionText: string;
  autoFixReplacement: Partial<OutfitPiece>;
}

export const CULTURAL_RULES: RuleDefinition[] = [
  {
    id: 'rule-footwear-sneaker',
    name: 'Quy tắc Hài Guốc cho Lễ Phục Triều Đình',
    targetGarmentTypes: ['Áo Tấc', 'Áo Nhật Bình', 'Áo Viên Lĩnh'],
    severity: 'high',
    title: 'Cảnh báo lễ phục không kết hợp giày thể thao chunky',
    description: 'Áo Tấc và Nhật Bình là lễ phục cung đình trang nghiêm. Việc phối với giày sneaker thể thao hầm hố làm mất đi nét trang trọng và phá vỡ quy chuẩn thị giác lịch sử.',
    checkConflict: (outfit, garment) => {
      const isCeremonial = ['Áo Tấc', 'Áo Nhật Bình', 'Áo Viên Lĩnh'].includes(garment.type);
      return isCeremonial && outfit.accessories.foot?.id === 'sneaker-chunky';
    },
    violatingItemName: () => 'Giày Sneaker Thể Thao Chunky',
    suggestionText: 'Đề xuất thay thế bằng Hài Nhung Thêu Chỉ Vàng hoặc Guốc Mộc Quai Gấm để bảo tồn tính trang nghiêm.',
    autoFixReplacement: {
      accessories: {
        foot: ACCESSORIES.find(a => a.id === 'hai-theu')
      }
    }
  },
  {
    id: 'rule-footwear-slippers',
    name: 'Nghiêm cấm dép xỏ ngón lê khi diện Cổ Phục',
    targetGarmentTypes: ['ALL'],
    severity: 'high',
    title: 'Cảnh báo không mang dép xỏ ngón khi diện cổ phục di sản',
    description: 'Dép lê xỏ ngón là đồ dùng sinh hoạt cá nhân, không thể hiện sự tôn trọng đối với di sản trang phục dân tộc.',
    checkConflict: (outfit) => {
      return outfit.accessories.foot?.id === 'dep-xo-ngon';
    },
    violatingItemName: () => 'Dép Xỏ Ngón Lê Nhựa',
    suggestionText: 'Đề xuất thay thế bằng Guốc Mộc Quai Gấm hoặc Hài Nhung Thêu.',
    autoFixReplacement: {
      accessories: {
        foot: ACCESSORIES.find(a => a.id === 'guoc-moc')
      }
    }
  },
  {
    id: 'rule-neon-shades',
    name: 'Kính mắt thể thao phá cách xung đột với Lễ phục',
    targetGarmentTypes: ['Áo Tấc', 'Áo Nhật Bình', 'Áo Giao Lĩnh'],
    severity: 'medium',
    title: 'Cảnh báo kính mát neon phản quang phá vỡ khí chất cổ phong',
    description: 'Kính thể thao phản quang có ngôn ngữ thiết kế cyberpunk hiện đại đối kháng gắt gao với sắc thái trầm tĩnh của lụa the và hoa văn truyền thống.',
    checkConflict: (outfit, garment) => {
      const isFormal = ['Áo Tấc', 'Áo Nhật Bình', 'Áo Giao Lĩnh'].includes(garment.type);
      return isFormal && outfit.accessories.neck?.id === 'kinh-mat-neon';
    },
    violatingItemName: () => 'Kính Mát Thể Thao Neon Phản Quang',
    suggestionText: 'Nếu muốn thêm phụ kiện mắt, hãy chọn Kính Tròn Thầy Khóa Cổ Điển để tạo phong thái trí thức đầu thế kỷ 20 tao nhã.',
    autoFixReplacement: {
      accessories: {
        neck: ACCESSORIES.find(a => a.id === 'kinh-tron-vintage')
      }
    }
  },
  {
    id: 'rule-headwear-missing-tac',
    name: 'Quy chuẩn đội mũ/khăn cho Áo Tấc',
    targetGarmentTypes: ['Áo Tấc'],
    severity: 'low',
    title: 'Khuyên dùng khăn đóng hoặc mấn khi diện Áo Tấc',
    description: 'Áo Tấc theo quy định thời Nguyễn luôn đi đôi với khăn đóng chữ Nhân (cho nam) hoặc mấn/khăn vành (cho nữ) để tạo nên diện mạo chỉn chu, đúng lễ.',
    checkConflict: (outfit, garment) => {
      return garment.type === 'Áo Tấc' && !outfit.accessories.head;
    },
    violatingItemName: () => 'Chưa chọn Khăn Đóng / Mấn',
    suggestionText: 'Đề xuất bổ sung Khăn Đóng Nam hoặc Mấn Hoàng Gia để hoàn thiện bộ lễ phục trọn vẹn.',
    autoFixReplacement: {
      accessories: {
        head: ACCESSORIES.find(a => a.id === 'khan-dong-nam')
      }
    }
  }
];

export function runCulturalCompatibilityCheck(
  outfit: OutfitPiece,
  garment: Garment,
  onAutoFix?: (fixedOutfit: OutfitPiece) => void
): CulturalCheckResult {
  const issues: CulturalCheckResult['issues'] = [];

  for (const rule of CULTURAL_RULES) {
    if (rule.checkConflict(outfit, garment)) {
      issues.push({
        id: rule.id,
        title: rule.title,
        severity: rule.severity,
        message: rule.description,
        violatingItem: rule.violatingItemName(outfit),
        suggestion: rule.suggestionText,
        fixAction: () => {
          if (onAutoFix) {
            const updated = {
              ...outfit,
              accessories: {
                ...outfit.accessories,
                ...(rule.autoFixReplacement.accessories || {})
              }
            };
            onAutoFix(updated);
          }
        }
      });
    }
  }

  if (issues.length === 0) {
    return {
      isCompatible: true,
      score: 100,
      statusText: 'PHÙ HỢP CHUẨN MỰC LỊCH SỬ & VĂN HÓA',
      statusType: 'success',
      issues: []
    };
  }

  const hasHigh = issues.some(i => i.severity === 'high');
  const score = Math.max(40, 100 - issues.length * 25);

  return {
    isCompatible: false,
    score,
    statusText: hasHigh ? 'CẢNH BÁO: CHƯA PHÙ HỢP QUY CHUẨN LỊCH SỬ' : 'LƯU Ý CÂN NHẮC VĂN HÓA',
    statusType: hasHigh ? 'danger' : 'warning',
    issues
  };
}
