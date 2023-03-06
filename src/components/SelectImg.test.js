import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SelectImg from "./SelectImg";

describe("SelectImg component", () => {
  it("renders a label with correct text", () => {
    render(<SelectImg />);
    expect(
      screen.getByText(/number of images to be displayed/i)
    ).toBeInTheDocument();
  });

  it("renders a select input with options from 1 to 10", () => {
    render(<SelectImg />);
    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it("calls setImageNum function with correct value when an option is selected", () => {
    const setImageNum = jest.fn();
    render(<SelectImg imageNum={5} setImageNum={setImageNum} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "8" } });
    expect(setImageNum).toHaveBeenCalledWith(8);
  });

  it("adds red class to select input when errorMessage is true", () => {
    render(<SelectImg errorMessage={true} />);
    expect(screen.getByRole("combobox")).toHaveClass("selectInput__red");
  });
});
