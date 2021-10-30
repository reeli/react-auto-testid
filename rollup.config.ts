import { babel } from "@rollup/plugin-babel";
// @ts-ignore
import { nodeResolve } from "@rollup/plugin-node-resolve";

const common = {
  external: ["react"],
  plugins: [
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
    input: ["src/jsx-runtime.tsx"],
    output: {
      file: "jsx-runtime.js",
      format: "cjs",
    },
    ...common,
  },
  {
    input: ["src/babel-preset-react-auto-testid/index.ts"],
    output: {
      file: "babel-preset-react-auto-testid.js",
      format: "cjs",
    },
    ...common,
  },
];
