import type { ModelResponse, ComparisonProgress } from '../../shared/types';
import { fetchModels, sendPrompt } from './openrouter-client';

export async function runPinger(
  apiKey: string,
  modelIds: string[],
  prompt: string,
  onProgress: (progress: ComparisonProgress) => void
): Promise<ModelResponse[]> {
  // Resolve model names
  let allModels;
  try {
    allModels = await fetchModels(apiKey);
  } catch {
    allModels = [];
  }

  const modelMap = new Map(allModels.map((m) => [m.id, m]));
  const responses: ModelResponse[] = [];
  const totalCount = modelIds.length;

  // Process models sequentially to avoid rate limiting
  for (let i = 0; i < modelIds.length; i++) {
    const modelId = modelIds[i];
    const modelInfo = modelMap.get(modelId);
    const modelName = modelInfo?.name || modelId.split('/').pop() || modelId;
    const provider = modelInfo?.provider || modelId.split('/')[0] || 'unknown';

    // Emit progress: running
    onProgress({
      modelId,
      modelName,
      status: 'running',
      completedCount: i,
      totalCount,
    });

    const startTime = Date.now();

    try {
      const result = await sendPrompt(apiKey, modelId, prompt);
      const responseTime = (Date.now() - startTime) / 1000;

      responses.push({
        modelId,
        modelName,
        provider,
        content: result.content,
        responseTime,
        timestamp: new Date().toISOString(),
        tokenUsage: result.tokenUsage,
      });

      // Emit progress: completed
      onProgress({
        modelId,
        modelName,
        status: 'completed',
        completedCount: i + 1,
        totalCount,
      });
    } catch (err: any) {
      const responseTime = (Date.now() - startTime) / 1000;

      responses.push({
        modelId,
        modelName,
        provider,
        content: '',
        error: err.message || String(err),
        responseTime,
        timestamp: new Date().toISOString(),
      });

      // Emit progress: error
      onProgress({
        modelId,
        modelName,
        status: 'error',
        completedCount: i + 1,
        totalCount,
      });
    }
  }

  return responses;
}
