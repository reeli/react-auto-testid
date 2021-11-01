import { FunctionComponent, ComponentClass, ProviderExoticComponent, ReactFragment, ReactElement } from "react";
import * as EmotionReactJSXRuntime from "@emotion/react/jsx-runtime";
import OriginReactJSXRuntime from "react/jsx-runtime";

type PropsObject<T> = {
  [key: string | number]: any;
  children: T;
};

type NodeType<P extends {}> = FunctionComponent<P> | ComponentClass<P> | ProviderExoticComponent<any> | string;

interface TReactJSXRuntime {
  Fragment: ReactFragment;
  jsx: <P>(type: NodeType<P>, props: PropsObject<ReactElement | ReactElement[]>, key?: string | number) => ReactElement;
  jsxs: <P>(
    type: NodeType<P>,
    props: PropsObject<ReactElement | ReactElement[]>,
    key?: string | number,
  ) => ReactElement[];
}

interface Config {
  runtime: TReactJSXRuntime;
  testidKey: string;
  testidRoot: string;
}

interface Params {
  runtime?: "emotion" | "react";
  testidRoot?: string;
  testidKey?: string;
}

const DEFAULT_TESTID_ROOT = "testid-root";
const DEFAULT_TESTID_KEY = "data-testid";

export const createConfigByUserInput = ({ runtime, testidRoot, testidKey }: Params): Config => {
  return {
    runtime: runtime === "emotion" ? EmotionReactJSXRuntime : (OriginReactJSXRuntime as any),
    testidRoot: testidRoot || DEFAULT_TESTID_ROOT,
    testidKey: testidKey || DEFAULT_TESTID_KEY,
  };
};

export const getConfig = () =>
  createConfigByUserInput({
    runtime: "react",
    testidRoot: "testid-root",
    testidKey: "data-testid",
  });
