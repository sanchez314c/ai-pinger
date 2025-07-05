import React from 'react';

export function WelcomeTab() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '32px' }}>
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          padding: '32px',
          textAlign: 'center',
          background:
            'radial-gradient(ellipse at 80% 80%, rgba(20, 184, 166, 0.08) 0%, transparent 50%), ' +
            'radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.06) 0%, transparent 50%), ' +
            'linear-gradient(145deg, #141518, #18191c)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '14px',
          boxShadow: '0 2px 16px rgba(0, 0, 0, 0.4)',
          position: 'relative' as const,
          overflow: 'hidden',
        }}
      >
        {/* Inner highlight */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ fontSize: '32px', marginBottom: '16px' }}>&#x1F50D;</div>
        <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: '#f4f4f7' }}>
          Welcome to AI Pinger
        </h2>
        <div style={{ textAlign: 'left', fontSize: '14px', color: '#9a9aa6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #1e1e24' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#14b8a6', flexShrink: 0 }} />
            <span>Select AI models from the sidebar</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #1e1e24' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#14b8a6', flexShrink: 0 }} />
            <span>Enter your prompt above</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #1e1e24' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#14b8a6', flexShrink: 0 }} />
            <span>Click <span style={{ color: '#14b8a6', fontWeight: 500 }}>Run Comparison</span> to test</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#14b8a6', flexShrink: 0 }} />
            <span>View and compare responses in tabs</span>
          </div>
        </div>
        <div
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid #1e1e24',
            fontSize: '12px',
            color: '#5c5c6a',
          }}
        >
          Powered by OpenRouter.ai &middot; Compare AI models side-by-side
        </div>
      </div>
    </div>
  );
}
