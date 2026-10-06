import React, { useState } from 'react';
import {
  ActiveScreen,
  Garment,
  OutfitPiece,
  UserProfile,
  LookbookAlbum,
  HistoryItem,
  Occasion,
  StyleCategory,
  TryOnResult
} from './types';
import { INITIAL_GARMENTS } from './data/garments';
import { ACCESSORIES } from './data/accessories';
import { INITIAL_USER, INITIAL_LOOKBOOKS, INITIAL_HISTORY } from './data/presets';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { CulturalCardModal } from './components/CulturalCardModal';
import { StylistWizardView } from './components/StylistWizardView';
import { OutfitBuilderView } from './components/OutfitBuilderView';
import { CulturalCheckModal } from './components/CulturalCheckModal';
import { TryOnSetupView } from './components/TryOnSetupView';
import { TryOnResultView } from './components/TryOnResultView';
import { LookbookView } from './components/LookbookView';
import { ProfileView } from './components/ProfileView';
import { AdminView } from './components/AdminView';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('home');

  // Garment & Outfit State
  const [garments, setGarments] = useState<Garment[]>(INITIAL_GARMENTS);
  const [selectedGarmentDetail, setSelectedGarmentDetail] = useState<Garment | null>(null);
  const [activeGarment, setActiveGarment] = useState<Garment>(INITIAL_GARMENTS[0]); // Áo Nhật Bình default

  // Outfit piece state
  const [currentOutfit, setCurrentOutfit] = useState<OutfitPiece>({
    garmentId: INITIAL_GARMENTS[0].id,
    primaryColor: INITIAL_GARMENTS[0].defaultColors.primary,
    innerRobeColor: '#ffffff',
    pantsColor: INITIAL_GARMENTS[0].defaultColors.pants,
    collarColor: INITIAL_GARMENTS[0].defaultColors.collar,
    accessories: {
      head: ACCESSORIES[0], // Mấn hoàng gia
      hand: ACCESSORIES[4], // Quạt giấy điệp
      neck: ACCESSORIES[8], // Khánh vàng
      foot: ACCESSORIES[11] // Hài nhung thêu
    }
  });

  // Try-on State
  const [tryOnUserImage, setTryOnUserImage] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
  );
  const [customAccImage, setCustomAccImage] = useState<string | undefined>(undefined);
  const [customAccName, setCustomAccName] = useState<string | undefined>(undefined);

  // User & Auth State (Defaults to Guest as specified in document)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Cultural Check Modal
  const [isCulturalCheckModalOpen, setIsCulturalCheckModalOpen] = useState<boolean>(false);

  // Admin Mode
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Lookbooks & History State
  const [lookbooks, setLookbooks] = useState<LookbookAlbum[]>(INITIAL_LOOKBOOKS);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(INITIAL_HISTORY);

  // Auth Handlers
  const handleLoginSuccess = (name: string, email: string) => {
    setIsLoggedIn(true);
    setCurrentUser({
      ...INITIAL_USER,
      fullName: name,
      email: email
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Garment Detail
  const handleOpenGarmentDetail = (garment: Garment) => {
    setSelectedGarmentDetail(garment);
  };

  // Start Stylist from Garment
  const handleStartStylistWithGarment = (garment: Garment) => {
    setActiveGarment(garment);
    setCurrentOutfit({
      garmentId: garment.id,
      primaryColor: garment.defaultColors.primary,
      innerRobeColor: '#ffffff',
      pantsColor: garment.defaultColors.pants,
      collarColor: garment.defaultColors.collar,
      accessories: {
        head: ACCESSORIES.find(a => a.category === 'head') || ACCESSORIES[0],
        hand: ACCESSORIES.find(a => a.id === 'quat-giay-diep') || ACCESSORIES[4],
        foot: ACCESSORIES.find(a => a.id === 'hai-theu') || ACCESSORIES[11]
      }
    });
    setCurrentScreen('stylist_wizard');
  };

  // Finish Stylist Wizard
  const handleFinishWizard = (
    outfit: OutfitPiece,
    garment: Garment,
    occasion: Occasion,
    style: StyleCategory
  ) => {
    setActiveGarment(garment);
    setCurrentOutfit(outfit);

    // Record history
    const newHistory: HistoryItem = {
      id: `hist-${Date.now()}`,
      type: 'stylist',
      title: `Phối đồ AI: ${garment.name} (${occasion})`,
      garmentName: `${garment.name} · ${garment.dynastyLabel}`,
      timestamp: 'Vừa xong',
      thumbnailUrl: garment.imageUrl,
      details: `Bối cảnh: ${occasion} · Phong cách: ${style}`
    };
    setHistoryItems(prev => [newHistory, ...prev]);

    setCurrentScreen('outfit_builder');
  };

  // Try-on Process Handlers
  const handleStartTryOnProcess = (
    userImg: string,
    customAccImg?: string,
    customAccTitle?: string
  ) => {
    setTryOnUserImage(userImg);
    setCustomAccImage(customAccImg);
    setCustomAccName(customAccTitle);

    // Record history
    const newHistory: HistoryItem = {
      id: `hist-tryon-${Date.now()}`,
      type: 'try_on',
      title: `AI Try-on: ${activeGarment.name}`,
      garmentName: `${activeGarment.name} (${activeGarment.dynastyLabel})`,
      timestamp: 'Vừa xong',
      thumbnailUrl: activeGarment.imageUrl,
      details: 'Ghép thử trang phục ảo hoàn tất'
    };
    setHistoryItems(prev => [newHistory, ...prev]);

    setCurrentScreen('try_on_result');
  };

  // Save to Lookbook
  const handleSaveToLookbook = (result: TryOnResult) => {
    // Add outfit to the first lookbook album
    setLookbooks(prev => {
      const updated = [...prev];
      if (updated.length > 0) {
        const target = { ...updated[0] };
        target.outfits = [
          {
            id: `outfit-saved-${Date.now()}`,
            title: `${result.garmentName} (${result.dynasty})`,
            garmentId: activeGarment.id,
            garmentName: result.garmentName,
            dynasty: result.dynasty,
            imageUrl: result.resultPhotoUrl,
            colors: result.colorsSummary,
            accessories: [result.accessoriesSummary],
            createdAt: 'Hôm nay'
          },
          ...target.outfits
        ];
        target.outfitsCount += 1;
        updated[0] = target;
      }
      return updated;
    });

    if (currentUser) {
      setCurrentUser(prev => prev ? ({
        ...prev,
        stats: {
          ...prev.stats,
          lookbooksSaved: prev.stats.lookbooksSaved + 1
        }
      }) : null);
    }
  };

  // Lookbook creation
  const handleCreateLookbook = (title: string, description: string, occasion: Occasion) => {
    const newAlbum: LookbookAlbum = {
      id: `lb-${Date.now()}`,
      title,
      description,
      occasion,
      coverImageUrl: activeGarment.imageUrl,
      outfitsCount: 0,
      createdAt: 'Hôm nay',
      isPublic: true,
      outfits: []
    };
    setLookbooks(prev => [newAlbum, ...prev]);
  };

  const handleDeleteLookbook = (id: string) => {
    setLookbooks(prev => prev.filter(lb => lb.id !== id));
  };

  const handleDeleteHistory = (id: string) => {
    setHistoryItems(prev => prev.filter(h => h.id !== id));
  };

  // Admin Garment Management (Soft delete, Add, Restore)
  const handleAddGarment = (newGarment: Garment) => {
    setGarments(prev => [newGarment, ...prev]);
  };

  const handleDeleteGarment = (id: string) => {
    setGarments(prev => prev.filter(g => g.id !== id));
  };

  const handleRestoreGarment = (garment: Garment) => {
    setGarments(prev => [garment, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0e1017] text-stone-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      {/* Top Navbar */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setIsAdminMode(false);
          setCurrentScreen(screen);
        }}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        isAdminMode={isAdminMode}
        onToggleAdmin={() => {
          setIsAdminMode(!isAdminMode);
          if (!isAdminMode) {
            setCurrentScreen('admin');
          } else {
            setCurrentScreen('home');
          }
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Admin View */}
        {isAdminMode || currentScreen === 'admin' ? (
          <AdminView
            garments={garments}
            onAddGarment={handleAddGarment}
            onDeleteGarment={handleDeleteGarment}
            onRestoreGarment={handleRestoreGarment}
          />
        ) : (
          <>
            {/* Screen 2: Trang chủ */}
            {currentScreen === 'home' && (
              <HomeView
                garments={garments}
                onNavigate={setCurrentScreen}
                onSelectGarmentDetail={handleOpenGarmentDetail}
                onStartStylistWithGarment={handleStartStylistWithGarment}
              />
            )}

            {/* Screen 3: Khám phá */}
            {currentScreen === 'explore' && (
              <ExploreView
                garments={garments}
                onSelectGarmentDetail={handleOpenGarmentDetail}
                onStartStylistWithGarment={handleStartStylistWithGarment}
              />
            )}

            {/* Screen 5: AI Stylist Wizard */}
            {currentScreen === 'stylist_wizard' && (
              <StylistWizardView
                garments={garments}
                initialGarment={activeGarment}
                onFinishWizard={handleFinishWizard}
              />
            )}

            {/* Screen 6: Outfit Builder & Customizer */}
            {currentScreen === 'outfit_builder' && (
              <OutfitBuilderView
                outfit={currentOutfit}
                garment={activeGarment}
                onUpdateOutfit={setCurrentOutfit}
                onOpenCulturalCheck={() => setIsCulturalCheckModalOpen(true)}
                onProceedToTryOn={() => setCurrentScreen('try_on_setup')}
                onBackToWizard={() => setCurrentScreen('stylist_wizard')}
              />
            )}

            {/* Screen 8: AI Try-on Setup */}
            {currentScreen === 'try_on_setup' && (
              <TryOnSetupView
                garment={activeGarment}
                outfit={currentOutfit}
                onStartTryOnProcess={handleStartTryOnProcess}
                onBackToBuilder={() => setCurrentScreen('outfit_builder')}
              />
            )}

            {/* Screen 9: AI Try-on Result */}
            {currentScreen === 'try_on_result' && (
              <TryOnResultView
                garment={activeGarment}
                outfit={currentOutfit}
                originalUserImage={tryOnUserImage}
                customAccessoryImage={customAccImage}
                customAccessoryName={customAccName}
                isLoggedIn={isLoggedIn}
                onSaveToLookbook={handleSaveToLookbook}
                onRetry={() => setCurrentScreen('try_on_setup')}
                onOpenLogin={() => setIsLoginModalOpen(true)}
              />
            )}

            {/* Screen 10: Lookbook cá nhân */}
            {currentScreen === 'lookbook' && (
              <LookbookView
                lookbooks={lookbooks}
                isLoggedIn={isLoggedIn}
                onOpenLogin={() => setIsLoginModalOpen(true)}
                onCreateAlbum={handleCreateLookbook}
                onDeleteAlbum={handleDeleteLookbook}
              />
            )}

            {/* Screen 11: Hồ sơ & Lịch sử */}
            {currentScreen === 'profile' && (
              <ProfileView
                user={currentUser || INITIAL_USER}
                historyItems={historyItems}
                onDeleteHistoryItem={handleDeleteHistory}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentScreen} />

      {/* Screen 1 Modal: Đăng nhập / Đăng ký (Split-screen) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onContinueAsGuest={() => {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }}
      />

      {/* Screen 4 Modal: Chi tiết Việt Phục / Thẻ văn hóa */}
      <CulturalCardModal
        garment={selectedGarmentDetail}
        isOpen={!!selectedGarmentDetail}
        onClose={() => setSelectedGarmentDetail(null)}
        onStartStylist={handleStartStylistWithGarment}
      />

      {/* Screen 7 Modal: Kiểm tra tính phù hợp văn hóa (Cultural Compatibility Check) */}
      <CulturalCheckModal
        isOpen={isCulturalCheckModalOpen}
        onClose={() => setIsCulturalCheckModalOpen(false)}
        outfit={currentOutfit}
        garment={activeGarment}
        onApplyAutoFix={(fixedOutfit) => {
          setCurrentOutfit(fixedOutfit);
        }}
        onProceedToTryOn={() => {
          setIsCulturalCheckModalOpen(false);
          setCurrentScreen('try_on_setup');
        }}
      />
    </div>
  );
}
