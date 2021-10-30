import { FunctionComponent, ComponentClass } from "react";

declare module "react/jsx-runtime" {
  import { createElement, ProviderExoticComponent } from "react";
  import { ReactFragment, ReactElement } from "react";

  type PropsObject<T> = {
    [key: string | number]: any;
    children: T;
  };

  type NodeType<P extends {}> = FunctionComponent<P> | ComponentClass<P> | ProviderExoticComponent<any> | string;

  interface ReactJSXRuntime {
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

  const ReactJSXRuntime: ReactJSXRuntime;
  export default ReactJSXRuntime;
}
