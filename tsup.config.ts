import { defineConfig } from 'tsup';

export default defineConfig({
	format: ['cjs', 'esm'],
	entryPoints: ['./src/index.ts'],
	dts: true,
	clean: true,
	shims: true,
	skipNodeModulesBundle: true,
});
