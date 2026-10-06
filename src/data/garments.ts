import { Garment } from '../types';

export const INITIAL_GARMENTS: Garment[] = [
  {
    id: 'nhat-binh',
    name: 'Áo Nhật Bình',
    dynasty: 'Nguyễn',
    dynastyLabel: 'Thời Nguyễn (1802 - 1945)',
    type: 'Áo Nhật Bình',
    gender: 'Nữ',
    rankTitle: 'Trang phục hậu phi, công chúa triều Nguyễn',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=900&q=80',
    detailImages: [
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Áo Nhật Bình là thường triều phục tôn quý bậc nhất của phụ nữ hoàng tộc nhà Nguyễn, nổi bật với hoa văn ngũ hành ở tay áo và cổ áo hình chữ nhật.',
    historyOrigin: 'Xuất xứ từ kiểu áo Phi Phong thời Minh, được định chế thành thường triều phục chính thức cho hoàng hậu, hoàng thái hậu, công chúa và cung giai từ năm Gia Long thứ 6 (1807). Màu sắc của áo quy định nghiêm ngặt theo phẩm trật: Hoàng hậu sắc vàng chính sắc, Công chúa sắc đỏ, Cung tần nhị phẩm sắc xích đào, tam phẩm sắc tím, tứ phẩm sắc xanh lam.',
    visualFeatures: [
      'Cổ áo khoét hình chữ nhật lớn (nhật bình) đặc trưng, viền thêu dải hoa văn kim tuyến lộng lẫy',
      'Hai dải vạt áo thả thẳng song song trước ngực, gắn 2 dải hoa lệ thắt nút tinh xảo',
      'Cổ tay áo viền ngũ sắc tượng trưng cho ngũ hành tương sinh (Kim - Mộc - Thủy - Hỏa - Thổ)',
      'Hoa văn thêu loan phụng, đoàn hoa mẫu đơn, chữ Thọ và sóng nước thủy ba'
    ],
    patternSymbolism: 'Phượng hoàng và mẫu đơn thể hiện quyền quý tối thượng, đức hạnh của bậc mẫu nghi thiên hạ. Dải ngũ sắc mang ý nghĩa cầu chúc vũ trụ thái hòa, âm dương cân xứng và phúc lộc trường cửu.',
    appropriateOccasions: [
      'Đại lễ cung đình xưa, lễ triều hạ',
      'Lễ thành hôn truyền thống, lễ cưới hỏi long trọng',
      'Chụp ảnh di sản nghệ thuật, lễ hội văn hóa Việt Nam'
    ],
    culturalGuardrails: [
      'Tránh mặc sai vạt hoặc để cổ áo trễ xộc xệch làm mất dáng vẻ đoan trang',
      'Không phối với váy ngắn hiện đại, quần tất ren hay giày thể thao',
      'Nên kết hợp cùng mấn nhung thêu chỉ vàng hoặc khăn vành dây quấn nhiều vòng truyền thống',
      'Lễ cưới cô dâu thường chọn màu đỏ thắm phối cùng quần lụa trắng hoặc hồng nhạt'
    ],
    tags: ['Lễ nghi triều đình', 'Lễ cưới hỏi', 'Lễ hội / Đi chùa'],
    defaultColors: {
      primary: '#9e1a1a', // Đỏ thắm công chúa
      secondary: '#d4af37', // Chỉ vàng hoàng kim
      pants: '#fbfbfb', // Quần lụa trắng tinh
      collar: '#2563eb' // Viền hoa lệ
    },
    recommendedAccessories: ['man-hoang-gia', 'quat-giay-diep', 'khanh-vang', 'guoc-moc']
  },
  {
    id: 'ao-tac',
    name: 'Áo Tấc',
    dynasty: 'Nguyễn',
    dynastyLabel: 'Thời Nguyễn (1802 - 1945)',
    type: 'Áo Tấc',
    gender: 'Unisex',
    rankTitle: 'Lễ phục trang trọng bậc nhất thời Nguyễn',
    imageUrl: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=900&q=80',
    detailImages: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Áo Tấc (áo ngũ thân tay thụng) là lễ phục truyền thống có tay rộng một tấc, biểu trưng cho sự khiêm cung, lễ nghĩa và tôn nghiêm trong nghi lễ Đại Nam.',
    historyOrigin: 'Được quy chuẩn rộng khắp dưới triều vua Minh Mạng khi ban bố sắc lệnh thống nhất y phục toàn quốc năm 1836. Áo Tấc được dùng cho mọi tầng lớp từ vua, quan lại tới thứ dân trong các dịp lễ tiết quan trọng, chỉ khác nhau ở chất liệu gấm vóc, lụa the và hoa văn thêu.',
    visualFeatures: [
      'Thân áo ngũ thân (5 thân tượng trưng tứ thân phụ mẫu và chính bản thân người mặc)',
      'Tay áo thụng dài và rộng quá cổ tay đúng 1 tấc khi buông thõng',
      'Cổ đứng cài khuy bên phải (thường cài 5 cúc bằng ngọc, vàng, bạc hoặc gỗ quý)',
      'Vạt áo dài quá đầu gối tạo dáng đi uyển chuyển, trầm ổn'
    ],
    patternSymbolism: 'Năm chiếc khuy tượng trưng cho ngũ thường: Nhân - Lễ - Nghĩa - Trí - Tín. Năm thân áo nhắc nhở đạo hiếu tử, sự hòa hợp gia đình và gìn giữ phong thái đĩnh đạc.',
    appropriateOccasions: [
      'Lễ tế tự, giỗ chạp tổ tiên, lễ cầu an đầu năm',
      'Lễ cưới truyền thống (cho cả chú rể và quan viên hai họ)',
      'Lễ tốt nghiệp, chụp kỷ yếu học sinh sinh viên trang trọng',
      'Tham quan di tích cố đô Huế, Văn Miếu, Hoàng thành'
    ],
    culturalGuardrails: [
      'Áo Tấc là lễ phục, tuyệt đối KHÔNG xắn tay áo lên gồ ghề',
      'Khi chắp tay hành lễ, hai tay phải thu gọn trong ống tay áo thụng',
      'Không phối cùng giày sneaker thể thao hầm hố hoặc kính mát phản quang',
      'Bắt buộc đội khăn đóng (khăn xếp) đen hoặc mấn màu tương hợp'
    ],
    tags: ['Lễ cưới hỏi', 'Kỷ yếu học sinh', 'Tết cổ truyền', 'Lễ nghi triều đình'],
    defaultColors: {
      primary: '#1e3a5f', // Xanh chàm thẫm sang trọng
      secondary: '#c59b27', // Cúc đồng ánh kim
      pants: '#ffffff', // Quần lụa trắng
      collar: '#1e3a5f'
    },
    recommendedAccessories: ['khan-dong-nam', 'quat-giay-diep', 'chuoi-ngoc-bich', 'hai-theu']
  },
  {
    id: 'ngu-than-tay-chen',
    name: 'Áo Ngũ Thân Tay Chẽn',
    dynasty: 'Nguyễn',
    dynastyLabel: 'Thời Nguyễn (1802 - 1945)',
    type: 'Áo Ngũ Thân',
    gender: 'Unisex',
    rankTitle: 'Thường phục thanh lịch, tiền thân Áo Dài hiện đại',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    description: 'Áo Ngũ Thân tay chẽn là biểu tượng của nếp sống nhã nhặn, gọn gàng, phù hợp dạo phố, hội ngộ và sinh hoạt thường nhật thời xưa lẫn nay.',
    historyOrigin: 'Được định hình từ thời Võ Vương Nguyễn Phúc Khoát (1744) và hoàn thiện quy chuẩn thời Minh Mạng. Tay áo được may chẽn sát từ khuỷu tay xuống cổ tay giúp cử động thuận tiện, vạt áo xẻ tà phóng khoáng.',
    visualFeatures: [
      'Năm thân áo cắt may tinh xảo ôm nhẹ vóc dáng nhưng vẫn giữ nếp kín đáo',
      'Cổ áo đứng vuông vắn, cài khuy bên nách phải',
      'Tay áo thon gọn (tay chẽn) tạo cảm giác năng động, trẻ trung',
      'Thường may bằng the, lụa Hà Đông, gấm hoặc đũi tự nhiên'
    ],
    patternSymbolism: 'Đại diện cho vẻ đẹp khiêm nhường, phong nhã của trí thức và thị dân Việt Nam. Vạt con bên trong che chở tâm can, thể hiện sự kín đáo trong lối ứng xử.',
    appropriateOccasions: [
      'Dạo phố Tết Nguyên Đán, du xuân ngắm hoa',
      'Đi làm, dự tiệc văn hóa, triển lãm nghệ thuật',
      'Chụp ảnh kỷ yếu học đường, dạo phố cổ Hà Nội / Hội An'
    ],
    culturalGuardrails: [
      'Rất thích hợp cho phong cách Gen Z Remix (kết hợp túi cói, kính gọng cổ điển, giày da oxford)',
      'Không nên mặc áo quá chật làm căng đường chỉ khuy áo',
      'Cần mặc kèm áo lót trong màu trắng để bảo đảm sự đoan trang truyền thống'
    ],
    tags: ['Tết cổ truyền', 'Dạo phố nghệ thuật', 'Kỷ yếu học sinh'],
    defaultColors: {
      primary: '#1b6354', // Xanh lục bảo
      secondary: '#ffffff', // Áo lót trắng
      pants: '#ffffff',
      collar: '#1b6354'
    },
    recommendedAccessories: ['khan-dong-nam', 'man-nu-cach-tan', 'tui-gam', 'guoc-moc']
  },
  {
    id: 'giao-linh',
    name: 'Áo Giao Lĩnh',
    dynasty: 'Lê',
    dynastyLabel: 'Thời Lê (1428 - 1789)',
    type: 'Áo Giao Lĩnh',
    gender: 'Unisex',
    rankTitle: 'Trang phục cổ vạt chéo tiêu biểu thời Lê - Trần',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=900&q=80',
    description: 'Áo Giao Lĩnh với vạt áo vắt chéo thanh thoát, thể hiện khí chất tao nhã và bề dày lịch sử ngàn năm văn hiến của Đại Việt.',
    historyOrigin: 'Là một trong những dạng cổ phục lâu đời nhất tại Việt Nam, thịnh hành từ thời Lý, Trần sang thời Lê sơ và Lê Trung Hưng. Cổ áo vắt chéo sang bên phải, thắt dải bao sái ở eo, thường xuất hiện trong các bức tranh chân dung danh nhân thời xưa.',
    visualFeatures: [
      'Cổ áo vắt chéo (giao lĩnh) tạo hình chữ V khoáng đạt trước ngực',
      'Ống tay rộng vừa phải hoặc thụng thanh thoát',
      'Dải thắt lưng vải mềm mại buộc nơ rủ xuống vạt trước',
      'Chất liệu tơ tằm mềm rủ mộc mạc hoặc dệt hoa văn hình mây sóng Đại Việt'
    ],
    patternSymbolism: 'Khí chất quân tử thanh cao, sự hài hòa giữa con người và thiên nhiên đất trời.',
    appropriateOccasions: [
      'Lễ hội truyền thống dân gian, phục dựng lịch sử Đại Việt',
      'Tham quan chùa cổ, thiền viện, không gian trà đạo',
      'Biểu diễn nghệ thuật cổ nhạc, ngâm thơ'
    ],
    culturalGuardrails: [
      'Quy tắc cổ áo: vạt trái phải phủ lên trên vạt phải (tả nhậm), không mặc ngược',
      'Không kết hợp với thắt lưng da kim loại hiện đại thô cứng'
    ],
    tags: ['Dân gian', 'Lễ hội / Đi chùa', 'Dạo phố nghệ thuật'],
    defaultColors: {
      primary: '#7a3e26', // Nâu đất nung / Cam trầm
      secondary: '#f3ece2',
      pants: '#f3ece2',
      collar: '#7a3e26'
    },
    recommendedAccessories: ['non-quai-thao', 'quat-giay-diep', 'guoc-moc']
  },
  {
    id: 'vien-linh',
    name: 'Áo Viên Lĩnh (Cổ Tròn)',
    dynasty: 'Lê',
    dynastyLabel: 'Thời Lý - Trần - Lê',
    type: 'Áo Viên Lĩnh',
    gender: 'Nam',
    rankTitle: 'Phẩm phục quan chức và quý tộc Đại Việt',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
    description: 'Áo Viên Lĩnh cổ tròn mang dáng dấp uy phong, từng là quan phục và thường phục cao cấp của các triều đại Lý, Trần, Lê.',
    historyOrigin: 'Áo cổ tròn khép kín gài cúc bên vai phải, ngực thường có bổ tử thêu linh thú hoặc chim muông phân định phẩm hàm quan văn, quan võ trong triều đình Đại Việt.',
    visualFeatures: [
      'Cổ tròn khép kín ôm sát chân cổ, gài nút bên bờ vai phải',
      'Dáng áo thụng quyền uy, buông dài ngang bắp chân',
      'Tay áo rộng thể hiện phong thái đĩnh đạc của bậc trượng phu'
    ],
    patternSymbolism: 'Vòng cổ tròn tượng trưng cho vòm trời (Thiên viên địa phương), sự viên mãn và quyền uy phụng sự sơn hà.',
    appropriateOccasions: [
      'Lễ hội di sản văn hóa, sân khấu hóa lịch sử',
      'Nghi lễ tế tự đình làng cổ',
      'Sự kiện giao lưu văn hóa quốc tế'
    ],
    culturalGuardrails: [
      'Không dùng bổ tử rồng 5 móng (dành riêng cho Hoàng đế)',
      'Phải mặc trang nghiêm, kết hợp đai lưng và mũ ô sa hoặc khăn đóng'
    ],
    tags: ['Lễ nghi triều đình', 'Lễ hội / Đi chùa'],
    defaultColors: {
      primary: '#6b21a8', // Tím hoa cà quý tộc
      secondary: '#e5b842',
      pants: '#ffffff',
      collar: '#6b21a8'
    },
    recommendedAccessories: ['khan-dong-nam', 'khanh-vang', 'hai-theu']
  },
  {
    id: 'doi-kham',
    name: 'Áo Đối Khâm',
    dynasty: 'Trần',
    dynastyLabel: 'Thời Lý - Trần (1009 - 1400)',
    type: 'Áo Đối Khâm',
    gender: 'Nữ',
    rankTitle: 'Khoác áo song song thanh nhã quý phái',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
    description: 'Áo Đối Khâm có hai vạt song song buông rủ tha thướt, để lộ lớp yếm lụa duyên dáng bên trong, toát lên vẻ đẹp thuần khiết Á Đông.',
    historyOrigin: 'Thịnh hành trong tầng lớp quý tộc phụ nữ thời Lý - Trần và Lê Trung Hưng. Mặc khoác ngoài váy yếm, tạo nên tổng thể nhiều lớp vải thướt tha, bay bổng theo từng bước đi.',
    visualFeatures: [
      'Hai thân áo trước buông thẳng song song, không cài khuy che kín ngực',
      'Để lộ vạt yếm thêu hoa văn sen cúc hoặc hoa dây tinh tế bên trong',
      'Tay áo buông rộng mềm mại, tà áo thướt tha',
      'Kết hợp dải lụa thắt eo buông dài tạo điểm nhấn uyển chuyển'
    ],
    patternSymbolism: 'Hoa sen và hoa cúc biểu trưng cho sự thanh tịnh, trường thọ và vẻ đẹp thuần hậu của người phụ nữ Việt.',
    appropriateOccasions: [
      'Lễ hội hoa sen, lễ hội truyền thống mùa xuân',
      'Chụp ảnh cổ trang nghệ thuật ngoại cảnh',
      'Biểu diễn ca trù, nhã nhạc, ngâm thơ'
    ],
    culturalGuardrails: [
      'Yếm lót bên trong phải kín đáo, không mặc quá hở ngực làm biến tướng trang phục',
      'Nên đi guốc mộc hoặc hài mềm thêu hoa'
    ],
    tags: ['Lễ hội / Đi chùa', 'Dân gian', 'Dạo phố nghệ thuật'],
    defaultColors: {
      primary: '#0d9488', // Xanh mòng két
      secondary: '#fef08a', // Yếm vàng nhạt
      pants: '#ffffff',
      collar: '#0d9488'
    },
    recommendedAccessories: ['non-quai-thao', 'quat-giay-diep', 'chuoi-ngoc-bich', 'guoc-moc']
  }
];
