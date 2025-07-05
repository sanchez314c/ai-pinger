import React from 'react';
import { useAppStore } from '../../stores/app-store';

export function ModelControls() {
  const { models, selectedModelIds, selectAllModels, clearAllModels, searchQuery, setSearchQuery } = useAppStore();

  return (
    <div style={{ flexShrink: 0, padding: '0 12px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
      {/* Search */}
      <input
        type="text"
        placeholder="Search models..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input-field"
        style={{ fontSize: '13px', padding: '8px 12px' }}
      />

      {/* Controls row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {selectedModelIds.length} of {models.length} selected
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={selectAllModels}
            style={{
              fontSize: '11px',
              color: 'var(--accent-teal)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 150ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Select all
          </button>
          <span style={{ color: 'var(--border-light)', fontSize: '11px' }}>|</span>
          <button
            onClick={clearAllModels}
            style={{
              fontSize: '11px',
              color: 'var(--text-secondary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 150ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
