declare module "react/jsx-runtime" {
  import { createElement, ProviderExoticComponent } from "react";
  import { ReactFragment, ReactElement } from "react";

  type PropsObject<T> = {
    [key: string | number]: any;
    children: T;
  };

  type NodeType = Parameters<typeof createElement>[0] | ProviderExoticComponent<any>;

  interface ReactJSXRuntime {
    Fragment: ReactFragment;
    jsx: (type: NodeType, props: PropsObject<ReactElement | ReactElement[]>, key?: string | number) => ReactElement;
    jsxs: (type: NodeType, props: PropsObject<ReactElement | ReactElement[]>, key?: string | number) => ReactElement[];
  }

  const ReactJSXRuntime: ReactJSXRuntime;
  export default ReactJSXRuntime;
}
