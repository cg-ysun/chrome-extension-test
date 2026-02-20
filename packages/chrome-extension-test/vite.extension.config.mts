import { defineConfig, Plugin } from 'vite';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

/**
 * Custom plugin that processes src/manifest.json by replacing
 * __VITE_*__ placeholders with the corresponding env variable values,
 * and copies static extension files to the output directory.
 */
function chromeExtensionBuild(): Plugin {
    const outDir = 'extension-dist';

    return {
        name: 'chrome-extension-build',
        closeBundle() {
            mkdirSync(outDir, { recursive: true });

            // Process manifest.json – replace __VITE_*__ placeholders with env values
            let manifest = readFileSync(
                path.resolve(__dirname, 'src/manifest.json'),
                'utf-8',
            );
            manifest = manifest.replace(/__(\w+)__/g, (_match, varName) => {
                return process.env[varName] ?? _match;
            });
            writeFileSync(path.resolve(outDir, 'manifest.json'), manifest);

            // Copy popup.html
            copyFileSync(
                path.resolve(__dirname, 'src/popup.html'),
                path.resolve(outDir, 'popup.html'),
            );

            console.log('Chrome extension files written to', outDir);
        },
    };
}

export default defineConfig({
    plugins: [chromeExtensionBuild()],
    build: {
        // We only need the plugin side-effects; emit an empty build
        outDir: 'extension-dist',
        emptyOutDir: true,
        rollupOptions: {
            input: path.resolve(__dirname, 'src/popup.html'),
        },
    },
});
