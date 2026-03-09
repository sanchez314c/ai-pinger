import React, { useState, useEffect } from 'react';
import { Tabs } from '../shared/Tabs';
import { ResponsePanel } from './ResponsePanel';
import { WelcomeTab } from './WelcomeTab';
import { Spinner } from '../shared/Spinner';
import { useComparisonStore } from '../../stores/comparison-store';

export function ResponseTabs() {
  const { responses, isRunning, progress } = useComparisonStore();
  const [activeTab, setActiveTab] = useState('welcome');

  useEffect(() => {
    if (responses.length > 0 && activeTab === 'welcome') {
      setActiveTab(responses[0].modelId);
    }
  }, [responses]); // eslint-disable-line react-hooks/exhaustive-deps -- only trigger on new responses, not tab changes

  if (responses.length === 0 && !isRunning) {
    return <WelcomeTab />;
  }

  if (isRunning && responses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Spinner size="lg" />
        {progress && (
          <div className="text-center">
            <div className="text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
              Testing {progress.modelName}...
            </div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {progress.completedCount} of {progress.totalCount} complete
            </div>
          </div>
        )}
      </div>
    );
  }

  const tabs = responses.map((r) => ({
    id: r.modelId,
    label: r.modelName.length > 20 ? r.modelName.slice(0, 20) + '...' : r.modelName,
  }));

  const activeResponse = responses.find((r) => r.modelId === activeTab);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 px-4">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className="flex-1 overflow-hidden">
        {activeResponse ? (
          <ResponsePanel response={activeResponse} />
        ) : (
          <div className="flex items-center justify-center h-full text-sm" style={{ color: 'var(--text-secondary)' }}>
            Select a tab to view response
          </div>
        )}
      </div>
      {isRunning && progress && (
        <div
          className="flex-shrink-0 px-4 py-2 flex items-center gap-2"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <Spinner size="sm" />
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {progress.completedCount}/{progress.totalCount} — {progress.modelName}
          </span>
        </div>
      )}
    </div>
  );
}
