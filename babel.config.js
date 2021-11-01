const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        node: true,
      },
    },
  ],
  ["@babel/preset-typescript"],
];

const plugins = [];

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV !== "production") {
  plugins.push([
    "@babel/plugin-transform-react-jsx",
    {
      runtime: "automatic",
      importSource: "src/jsx-runtime",
    },
  ]);
}

module.exports = {
  presets,
  plugins: [...plugins, "@emotion/babel-plugin"],
};
