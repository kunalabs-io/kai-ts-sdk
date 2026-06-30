import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  fixedExtension: false,
  clean: false,
  tsconfig: 'tsconfig.build.json',
})
