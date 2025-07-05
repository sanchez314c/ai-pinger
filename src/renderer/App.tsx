import React, { useEffect, useState, useRef, useCallback } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { TitleBar } from './components/layout/TitleBar';
import { Sidebar } from './components/layout/Sidebar';
import { MainPanel } from './components/layout/MainPanel';
import { StatusBar } from './components/layout/StatusBar';
import { AboutModal } from './components/layout/AboutModal';
import { SettingsModal } from './components/settings/SettingsModal';
import { useAppStore } from './stores/app-store';

const SIDEBAR_MIN = 200;
const SIDEBAR_MAX = 500;
const SIDEBAR_DEFAULT = 280;

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
  const isResizing = useRef(false);
  const { loadSettings, loadModels } = useAppStore();

  useEffect(() => {
    const init = async () => {
      await loadSettings();
      await loadModels();
    };
    init();

    // Listen for menu-triggered settings
    const cleanup = window.electronAPI.onOpenSettings(() => {
      setSettingsOpen(true);
    });
    return cleanup;
  }, [loadSettings, loadModels]);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMouseMove = (ev: MouseEvent) => {
      if (!isResizing.current) return;
      // Account for body padding (16px) and app-container offset
      const appBody = document.querySelector('.app-body');
      if (!appBody) return;
      const rect = appBody.getBoundingClientRect();
      const newWidth = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, ev.clientX - rect.left));
      setSidebarWidth(newWidth);
    };

    const onMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <AppLayout>
      <TitleBar
        onAboutClick={() => setAboutOpen(true)}
        onSettingsClick={() => setSettingsOpen(true)}
      />
      <div className="app-body">
        <Sidebar width={sidebarWidth} />
        <div
          className="no-drag"
          onMouseDown={handleResizeStart}
          style={{
            width: '5px',
            cursor: 'col-resize',
            flexShrink: 0,
            background: 'transparent',
            position: 'relative',
            zIndex: 10,
            transition: 'background 150ms ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(20,184,166,0.3)'; }}
          onMouseLeave={(e) => { if (!isResizing.current) e.currentTarget.style.background = 'transparent'; }}
        />
        <MainPanel />
      </div>
      <StatusBar />
      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
      {settingsOpen && (
        <SettingsModal onClose={() => setSettingsOpen(false)} />
      )}
    </AppLayout>
  );
}
