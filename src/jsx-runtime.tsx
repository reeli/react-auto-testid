import ReactJSXRuntime from "react/jsx-runtime";
import React, { createContext, FC, useContext, ReactElement } from "react";

export const Fragment = ReactJSXRuntime.Fragment;

const TESTID_ROOT = "testid-root";
const TESTID_KEY = "data-test-id";

const TestidContext = createContext({
  name: "",
});

const Testid: FC<{ children?: ReactElement; role?: string }> = ({ children, ...otherProps }) => {
  const { name } = useContext(TestidContext);

  if (!children) {
    return null;
  }

  console.log(name, 'children');
  return React.cloneElement(children, {
    ...(otherProps || {}),
    [TESTID_KEY]: [name, otherProps?.role].join("."),
  });
};

export const jsx = (...args: Parameters<typeof ReactJSXRuntime.jsx>) => {
  const [type, props, key] = args;
  const children = ReactJSXRuntime.jsx(type, props, key);

  if (props[TESTID_ROOT]) {
    return ReactJSXRuntime.jsx(
      TestidContext.Provider,
      {
        value: { name: props[TESTID_ROOT] },
        children,
      },
    );
  }

  return ReactJSXRuntime.jsx(Testid, { ...props, children });
};

export const jsxs = (...args: Parameters<typeof ReactJSXRuntime.jsxs>) => {
  const [type, props, key] = args;
  const children = ReactJSXRuntime.jsxs(type, props, key);

  if (props[TESTID_ROOT]) {
    return ReactJSXRuntime.jsx(
      TestidContext.Provider,
      {
        value: { name: props[TESTID_ROOT] },
        children,
      },
    );
  }
  return ReactJSXRuntime.jsx(Testid, { ...props, children });
};
