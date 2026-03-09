import React from 'react';
import { useComparisonStore } from '../../stores/comparison-store';

export function PromptInput() {
  const { prompt, setPrompt, isRunning } = useComparisonStore();

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isRunning}
        placeholder="Enter your prompt here to test across multiple AI models..."
        style={{
          width: '100%',
          padding: '14px 18px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-input)',
          borderRadius: 'var(--radius-input)',
          color: 'var(--text-primary)',
          fontSize: '14px',
          outline: 'none',
          resize: 'none',
          height: '100px',
          fontFamily: 'inherit',
          transition: 'all 150ms ease',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-teal)';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(20, 184, 166, 0.12)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-input)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}
