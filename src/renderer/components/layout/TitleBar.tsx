import React from 'react';
import iconUrl from '../../icon-titlebar.png';

interface TitleBarProps {
  onAboutClick: () => void;
  onSettingsClick: () => void;
}

export function TitleBar({ onAboutClick, onSettingsClick }: TitleBarProps) {
  return (
    <>
      <div className="drag-handle" />
      <div className="title-bar">
        <img src={iconUrl} className="title-bar-icon" alt="" draggable={false} />
        <span className="title-bar-name">AI Pinger</span>
        <span className="title-bar-tagline">Test &amp; Compare AI Models Side-by-Side</span>
        <div className="title-bar-spacer" />
        <div className="title-bar-controls">
          <div className="title-bar-actions">
            <button
              className="title-bar-action no-drag"
              onClick={onAboutClick}
              title="About"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </button>
            <button
              className="title-bar-action no-drag"
              onClick={onSettingsClick}
              title="Settings"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
          <div className="title-bar-window-controls">
            <button
              className="window-ctrl-btn no-drag"
              onClick={() => window.electronAPI.windowMinimize()}
              title="Minimize"
            >
              &#x2500;
            </button>
            <button
              className="window-ctrl-btn no-drag"
              onClick={() => window.electronAPI.windowMaximize()}
              title="Maximize"
            >
              &#x25A1;
            </button>
            <button
              className="window-ctrl-btn window-ctrl-close no-drag"
              onClick={() => window.electronAPI.windowClose()}
              title="Close"
            >
              &#x2715;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
