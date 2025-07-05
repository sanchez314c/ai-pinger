import React from 'react';
import type { ModelResponse } from '../../../shared/types';
import { Tag } from '../shared/Tag';

interface ResponsePanelProps {
  response: ModelResponse;
}

export function ResponsePanel({ response }: ResponsePanelProps) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Response header */}
      <div
        className="flex-shrink-0 flex items-center gap-3 px-5 py-3"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <span className="text-sm font-medium" style={{ color: 'var(--text-heading)' }}>
          {response.modelName}
        </span>
        <Tag variant="blue">{response.provider}</Tag>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {response.responseTime.toFixed(2)}s
        </span>
        {response.tokenUsage?.total_tokens && (
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {response.tokenUsage.total_tokens} tokens
          </span>
        )}
        {response.error && <Tag variant="red">Error</Tag>}
      </div>

      {/* Response content */}
      <div className="flex-1 overflow-y-auto p-5">
        {response.error ? (
          <div
            className="p-4 text-sm"
            style={{
              borderRadius: 'var(--radius-card)',
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            <span className="font-medium" style={{ color: 'var(--error)' }}>Error: </span>
            <span style={{ color: 'var(--text-secondary)' }}>{response.error}</span>
          </div>
        ) : (
          <div className="text-sm leading-relaxed whitespace-pre-wrap break-words" style={{ color: 'var(--text-secondary)' }}>
            {response.content || 'No response received'}
          </div>
        )}
      </div>
    </div>
  );
}
