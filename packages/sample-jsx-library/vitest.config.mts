import { type UserConfig, type UserConfigFn } from 'vite';
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mts';

export default defineConfig((configEnv) =>
    mergeConfig(
        (viteConfig as UserConfigFn)(configEnv),
        defineConfig({
            test: {
                globals: true,
                environment: 'happy-dom',
                setupFiles: ['./test/setup-test-env.ts'],
                include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
            },
            // https://vitest.dev/guide/migration.html#removal-of-the-watchexclude-option
            server: {
                watch: {
                    ignored: ['.*\\/node_modules\\/.*', '.*\\/build\\/.*'],
                },
            },
        }) as UserConfig,
    ),
);
