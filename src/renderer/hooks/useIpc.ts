import { useEffect } from 'react';

/**
 * Hook to listen for IPC events from main process
 */
export function useIpcEvent(channel: string, handler: (...args: any[]) => void) {
  useEffect(() => {
    // The electronAPI methods already handle listener setup
    // This hook is a convenience wrapper for custom IPC events
    const api = window.electronAPI as any;
    const eventMap: Record<string, string> = {
      'app:openSettings': 'onOpenSettings',
      'comparison:progress': 'onComparisonProgress',
    };

    const methodName = eventMap[channel];
    if (methodName && typeof api[methodName] === 'function') {
      const cleanup = api[methodName](handler);
      return cleanup;
    }
  }, [channel, handler]);
}
