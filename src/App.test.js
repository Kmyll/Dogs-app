import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
    const header = screen.getByText("The Dog App");
    expect(header).toBeInTheDocument();
  });

  test("displays error message when no option is selected and user submits form", async () => {
    render(<App />);
    const submitBtn = screen.getByRole("button", { name: "View images" });
    fireEvent.click(submitBtn);
    const errorMsg = await screen.findByText("Please select an option");
    expect(errorMsg).toBeInTheDocument();
  });

  test("displays error message when API returns an error", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok   : false,
        json : () => Promise.resolve({}),
      })
    );
    render(<App />);
    const breedSelect = await screen.findByLabelText("Dog breed");
    fireEvent.change(breedSelect, { target: { value: "poodle" } });
    const submitBtn = screen.getByRole("button", { name: "View images" });
    fireEvent.click(submitBtn);
    const errorMsg = await screen.findByText("Please select a breed");
    expect(errorMsg).toBeInTheDocument();
  });

  test("displays dog images when API call is successful", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok   : true,
        json : () =>
          Promise.resolve({
            message : [
              "https://images.dog.ceo/breeds/hound-english/n02089973_1169.jpg",
            ],
          }),
      })
    );
    render(<App />);
    const breedSelect = await screen.findByLabelText("Dog breed");
    fireEvent.change(breedSelect, { target: { value: "hound" } });
    const submitBtn = screen.getByRole("button", { name: "View images" });
    fireEvent.click(submitBtn);
    const dogImage = await screen.findByRole("img");
    expect(dogImage).toBeInTheDocument();
  });
});
