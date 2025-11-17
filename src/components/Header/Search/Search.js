import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const searchData = [
    { id: 1, title: 'Ethimind Vision Studio', type: 'experience', category: 'Immersive Experiences', path: '/vision' },
    { id: 2, title: 'Adaptive Infrastructure Lab', type: 'service', category: 'Infrastructure', path: '/infrastructure' },
    { id: 3, title: 'Neural Stories Team', type: 'team', category: 'Teams', path: '/team' },
    { id: 4, title: 'Community XR Residency', type: 'experience', category: 'Residencies', path: '/residencies' },
    { id: 5, title: 'Partner Integrations', type: 'partner', category: 'Partners', path: '/partners' },
    { id: 6, title: 'Live Cinematic Events', type: 'event', category: 'Events', path: '/events' },
    { id: 7, title: 'Ethimind Research Notes', type: 'insight', category: 'Research', path: '/insights' },
    { id: 8, title: 'Vision SDK Documentation', type: 'support', category: 'Developer', path: '/docs' },
    { id: 9, title: 'Innovation Spotlight', type: 'news', category: 'News', path: '/news' },
    { id: 10, title: 'Global Outreach Update', type: 'news', category: 'News', path: '/news/outreach' }
  ];

  const popularSearches = [
    'Vision Studio',
    'Adaptive Infrastructure',
    'Neural Stories Team',
    'Live Cinematic Events',
    'Research Notes',
    'Partner Integrations'
  ];

  // Recent searches (would typically come from localStorage)
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = JSON.parse(localStorage.getItem('EthiMindRecentSearches') || '[]');
    setRecentSearches(savedSearches);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(results);
      setIsLoading(false);
    }, 300);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveToRecentSearches(searchQuery);
      navigateToSearch(searchQuery);
    }
  };

  const handleResultClick = (result) => {
    saveToRecentSearches(result.title);
    navigate(result.path);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handlePopularSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    performSearch(searchTerm);
    inputRef.current?.focus();
  };

  const handleRecentSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    performSearch(searchTerm);
    inputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.setItem('EthiMindRecentSearches', '[]');
  };

  const saveToRecentSearches = (searchTerm) => {
    const updatedSearches = [
      searchTerm,
      ...recentSearches.filter(term => term !== searchTerm)
    ].slice(0, 5); // Keep only 5 most recent
    
    setRecentSearches(updatedSearches);
    localStorage.setItem('EthiMindRecentSearches', JSON.stringify(updatedSearches));
  };

  const navigateToSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsOpen(false);
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'experience': return '✨';
      case 'service': return '🛰️';
      case 'team': return '🧠';
      case 'insight': return '🔭';
      case 'partner': return '🤝';
      case 'event': return '🎟️';
      case 'support': return '🛠️';
      case 'news': return '🌐';
      default: return '🔍';
    }
  };

  const guidedJourneys = [
    {
      id: 'guide-1',
      title: 'Vision Studio Tour',
      description: 'Step inside Ethimind’s immersive creative lab',
      query: 'Vision Studio'
    },
    {
      id: 'guide-2',
      title: 'Infrastructure Pulse',
      description: 'See the systems powering adaptive experiences',
      query: 'Adaptive Infrastructure'
    },
    {
      id: 'guide-3',
      title: 'Partner Collaborations',
      description: 'Discover who builds with Ethimind',
      query: 'Partner Integrations'
    }
  ];

  return (
    <div className="search-container" ref={searchRef}>
      {/* Search Button */}
      <button
        className="search-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Search"
      >
        <span className="search-icon">🔍</span>
      </button>

      {/* Search Overlay */}
      {isOpen && (
        <div className="search-overlay">
          <div className="search-modal">
            <div className="search-banner">
              <p className="search-banner-label">Ethimind Search Lab</p>
              <h3>Locate the stories shaping our adaptive worlds</h3>
              <span>Browse experiences, infrastructure, partners, and insights with precision.</span>
            </div>
            {/* Search Input */}
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <div className="search-input-group">
                <span className="search-input-icon">🔍</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="search-input"
                  placeholder="Search Ethimind experiences, partners, insights..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                      inputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button type="submit" className="search-submit-btn">
                Search
              </button>
            </form>

            {/* Search Results */}
            <div className="search-results">
              {isLoading ? (
                <div className="search-loading">
                  <div className="loading-spinner"></div>
                  <span>Scanning Ethimind archives…</span>
                </div>
              ) : searchQuery ? (
                <>
                  {searchResults.length > 0 ? (
                    <div className="results-section results-found">
                      <div className="results-header">
                        <h4>Pulse Results</h4>
                        <span className="results-count">{searchResults.length} discoveries</span>
                      </div>
                      <div className="results-list">
                        {searchResults.map((result) => (
                          <button
                            key={result.id}
                            className="result-item"
                            onClick={() => handleResultClick(result)}
                          >
                            <span className="result-icon">
                              {getIconForType(result.type)}
                            </span>
                            <div className="result-content">
                              <div className="result-title">{result.title}</div>
                              <div className="result-meta">
                                {result.category} • {result.type}
                              </div>
                            </div>
                            <span className="result-arrow">→</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="no-results">
                      <div className="no-results-icon">✨</div>
                      <h4>Nothing matched that query</h4>
                      <p>Try new keywords or explore our guided journeys.</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {recentSearches.length > 0 && (
                    <div className="results-section">
                      <div className="results-header">
                        <h4>Recent Discoveries</h4>
                        <button
                          className="clear-recent"
                          onClick={clearRecentSearches}
                        >
                          Clear history
                        </button>
                      </div>
                      <div className="recent-searches">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            className="recent-search-item"
                            onClick={() => handleRecentSearch(search)}
                          >
                            <span className="recent-icon">🕒</span>
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="results-section">
                    <div className="results-header">
                      <h4>Trending Journeys</h4>
                    </div>
                    <div className="popular-searches">
                      {popularSearches.map((search, index) => (
                        <button
                          key={index}
                          className="popular-search-item"
                          onClick={() => handlePopularSearch(search)}
                        >
                          <span className="popular-icon">🔥</span>
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="results-section">
                    <div className="results-header">
                      <h4>Guided Journeys</h4>
                    </div>
                    <div className="guided-journeys">
                      {guidedJourneys.map((journey) => (
                        <button
                          key={journey.id}
                          className="guided-journey-item"
                          onClick={() => handlePopularSearch(journey.query)}
                        >
                          <span className="journey-icon">🗺️</span>
                          <div>
                            <div className="journey-title">{journey.title}</div>
                            <p className="journey-description">{journey.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="results-section">
                    <div className="results-header">
                      <h4>Quick Categories</h4>
                    </div>
                    <div className="categories-grid">
                      <button
                        className="category-item"
                        onClick={() => handlePopularSearch('Vision Studio')}
                      >
                        <span className="category-icon">✨</span>
                        Vision Studio
                      </button>
                      <button
                        className="category-item"
                        onClick={() => handlePopularSearch('Adaptive Infrastructure')}
                      >
                        <span className="category-icon">🛰️</span>
                        Infrastructure Lab
                      </button>
                      <button
                        className="category-item"
                        onClick={() => handlePopularSearch('Research Notes')}
                      >
                        <span className="category-icon">🔭</span>
                        Research Notes
                      </button>
                      <button
                        className="category-item"
                        onClick={() => handlePopularSearch('Partner Integrations')}
                      >
                        <span className="category-icon">🤝</span>
                        Partner Integrations
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Search Tips */}
            <div className="search-tips">
              <div className="search-tips-header">
                <span>💡</span>
                <strong>Search Tips</strong>
              </div>
              <div className="search-tips-content">
                <span>Search with Ethimind project names like "Vision Studio" or partner topics like "Infrastructure"</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;