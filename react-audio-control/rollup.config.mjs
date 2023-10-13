import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import image from '@rollup/plugin-image';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import scss from 'rollup-plugin-scss'

import {createRequire} from 'module';

const require = createRequire(import.meta.url);

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        strict: false
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      scss({
        output: 'dist/react-audio-control.css'
      }),
      commonjs(),
      typescript({tsconfig: './tsconfig.json'}),
      image()
    ],
    external: ['react', 'react-dom', 'styled-components'],
  },
  {
    input: 'src/index.ts',
    output: [{
      file: 'dist/index.d.ts',
      format: 'esm'
    }],
    external: [/\.s?css$/],
    plugins: [dts()],
  },
];
