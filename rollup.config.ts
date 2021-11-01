import { babel } from "@rollup/plugin-babel";
// @ts-ignore
import { nodeResolve } from "@rollup/plugin-node-resolve";
import path from "path";
import commonjs from "@rollup/plugin-commonjs";

const pkg = require(path.join(__dirname, "package.json"));

const common = {
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    nodeResolve({
      extensions: [".ts", ".tsx", ".mjs", "", ".jsx"],
    }),
    commonjs({ sourceMap: false }),
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
    input: ["src/testid-config/cmd.ts"],
    output: {
      file: "cmd/index.js",
      format: "cjs",
    },
    ...common,
  },
];
