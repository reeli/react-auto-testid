import ReactJSXRuntime from "react/jsx-runtime";
import React, { createContext, FC, useContext, ReactElement } from "react";

export const Fragment = ReactJSXRuntime.Fragment;

const TESTID_ROOT = "testid-root";
const TESTID_KEY = "data-testid";

const combineIds = (ids: Array<string | undefined> = []) => ids.filter((v) => !!v).join(".");

const TestidContext = createContext({
  name: "",
});

const ConsumeTestid: FC<{ children?: ReactElement; role?: string; name?: string; [TESTID_ROOT]: string }> = ({
  children,
  ...otherProps
}) => {
  const { name } = useContext(TestidContext);

  if (!children) {
    return null;
  }

  const id = combineIds([name, otherProps?.name || otherProps?.role]);

  if (otherProps[TESTID_ROOT] || otherProps?.name || otherProps?.role) {
    const newName = combineIds([name, otherProps[TESTID_ROOT] || otherProps?.name || otherProps?.role]);

    return (
      <TestidContext.Provider value={{ name: newName }}>
        {React.cloneElement(children, id ? { ...otherProps, [TESTID_KEY]: id } : otherProps)}
      </TestidContext.Provider>
    );
  }

  return React.cloneElement(children, id ? { ...otherProps, [TESTID_KEY]: id } : otherProps);
};

export const jsx = (...args: Parameters<typeof ReactJSXRuntime.jsx>) => {
  const [type, props, key] = args;

  return ReactJSXRuntime.jsx(ConsumeTestid, { ...props, children: ReactJSXRuntime.jsx(type, props, key) });
};

export const jsxs = (...args: Parameters<typeof ReactJSXRuntime.jsxs>) => {
  const [type, props, key] = args;

  return ReactJSXRuntime.jsx(ConsumeTestid, { ...props, children: ReactJSXRuntime.jsxs(type, props, key) });
};
