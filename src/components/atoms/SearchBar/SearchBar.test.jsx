import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("should render correctly", () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    )

    expect(screen.getByPlaceholderText("Digite para pesquisar...")).toBeInTheDocument();
  });

  it("should change input value when user type", () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    )

    const input = screen.getByPlaceholderText("Digite para pesquisar...");
    fireEvent.change(input, {target: {value: "A"}});
    expect(input.value).toBe("A");
  });

  it("should clear input value when user submit", () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    )

    const input = screen.getByPlaceholderText("Digite para pesquisar...");
    const button = screen.getByRole("button");
    fireEvent.change(input, {target: {value: "A"}});
    fireEvent.click(button);
    expect(input.value).toBe("");
  });


  it("should redirect to search page when user submit", () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    )

    const input = screen.getByPlaceholderText("Digite para pesquisar...");
    const button = screen.getByRole("button");
    fireEvent.change(input, {target: {value: "A"}});
    fireEvent.click(button);
    expect(window.location.pathname).toBe("/search");
  });
});