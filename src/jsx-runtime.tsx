import ReactJSXRuntime from "react/jsx-runtime";
import React, { createContext, FC, useContext, ReactElement } from "react";

export const Fragment = ReactJSXRuntime.Fragment;

const TESTID_ROOT = "testid-root";
const TESTID_KEY = "data-testid";

const combineIds = (ids: Array<string | undefined> = []) => ids.filter((v) => !!v).join(".");

const TestidContext = createContext({
  name: "",
});

const ConsumeName: FC<{ children: ReactElement; [TESTID_ROOT]: string }> = ({ children, ...otherProps }) => {
  const { name } = useContext(TestidContext);
  const newName = combineIds([name, otherProps[TESTID_ROOT]]);

  return <TestidContext.Provider value={{ name: newName }}>{children}</TestidContext.Provider>;
};

const ConsumeTestid: FC<{ children?: ReactElement; role?: string; name?: string }> = ({ children, ...otherProps }) => {
  const { name } = useContext(TestidContext);

  if (!children) {
    return null;
  }

  const id = combineIds([name, otherProps?.name || otherProps?.role]);
  return React.cloneElement(children, id ? { ...otherProps, [TESTID_KEY]: id } : otherProps);
};

export const jsx = (...args: Parameters<typeof ReactJSXRuntime.jsx>) => {
  const [type, props, key] = args;
  const children = ReactJSXRuntime.jsx(type, props, key);

  if (props[TESTID_ROOT]) {
    return ReactJSXRuntime.jsx(ConsumeName, { ...props, children });
  }

  return ReactJSXRuntime.jsx(ConsumeTestid, { ...props, children });
};

export const jsxs = (...args: Parameters<typeof ReactJSXRuntime.jsxs>) => {
  const [type, props, key] = args;
  const children = ReactJSXRuntime.jsxs(type, props, key);

  if (props[TESTID_ROOT]) {
    return ReactJSXRuntime.jsx(ConsumeName, { ...props, children });
  }
  return ReactJSXRuntime.jsx(ConsumeTestid, { ...props, children });
};
