// import React, { useState, useRef, useEffect } from 'react';
// import './LanguageConverter.css';

// const LanguageConverter = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentLanguage, setCurrentLanguage] = useState('English');
//   const dropdownRef = useRef(null);

//   const languages = [
//     { code: 'en', name: 'English', flag: '🇺🇸' },
//     { code: 'am', name: 'አማርኛ', flag: 'ETH' },
//     { code: 'or', name: 'Afan Oromo', flag: 'ETH' },
//     { code: 'de', name: 'ትግርኛ', flag: 'ETH' },
   
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLanguageSelect = (language) => {
//     setCurrentLanguage(language.name);
//     setIsOpen(false);
//     console.log(`Language changed to: ${language.name}`);
//   };

//   const currentLangObj = languages.find(lang => lang.name === currentLanguage);

//   return (
//     <div className="language-converter" ref={dropdownRef}>
//       <button 
//         className="language-toggle"
//         onClick={() => setIsOpen(!isOpen)}
//         aria-label="Select language"
//       >
//         <span className="language-flag">{currentLangObj?.flag}</span>
//         <span className="language-text">{currentLanguage}</span>
//         <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
//       </button>
      
//       {isOpen && (
//         <div className="language-dropdown">
//           <div className="dropdown-header">
//             <h4>Select Language</h4>
//           </div>
//           <div className="language-list">
//             {languages.map((language) => (
//               <button
//                 key={language.code}
//                 className={`language-option ${
//                   currentLanguage === language.name ? 'selected' : ''
//                 }`}
//                 onClick={() => handleLanguageSelect(language)}
//               >
//                 <span className="option-flag">{language.flag}</span>
//                 <span className="option-name">{language.name}</span>
//                 {currentLanguage === language.name && (
//                   <span className="checkmark">✓</span>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LanguageConverter;
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import './LanguageConverter.css';

const LanguageConverter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentLanguage, setLanguage, languages, t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (language) => {
    setLanguage(language.code);
    setIsOpen(false);
    
    // Update HTML lang attribute
    document.documentElement.lang = language.code;
    
    // Save to localStorage
    localStorage.setItem('preferred-language', language.code);
  };

  const currentLangObj = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="language-converter" ref={dropdownRef}>
      <button 
        className="language-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('selectLanguage')}
      >
        <span className="language-flag">{currentLangObj?.flag}</span>
        <span className="language-text">{currentLangObj?.name}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          <div className="dropdown-header">
            <h4>{t('selectLanguage')}</h4>
          </div>
          <div className="language-list">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`language-option ${
                  currentLanguage === language.code ? 'selected' : ''
                }`}
                onClick={() => handleLanguageSelect(language)}
              >
                <span className="option-flag">{language.flag}</span>
                <span className="option-name">{language.name}</span>
                {currentLanguage === language.code && (
                  <span className="checkmark">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageConverter;