import React, { useEffect } from 'react';
import { APP_NAME, APP_VERSION, APP_DESCRIPTION } from '../../../shared/constants';
import iconUrl from '../../icon-titlebar.png';

interface AboutModalProps {
  onClose: () => void;
}

export function AboutModal({ onClose }: AboutModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleGithubClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = 'https://github.com/sanchez314c/ai-pinger';
    if (window.electronAPI?.openExternal) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="about-overlay" onClick={handleOverlayClick}>
      <div className="about-modal">
        <button className="about-close-btn no-drag" onClick={onClose}>
          &#x2715;
        </button>
        <img src={iconUrl} className="about-icon" alt="" />
        <h2 className="about-name">{APP_NAME}</h2>
        <div className="about-version">v{APP_VERSION}</div>
        <div className="about-desc">{APP_DESCRIPTION}</div>
        <div className="about-license">MIT License | Jason Paul Michaels</div>
        <a className="about-github-badge no-drag" href="#" onClick={handleGithubClick}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          GitHub
        </a>
        <div className="about-email">software@jasonpaulmichaels.co</div>
      </div>
    </div>
  );
}
