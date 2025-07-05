import React from 'react';
import { useAppStore } from '../../stores/app-store';
import { APP_VERSION } from '../../../shared/constants';

export function StatusBar() {
  const { models, modelsLoading, modelsError, settings } = useAppStore();

  const isConnected = !!settings.api_key && !modelsError;
  const statusText = modelsLoading
    ? 'Status: Loading...'
    : modelsError
      ? 'Status: No API Key'
      : 'Status: Ready';

  return (
    <div className="status-bar">
      <div className="status-bar-left">
        <div className={`status-bar-dot ${isConnected ? '' : 'offline'}`} />
        <span>{statusText}</span>
        <span style={{ color: 'var(--text-dim)' }}>|</span>
        <span>{models.length} model{models.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="status-bar-right">
        <span className="status-bar-version">v{APP_VERSION}</span>
      </div>
    </div>
  );
}
