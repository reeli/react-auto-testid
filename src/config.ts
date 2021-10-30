import DefaultReactJSXRuntime from "react/jsx-runtime";
import {FunctionComponent, ComponentClass, ProviderExoticComponent, ReactFragment, ReactElement} from "react";

type PropsObject<T> = {
  [key: string | number]: any;
  children: T;
};

type NodeType<P extends {}> = FunctionComponent<P> | ComponentClass<P> | ProviderExoticComponent<any> | string;

interface TReactJSXRuntime {
  Fragment: ReactFragment;
  jsx: <P>(
    type: NodeType<P>,
    props: PropsObject<ReactElement | ReactElement[]>,
    key?: string | number,
  ) => ReactElement;
  jsxs: <P>(
    type: NodeType<P>,
    props: PropsObject<ReactElement | ReactElement[]>,
    key?: string | number,
  ) => ReactElement[];
}

interface Props {
  ReactJSXRuntime?: TReactJSXRuntime;
  TESTID_KEY?: string;
  TESTID_ROOT?: string;
}

const DEFAULT_TESTID_ROOT = "testid-root";
const DEFAULT_TESTID_KEY = "data-testid";


export const config = ({
                         ReactJSXRuntime = DefaultReactJSXRuntime as any,
                         TESTID_KEY = DEFAULT_TESTID_KEY,
                         TESTID_ROOT = DEFAULT_TESTID_ROOT
                       }: Props = {}) => {
  return {
    ReactJSXRuntime,
    TESTID_KEY,
    TESTID_ROOT
  }
}

