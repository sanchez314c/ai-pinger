import React from 'react';
import { Spinner } from '../shared/Spinner';
import { useAppStore } from '../../stores/app-store';
import { useComparisonStore } from '../../stores/comparison-store';

export function ActionButtons() {
  const { selectedModelIds, settings } = useAppStore();
  const { prompt, isRunning, responses, runComparison, exportHtml, exportJson, clearResponses } = useComparisonStore();

  const canRun = !isRunning && prompt.trim().length > 0 && selectedModelIds.length > 0 && !!settings.api_key;
  const hasResults = responses.length > 0 && !isRunning;

  const handleRun = () => {
    runComparison(settings.api_key, selectedModelIds, prompt);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {/* Primary action — gradient teal button like Ollama's download-btn */}
      <button
        onClick={handleRun}
        disabled={!canRun}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: canRun ? 'linear-gradient(135deg, #14b8a6, #0d9488)' : '#141518',
          color: canRun ? '#0a0b0e' : '#44444e',
          border: 'none',
          padding: '14px 28px',
          borderRadius: '10px',
          fontWeight: 600,
          fontSize: '14px',
          cursor: canRun ? 'pointer' : 'not-allowed',
          transition: 'all 150ms ease',
          whiteSpace: 'nowrap' as const,
          boxShadow: canRun ? '0 0 16px rgba(20, 184, 166, 0.15)' : 'none',
        }}
        onMouseEnter={(e) => {
          if (canRun) {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 0 24px rgba(20, 184, 166, 0.25)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          if (canRun) {
            e.currentTarget.style.boxShadow = '0 0 16px rgba(20, 184, 166, 0.15)';
          }
        }}
      >
        {isRunning ? (
          <>
            <Spinner size="sm" />
            Running...
          </>
        ) : (
          'Run Comparison'
        )}
      </button>

      {hasResults && (
        <>
          <button
            onClick={() => exportHtml(prompt)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.06)',
              color: '#9a9aa6',
              border: '1px solid #2a2a30',
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: 500,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1a1b1f';
              e.currentTarget.style.color = '#e8e8ec';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.color = '#9a9aa6';
            }}
          >
            Export HTML
          </button>
          <button
            onClick={() => exportJson(prompt)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.06)',
              color: '#9a9aa6',
              border: '1px solid #2a2a30',
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: 500,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1a1b1f';
              e.currentTarget.style.color = '#e8e8ec';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.color = '#9a9aa6';
            }}
          >
            Export JSON
          </button>
          <button
            onClick={clearResponses}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(239,68,68,0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239,68,68,0.2)',
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: 500,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
              e.currentTarget.style.boxShadow = '0 0 16px rgba(239,68,68,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            </svg>
            Reset
          </button>
        </>
      )}

      {selectedModelIds.length > 0 && (
        <span style={{ fontSize: '12px', marginLeft: 'auto', color: '#5c5c6a' }}>
          {selectedModelIds.length} model{selectedModelIds.length !== 1 ? 's' : ''} selected
        </span>
      )}
    </div>
  );
}
