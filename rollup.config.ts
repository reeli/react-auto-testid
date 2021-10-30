import path from "path";
// @ts-ignore
import rollupTypeScript from "@rollup/plugin-typescript";

const pkg = require(path.join(__dirname, "package.json"));

module.exports = {
  input: "src/jsx-runtime.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  plugins: [rollupTypeScript()],
};
