import React, { useState, useEffect, useCallback } from 'react';
import type { View } from './types';
import { useTelegram } from './hooks/useTelegram';
import BottomNav from './components/BottomNav';
import ProfileView from './components/ProfileView';
import TaskCard from './components/TaskCard';
import { InterstitialIcon, PopupIcon, InAppIcon } from './components/icons/AdIcons';

const App: React.FC = () => {
  const [view, setView] = useState<View>('tasks');
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isAdSdkReady, setIsAdSdkReady] = useState(false);
  const [theme, setTheme] = useState({
    bg: '#18222d',
    textColor: '#ffffff',
    hintColor: '#b1c3d5',
    buttonColor: '#5288c1',
    buttonTextColor: '#ffffff',
  });

  const { webApp } = useTelegram();

  useEffect(() => {
    if (webApp) {
      webApp.expand();
      setTheme({
        bg: webApp.themeParams.bg_color || '#18222d',
        textColor: webApp.themeParams.text_color || '#ffffff',
        hintColor: webApp.themeParams.hint_color || '#b1c3d5',
        buttonColor: webApp.themeParams.button_color || '#5288c1',
        buttonTextColor: webApp.themeParams.button_text_color || '#ffffff',
      });
      document.body.style.backgroundColor = webApp.themeParams.bg_color || '#18222d';
    }
  }, [webApp]);
  
  // Effect to check for the ad SDK readiness
  useEffect(() => {
    if (typeof (window as any).show_9825300 === 'function') {
      setIsAdSdkReady(true);
      return;
    }

    const maxWaitTime = 10000; // 10 seconds
    const pollInterval = 200; // 200ms
    let elapsedTime = 0;

    const intervalId = setInterval(() => {
      if (typeof (window as any).show_9825300 === 'function') {
        setIsAdSdkReady(true);
        clearInterval(intervalId);
      } else {
        elapsedTime += pollInterval;
        if (elapsedTime >= maxWaitTime) {
          console.error("Ad SDK failed to load within the time limit.");
          clearInterval(intervalId);
          // Optionally, set an error state here to inform the user
        }
      }
    }, pollInterval);

    return () => clearInterval(intervalId);
  }, []);

  const handleAd = useCallback(async <T,>(taskName: string, adFunction: () => T | Promise<T>, successMessage: string) => {
    if (isLoading || !isAdSdkReady) return;
    
    if (typeof (window as any).show_9825300 !== 'function') {
      console.error('Ad function show_9825300 is not available on window object.');
      alert('Ad service is currently unavailable. Please check your connection or try again later.');
      if (webApp) {
        webApp.HapticFeedback.notificationOccurred('error');
      }
      return;
    }

    setIsLoading(taskName);

    try {
      await Promise.resolve(adFunction());
      if (webApp) {
        webApp.HapticFeedback.notificationOccurred('success');
      }
      alert(successMessage);
    } catch (e) {
      console.error(`Error showing ${taskName} ad:`, e);
      if (webApp) {
        webApp.HapticFeedback.notificationOccurred('error');
      }
      alert(`An error occurred while showing the ${taskName} ad. Please try again.`);
    } finally {
      setIsLoading(null);
    }
  }, [isLoading, webApp, isAdSdkReady]);


  const showInterstitialAd = useCallback(() => {
    const adFunc = () => (window as any).show_9825300();
    handleAd('Interstitial', adFunc, 'Rewarded Interstitial ad viewed successfully! Your reward has been processed.');
  }, [handleAd]);
  
  const showPopupAd = useCallback(() => {
    const adFunc = () => (window as any).show_9825300('pop');
    handleAd('Popup', adFunc, 'Rewarded Popup ad viewed successfully! Your reward has been processed.');
  }, [handleAd]);
  
  const showInAppAd = useCallback(() => {
    const adFunc = () => (window as any).show_9825300({
      type: 'inApp',
      inAppSettings: {
        frequency: 2,
        capping: 0.1,
        interval: 30,
        timeout: 5,
        everyPage: false
      }
    });
    handleAd('In-App', adFunc, 'In-App ad session started. Ads will appear based on the configured rules.');
  }, [handleAd]);

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ backgroundColor: theme.bg, color: theme.textColor }}>
      <header className="p-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Daily Earn</h1>
        <p style={{ color: theme.hintColor }}>Watch ads and get rewarded!</p>
      </header>

      <main className="flex-grow p-4 overflow-y-auto">
        {view === 'tasks' && (
          <div className="space-y-4 max-w-md mx-auto">
            <TaskCard
              title="Rewarded Interstitial"
              description="Watch a full-screen video ad to earn a reward."
              onWatch={showInterstitialAd}
              isLoading={isLoading === 'Interstitial'}
              isAdSdkReady={isAdSdkReady}
              IconComponent={InterstitialIcon}
              theme={theme}
            />
            <TaskCard
              title="Rewarded Popup"
              description="View a popup ad. Close it or watch it to get rewarded."
              onWatch={showPopupAd}
              isLoading={isLoading === 'Popup'}
              isAdSdkReady={isAdSdkReady}
              IconComponent={PopupIcon}
              theme={theme}
            />
            <TaskCard
              title="In-App Interstitial"
              description="Start an ad session. Ads will appear automatically as you browse."
              onWatch={showInAppAd}
              isLoading={isLoading === 'In-App'}
              isAdSdkReady={isAdSdkReady}
              IconComponent={InAppIcon}
              theme={theme}
            />
          </div>
        )}
        {view === 'profile' && <ProfileView />}
      </main>

      <BottomNav activeView={view} setActiveView={setView} theme={theme} />
    </div>
  );
};

export default App;