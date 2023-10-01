import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import image from '@rollup/plugin-image';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        strict: false
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      image(),
      css({
        output: 'react-audio-control.css'
      })
    ],
    external: ["react", "react-dom", "styled-components"],
  },
  {
    input: "src/index.ts",
    output: [{
      file: "dist/index.d.ts",
      format: "esm"
    }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
