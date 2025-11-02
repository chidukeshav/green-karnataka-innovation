
import React, { useState, useCallback } from 'react';
import { IntroductionScreen } from './components/IntroductionScreen';
import { ProjectsScreen } from './components/ProjectsScreen';
import type { Screen } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('introduction');

  const navigateToProjects = useCallback(() => {
    setCurrentScreen('projects');
  }, []);

  const navigateToHome = useCallback(() => {
    setCurrentScreen('introduction');
  }, []);

  return (
    <div className="bg-brand-dark min-h-screen font-sans text-white antialiased">
      <div className="container mx-auto px-4 py-8">
        {currentScreen === 'introduction' && (
          <IntroductionScreen onNavigate={navigateToProjects} />
        )}
        {currentScreen === 'projects' && (
          <ProjectsScreen onNavigateBack={navigateToHome} />
        )}
      </div>
    </div>
  );
}

export default App;
