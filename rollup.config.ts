import { babel } from "@rollup/plugin-babel";
// @ts-ignore
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import path from "path";

const pkg = require(path.join(__dirname, "package.json"));

const common = {
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    json(),
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
      exclude: "node_modules/**",
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
  {
    input: ["src/testid-config/init.ts"],
    output: {
      file: "testid-config/init.js",
      format: "cjs",
    },
    ...common,
  },
];
