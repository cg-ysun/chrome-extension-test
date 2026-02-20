import { defineConfig, PluginOption } from 'vite';
import type { ExternalOption } from 'rollup';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import libCss from 'vite-plugin-libcss';
import { visualizer } from 'rollup-plugin-visualizer';
import tsconfigPaths from 'vite-tsconfig-paths';
import yalcPlugin from '@cargurus/vite-plugin-yalc';

import path from 'node:path';
import { builtinModules } from 'node:module';
import pkg from './package.json';

const getExternal = (): ExternalOption => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const external: ExternalOption = Object.keys(pkg.dependencies || {})
        .concat(
            Object.keys(
                'peerDependencies' in pkg ? (pkg.peerDependencies as NonNullable<unknown>) : {},
            ),
        )
        .map((dep) => new RegExp(`^${dep}.*`));

    external.push(...builtinModules);

    return external;
};

export default defineConfig(({ command }) => ({
    plugins: [
        tsconfigPaths(),
        yalcPlugin('.') as PluginOption,
        libCss(),
        dts({ outDir: 'dist/types', rollupTypes: true }),
        react(
            command === 'build'
                ? {
                      jsxRuntime: 'classic',
                  }
                : undefined,
        ),
        visualizer({
            gzipSize: true,
            template: 'treemap',
        }) as PluginOption,
    ],
    build: {
        minify: false,
        reportCompressedSize: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.tsx'),
            fileName: (format, entryName) => {
                const ext = format === 'es' ? '.mjs' : '.cjs';
                return `${entryName}${ext}`;
            },
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: getExternal(),
        },
        sourcemap: true,
    },
}));
