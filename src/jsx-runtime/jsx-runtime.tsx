import { createContext, FC, useContext, ReactElement, cloneElement, Fragment as ReactFragment } from "react";
import { getConfig } from "../testid-config/config";

const { runtime, testidKey, testidRoot } = getConfig();

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
  const testidOrNameOrRole = otherProps[testidRoot] || nameOrRole;
  const id = combineIds([name, nameOrRole]);
  const propsToChildren = id && !otherProps[testidKey] ? { ...otherProps, [testidKey]: id } : otherProps;

  if (testidOrNameOrRole) {
    const newName = combineIds([name, testidOrNameOrRole]);

    return (
      <TestidContext.Provider value={{ name: newName }}>
        {cloneElement(children, propsToChildren)}
      </TestidContext.Provider>
    );
  }

  return cloneElement(children, propsToChildren);
};

export const Fragment = ReactFragment;

export const jsx = (...args: Parameters<typeof runtime.jsx>) => {
  const [type, props, key] = args;

  return runtime.jsx(ConsumeTestid, { ...props, children: runtime.jsx(type, props, key) });
};

export const jsxs = (...args: Parameters<typeof runtime.jsxs>) => {
  const [type, props, key] = args;

  return runtime.jsx(ConsumeTestid, { ...props, children: runtime.jsxs(type, props, key) });
};
