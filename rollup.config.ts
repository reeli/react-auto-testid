import path from "path";
import { babel } from "@rollup/plugin-babel";
// @ts-ignore
import { nodeResolve } from "@rollup/plugin-node-resolve";

const pkg = require(path.join(__dirname, "package.json"));

module.exports = {
  input: "src/jsx-runtime.tsx",
  output: {
    file: pkg.main,
    format: "cjs",
  },
  external:[
    "react"
  ],
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
        "@babel/preset-react"
      ],
      extensions: [".ts", ".tsx", ".mjs", "", ".jsx"],
    }),
  ],
};
