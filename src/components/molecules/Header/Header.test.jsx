import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";


describe("Header", () => {
  it("should render correctly", () => {
    render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
    )

    expect(screen.getByText("the movies")).toBeInTheDocument();
    expect(screen.getByText("Filmes")).toBeInTheDocument();
    expect(screen.getByText("Séries")).toBeInTheDocument();
  });


  it("should change NavLink style when click on 'Filmes'", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
      )

      const linkFilmes = screen.getByText("Filmes");
      fireEvent.click(linkFilmes);

      expect(linkFilmes).toHaveStyle({
        color: "#D1FF00",
        fontWeight: "600",
      });
    })

    it("should render SearchBar", () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
        )

      expect(screen.getByPlaceholderText("Digite para pesquisar...")).toBeInTheDocument();
    }
  );
});