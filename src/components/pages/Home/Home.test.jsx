import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom"; 

const apiKey = import.meta.env.VITE_API_KEY;

describe("Home", () => {
  it("should render Home component", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const title = screen.getByText(/Todos os seus filmes e séries preferidos/);
    expect(title).toBeInTheDocument();
  });

  it("should render carousel images", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    await waitFor(() => {
      const img = screen.getByTestId("img0")
      expect(img).toBeInTheDocument();
    });
  });
});