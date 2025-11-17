import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/Header/Cart/CartContext';
import { LanguageProvider, useLanguage } from './components/LanguageConverter/LanguageContext';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Chatbot from './components/Chatbot/Chatbot';
import ApiTest from './components/ApiTest';

import HomeHero from './components/Home/HomeHero';
import Pillars from './components/Home/Pillars';
import Prototypes from './components/Home/Prototypes';
import Impact from './components/Home/Impact';
import Join from './components/Home/Join';

import Vision from './pages/About/Vision';
import Team from './pages/About/Team';

import Infrastructure from './pages/Technology/Infrastructure';
import Robotics from './pages/Technology/Robotics';
import IMindPhone from './pages/Technology/IMindPhone';
import Intelligence from './pages/Intelligence/Intelligence';

import Agriculture from './pages/Solutions/Agriculture';
import Healthcare from './pages/Solutions/Healthcare';
import Education from './pages/Solutions/Education';

import Careers from './pages/Contribute/Careers';
import Partners from './pages/Contribute/Partners';

const LanguageDetectionBanner = () => {
  const { currentLanguage, setLanguage, autoDetectLanguage, t } = useLanguage();
  const detectedLanguage = autoDetectLanguage();

  if (!detectedLanguage || detectedLanguage.code === currentLanguage) {
    return null;
  }

  const handleSwitch = () => {
    setLanguage(detectedLanguage.code);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('languageBannerDismissed', 'true');
  };

  if (sessionStorage.getItem('languageBannerDismissed')) {
    return null;
  }

  return (
    <div className="language-detection-banner">
      <div className="language-detection-text">
        {t('switchToLanguage', { language: detectedLanguage.name })}
      </div>
      <div className="language-detection-actions">
        <button className="language-detection-btn" onClick={handleDismiss}>
          {t('dismiss')}
        </button>
        <button className="language-detection-btn primary" onClick={handleSwitch}>
          {t('switch')}
        </button>
      </div>
    </div>
  );
};

const AppContent = () => {
  return (
    <Router>
      <div className="App">
        <LanguageDetectionBanner />
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HomeHero />
                  <Pillars />
                  <Prototypes />
                  <Impact />
                  <Join />
                </>
              }
            />
            <Route path="/vision" element={<Vision />} />
            <Route path="/team" element={<Team />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/robotics" element={<Robotics />} />
            <Route path="/intelligence" element={<Intelligence />} />
            <Route path="/imind" element={<IMindPhone />} />
            <Route path="/agriculture" element={<Agriculture />} />
            <Route path="/healthcare" element={<Healthcare />} />
            <Route path="/education" element={<Education />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/apitest" element={<ApiTest />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
};

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
