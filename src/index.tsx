import { render } from "react-dom";
import { Foo } from "./Foo";

const App = () => {
  return (
    <div>
      app
      <Foo testid-root={"parent"} />
    </div>
  );
};

// @ts-ignore
render(<App />, document.getElementById("app"));
