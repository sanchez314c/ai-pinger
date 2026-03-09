import React, { useState } from 'react';
import { Modal } from '../shared/Modal';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { useAppStore } from '../../stores/app-store';

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const { settings, saveSettings, loadModels } = useAppStore();
  const [apiKey, setApiKey] = useState(settings.api_key);
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSettings({ ...settings, api_key: apiKey });
      await loadModels();
      onClose();
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="Settings" onClose={onClose}>
      <div className="space-y-5">
        {/* API Key */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            OpenRouter.ai API Key
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-..."
              className="input-field pr-20"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs transition-colors px-2 py-1 bg-transparent border-none cursor-pointer"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Get your API key from{' '}
            <span style={{ color: 'var(--accent-teal)' }}>openrouter.ai/keys</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save & Close'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
