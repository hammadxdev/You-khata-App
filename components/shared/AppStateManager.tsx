import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import SplashScreen from './SplashScreen';
import OnboardingScreen from './OnboardingScreen';
import StorageUtils from '@/utils/storage';

interface AppStateManagerProps {
  children: React.ReactNode;
}

type AppState = 'checking' | 'introSplash' | 'onboarding' | 'main';

export default function AppStateManager({ children }: AppStateManagerProps) {
  const [appState, setAppState] = useState<AppState>('checking');

  useEffect(() => {
    let isMounted = true;

    const initializeApp = async () => {
      try {
        await StorageUtils.initializeDefaultProfile();
        const isOnboardingCompleted = await StorageUtils.isOnboardingCompleted();

        if (isMounted) {
          setAppState(isOnboardingCompleted ? 'main' : 'introSplash');
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        if (isMounted) {
          setAppState('main');
        }
      }
    };

    initializeApp();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSplashFinish = useCallback(() => {
    setAppState('onboarding');
  }, []);

  const handleOnboardingComplete = useCallback(async () => {
    try {
      await StorageUtils.setOnboardingCompleted();
      setAppState('main');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setAppState('main');
    }
  }, []);

  // Keep a blank app-level loading state while AsyncStorage is checked.
  // This avoids rendering the intro for users who have already completed it.
  if (appState === 'checking') {
    return <View style={{ flex: 1, backgroundColor: '#4A90E2' }} />;
  }

  // Render based on app state
  switch (appState) {
    case 'introSplash':
      return <SplashScreen onFinish={handleSplashFinish} />;
    
    case 'onboarding':
      return <OnboardingScreen onComplete={handleOnboardingComplete} />;
    
    case 'main':
    default:
      return <>{children}</>;
  }
}
