import React from 'react';
import { ModelCard } from './ModelCard';
import { Spinner } from '../shared/Spinner';
import { useAppStore } from '../../stores/app-store';

export function ModelList() {
  const { models, modelsLoading, modelsError, searchQuery } = useAppStore();

  const filtered = searchQuery
    ? models.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.provider.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : models;

  if (modelsLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3" style={{ color: 'var(--text-secondary)' }}>
        <Spinner size="lg" />
        <span className="text-sm">Loading models...</span>
      </div>
    );
  }

  if (modelsError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <span className="text-sm" style={{ color: 'var(--error)' }}>Failed to load models</span>
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{modelsError}</span>
      </div>
    );
  }

  if (filtered.length === 0 && models.length > 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        No models match "{searchQuery}"
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-4 text-center" style={{ color: 'var(--text-secondary)' }}>
        <span className="text-sm">No models available</span>
        <span className="text-xs" style={{ color: 'var(--text-dim)' }}>Set your API key in Settings</span>
      </div>
    );
  }

  return (
    <div className="model-list-scroll flex-1 overflow-y-auto overflow-x-hidden min-h-0" style={{ padding: '4px 8px 12px 8px' }}>
      {filtered.map((model) => (
        <ModelCard key={model.id} model={model} />
      ))}
    </div>
  );
}
