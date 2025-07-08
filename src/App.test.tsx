import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Todo App", () => {
  it("adds a new task", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Clean house" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(screen.getByText("Clean house")).toBeInTheDocument();
  });

  it("switches the task state (done)", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Feed a cat" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const task = screen.getByText("Feed a cat");
    fireEvent.click(task);

  });
});
