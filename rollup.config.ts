import { babel } from "@rollup/plugin-babel";
// @ts-ignore
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const common = {
  external: ["react"],
  plugins: [
    commonjs(),
    nodeResolve({
      extensions: [".ts", ".tsx", ".mjs", "", ".jsx"],
    }),
    babel({
      babelrc: false,
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: true,
            },
          },
        ],
        ["@babel/preset-typescript"],
        "@babel/preset-react",
      ],
      extensions: [".ts", ".tsx", ".mjs", "", ".jsx"],
    }),
  ],
};

module.exports = [
  {
    input: ["src/jsx-runtime/jsx-runtime.tsx"],
    output: {
      file: "jsx-runtime/jsx-runtime.js",
      format: "cjs",
    },
    ...common,
  },
  {
    input: ["src/babel-preset/index.ts"],
    output: {
      file: "babel-preset/index.js",
      format: "cjs",
    },
    ...common,
  },
];
