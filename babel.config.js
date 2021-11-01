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

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV !== "production") {
  presets.push(["react-auto-testid/babel-preset"]);
}

module.exports = {
  presets,
  plugins: ["@emotion/babel-plugin"],
};
