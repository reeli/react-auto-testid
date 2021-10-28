import { render } from "@testing-library/react";
import {Hello} from "../Hello";

describe("Hello",  () => {
  it("should render Foo correctly", async() => {
    const { findByTestId } = render(<Hello />);
    const fooNode = await findByTestId("fooParent.foo");

    expect(fooNode).toBeTruthy();
  });
});
