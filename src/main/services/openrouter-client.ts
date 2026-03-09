import { OPENROUTER_MODELS_URL, OPENROUTER_CHAT_URL } from '../../shared/constants';
import type { AIModel } from '../../shared/types';

let cachedModels: AIModel[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function makeHeaders(apiKey: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
    'HTTP-Referer': 'https://github.com/RTG/ai-pinger',
    'X-Title': 'AI Pinger',
  };
}

export async function fetchModels(apiKey: string): Promise<AIModel[]> {
  // Return cached if valid
  if (cachedModels && Date.now() - cacheTimestamp < CACHE_TTL) {
    return cachedModels;
  }

  const response = await fetch(OPENROUTER_MODELS_URL, {
    headers: makeHeaders(apiKey),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch models: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const rawModels: unknown[] = data.data || data || [];

  const models: AIModel[] = rawModels
    .filter((m: any) => {
      const name = (m.name || m.id || '').toLowerCase();
      const id = (m.id || '').toLowerCase();
      return !name.includes('free') && !id.includes('free');
    })
    .map((m: any) => ({
      id: m.id || '',
      name: m.name || m.id || '',
      provider: m.id?.split('/')[0] || 'unknown',
      description: m.description || '',
      pricing: {
        prompt: parseFloat(m.pricing?.prompt) || 0,
        completion: parseFloat(m.pricing?.completion) || 0,
      },
      context_length: m.context_length || 0,
    }))
    .sort((a: AIModel, b: AIModel) => a.name.localeCompare(b.name));

  cachedModels = models;
  cacheTimestamp = Date.now();
  return models;
}

export async function sendPrompt(
  apiKey: string,
  modelId: string,
  prompt: string
): Promise<{ content: string; tokenUsage?: Record<string, number> }> {
  const response = await fetch(OPENROUTER_CHAT_URL, {
    method: 'POST',
    headers: makeHeaders(apiKey),
    body: JSON.stringify({
      model: modelId,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(
      `API error ${response.status}: ${response.statusText}${errorBody ? ` — ${errorBody}` : ''}`
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';
  const tokenUsage = data.usage || undefined;

  return { content, tokenUsage };
}

export function clearModelCache(): void {
  cachedModels = null;
  cacheTimestamp = 0;
}
