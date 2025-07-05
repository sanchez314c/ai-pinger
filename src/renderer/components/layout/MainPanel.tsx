import React from 'react';
import { PromptInput } from '../prompt/PromptInput';
import { ActionButtons } from '../prompt/ActionButtons';
import { ResponseTabs } from '../responses/ResponseTabs';

export function MainPanel() {
  return (
    <main className="no-drag flex flex-col flex-1 h-full overflow-hidden min-h-0">
      {/* Dashboard area with padding like Ollama Wrangler */}
      <div
        style={{
          flex: 1,
          padding: '24px',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          background: 'var(--bg-void)',
        }}
      >
        {/* Prompt card — matches Ollama's download-section card */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-card)',
            padding: '16px 20px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: 'var(--shadow-card)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Inner highlight edge */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
              pointerEvents: 'none',
            }}
          />
          <PromptInput />
          <ActionButtons />
        </div>

        {/* Response area card */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            background: 'var(--gradient-card)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-card)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
            position: 'relative',
          }}
        >
          {/* Inner highlight edge */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          <ResponseTabs />
        </div>
      </div>
    </main>
  );
}
