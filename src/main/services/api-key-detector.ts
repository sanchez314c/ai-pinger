import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync } from 'node:child_process';

const ENV_VAR_NAME = 'OPENROUTER_API_KEY';

export function detectApiKey(): string | null {
  // Method 1: Direct environment variable
  const envKey = process.env[ENV_VAR_NAME];
  if (envKey?.trim()) {
    return envKey.trim();
  }

  // Method 2: Read from shell config files
  const homeDir = os.homedir();
  const shellFiles = [
    path.join(homeDir, '.zshrc'),
    path.join(homeDir, '.bashrc'),
    path.join(homeDir, '.bash_profile'),
    path.join(homeDir, '.profile'),
  ];

  const exportPattern = /export\s+OPENROUTER_API_KEY\s*=\s*["']?([^"'#\n\r]+)["']?/;

  for (const shellFile of shellFiles) {
    try {
      if (!fs.existsSync(shellFile)) continue;
      const content = fs.readFileSync(shellFile, 'utf-8');
      const lines = content.split('\n');

      // Get the last matching export (most recent)
      let lastMatch: string | null = null;
      for (const line of lines) {
        const match = line.match(exportPattern);
        if (match?.[1]) {
          const value = match[1].trim();
          if (value && !value.startsWith('$')) {
            lastMatch = value;
          }
        }
      }

      if (lastMatch) {
        return lastMatch;
      }
    } catch {
      // Ignore read errors
    }
  }

  // Method 3: Try printenv subprocess
  try {
    const result = execSync(`printenv ${ENV_VAR_NAME}`, {
      timeout: 5000,
      encoding: 'utf-8',
    }).trim();
    if (result) return result;
  } catch {
    // Ignore subprocess errors
  }

  return null;
}
