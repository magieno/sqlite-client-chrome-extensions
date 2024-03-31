import cleanup from "rollup-plugin-cleanup";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";

export default [
  {
    input: 'out/tsc/sqlite-client.extension.js',
    output: {
      dir: 'dist/assets/js',
      format: 'esm',
      exports: "auto",
      compact: true,
    },
    plugins: [
      json(),
      nodeResolve({
        preferBuiltins: true,
      }),
    ]
  },

  // {
  //   input: 'out/tsc/service-worker.js',
  //   output: {
  //     dir: 'dist/assets/js',
  //     format: 'esm',
  //     exports: "auto",
  //     compact: true,
  //   },
  //   plugins: [
  //     json(),
  //     nodeResolve({
  //       preferBuiltins: true,
  //     }),
  //   ]
  // },
  {
    input: 'out/tsc/devtools.js',
    output: {
      dir: 'dist/assets/js',
      format: 'esm',
      exports: "auto",
      compact: true,
    },
    plugins: [
      json(),
      nodeResolve({
        preferBuiltins: true,
      }),
    ]
  },
  {
    input: 'out/tsc/content-script.js',
    output: {
      dir: 'dist/assets/js',
      format: 'esm',
      exports: "auto",
      compact: true,
    },
    plugins: [
      json(),
      nodeResolve({
        preferBuiltins: true,
      }),
    ]
  },
  {
    input: 'out/tsc/ui.js',
    output: {
      dir: 'dist/assets/js',
      format: 'esm',
      exports: "auto",
      compact: true,
    },
    plugins: [
      json(),
      nodeResolve({
        preferBuiltins: true,
      }),
    ]
  },

]
