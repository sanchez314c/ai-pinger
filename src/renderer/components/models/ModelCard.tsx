import React from 'react';
import type { AIModel } from '../../../shared/types';
import { useAppStore } from '../../stores/app-store';

interface ModelCardProps {
  model: AIModel;
}

export function ModelCard({ model }: ModelCardProps) {
  const { selectedModelIds, toggleModel } = useAppStore();
  const isSelected = selectedModelIds.includes(model.id);

  return (
    <button
      onClick={() => toggleModel(model.id)}
      className={`model-item w-full text-left ${isSelected ? 'selected' : ''}`}
    >
      {/* Checkbox indicator */}
      <div
        className="flex-shrink-0"
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isSelected ? 'var(--accent-teal)' : 'transparent',
          border: isSelected ? '1px solid var(--accent-teal)' : '1px solid var(--border-light)',
          transition: 'all 150ms ease',
        }}
      >
        {isSelected && (
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="var(--text-inverse)" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {/* Model info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '12px',
            color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 500,
          }}
        >
          {model.name}
        </div>
        <div
          style={{
            fontSize: '10px',
            color: 'var(--text-dim)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {model.provider} &middot; {model.context_length > 0 ? `${(model.context_length / 1000).toFixed(0)}k ctx` : model.id}
        </div>
      </div>
    </button>
  );
}
