import React from "react";
import { render, screen } from "@testing-library/react";
import SelectComponent from "./SelectComponent";

describe("SelectComponent", () => {
  const options = [ "Option 1", "Option 2", "Option 3" ];
  const onChange = jest.fn();
  const selectedOption = "Option 2";

  it("renders label and options correctly", () => {
    render(
      <SelectComponent
        label='Select an option'
        options={options}
        value={selectedOption}
        onChange={onChange}
      />
    );
    const label = screen.getByLabelText(/select an option/i);
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Select an option");

    const selectInput = screen.getByRole("combobox", {
      name : /select an option/i,
    });
    expect(selectInput).toBeInTheDocument();
    expect(selectInput).toHaveValue("Option 2");
    expect(selectInput).toHaveAttribute("name", "dogs");

    const option1 = screen.getByText("Option 1");
    const option2 = screen.getByText("Option 2");
    const option3 = screen.getByText("Option 3");
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });

  it("displays error message correctly", () => {
    const errorMessage = "Please select an option";
    render(
      <SelectComponent
        label='Select an option'
        options={options}
        value=''
        onChange={onChange}
        errorMessage={errorMessage}
        error={true}
      />
    );
    const error = screen.getByText(errorMessage);
    expect(error).toBeInTheDocument();

    const selectInput = screen.getByRole("combobox", {
      name : /select an option/i,
    });
    expect(selectInput).toHaveClass("selectInput__red");
  });
});
