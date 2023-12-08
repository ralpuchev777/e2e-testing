import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter Component", () => {
  test("it renders correctly", () => {
    render(<Counter />);
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  test("increment button increments the count", () => {
    render(<Counter />);
    fireEvent.click(screen.getByTestId("increment"));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  test("decrement button decrements the count", () => {
    render(<Counter />);
    fireEvent.click(screen.getByTestId("increment"));
    fireEvent.click(screen.getByTestId("decrement"));
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  test("reset button resets the count", () => {
    render(<Counter />);
    fireEvent.click(screen.getByTestId("increment"));
    fireEvent.click(screen.getByTestId("reset"));
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });
});
