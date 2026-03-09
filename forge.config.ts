import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { VitePlugin } from '@electron-forge/plugin-vite';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: 'AI Pinger',
    executableName: 'ai-pinger',
    icon: './resources/icons/icon',
  },
  makers: [
    new MakerZIP({}, ['linux', 'darwin', 'win32']),
    new MakerDeb({
      options: {
        name: 'ai-pinger',
        productName: 'AI Pinger',
        genericName: 'AI Model Comparison Tool',
        description: 'Test and compare multiple AI models from OpenRouter.ai side-by-side',
        categories: ['Development', 'Utility'],
        icon: './resources/icons/icon.png',
      },
    }),
  ],
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: 'src/main/index.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/main/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
  ],
};

export default config;
