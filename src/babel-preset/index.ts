module.exports = () => {
  return {
    plugins: [
      [
        "@babel/plugin-transform-react-jsx",
        {
          runtime: "automatic",
          importSource: "react-auto-testid/jsx-runtime",
        },
      ],
    ],
  };
};
