import React, { createContext, FC, useContext, ReactElement } from "react";
import { config } from "./config";

const { ReactJSXRuntime, TESTID_KEY, TESTID_ROOT } = config();

const combineIds = (ids: Array<string | undefined> = []) => ids.filter((v) => !!v).join(".");

const TestidContext = createContext({
  name: "",
});

interface ConsumerProps {
  children?: ReactElement;
  role?: string;
  name?: string;

  [key: string]: any;
}

const ConsumeTestid: FC<ConsumerProps> = ({ children, ...otherProps }) => {
  const { name } = useContext(TestidContext);

  if (!children) {
    return null;
  }

  const nameOrRole = otherProps?.name || otherProps?.role;
  const testidOrNameOrRole = otherProps[TESTID_ROOT] || nameOrRole;
  const id = combineIds([name, nameOrRole]);
  const propsToChildren = id && !otherProps[TESTID_KEY] ? { ...otherProps, [TESTID_KEY]: id } : otherProps;

  if (testidOrNameOrRole) {
    const newName = combineIds([name, testidOrNameOrRole]);

    return (
      <TestidContext.Provider value={{ name: newName }}>
        {React.cloneElement(children, propsToChildren)}
      </TestidContext.Provider>
    );
  }

  return React.cloneElement(children, propsToChildren);
};

export const jsx = (...args: Parameters<typeof ReactJSXRuntime.jsx>) => {
  const [type, props, key] = args;

  return ReactJSXRuntime.jsx(ConsumeTestid, { ...props, children: ReactJSXRuntime.jsx(type, props, key) });
};

export const jsxs = (...args: Parameters<typeof ReactJSXRuntime.jsxs>) => {
  const [type, props, key] = args;

  return ReactJSXRuntime.jsx(ConsumeTestid, { ...props, children: ReactJSXRuntime.jsxs(type, props, key) });
};
