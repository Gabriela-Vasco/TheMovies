import { BrowserRouter } from "react-router-dom";
import Carousel from "./Carousel";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Carousel", () => {
  it("should render correctly", async () => {
    render(
      <BrowserRouter>
        <Carousel />
      </BrowserRouter>
    )
     
    const carousel = await screen.findByTestId("carousel");
    expect(carousel).toBeInTheDocument();
  });

  it("should render 8 images", async () => {
    render(
      <BrowserRouter>
        <Carousel />
      </BrowserRouter>
    )
     
    const img0 = await screen.findByTestId("img0");
    const img1 = await screen.findByTestId("img1");
    const img2 = await screen.findByTestId("img2");
    const img3 = await screen.findByTestId("img3");
    const img4 = await screen.findByTestId("img4");
    const img5 = await screen.findByTestId("img5");
    const img6 = await screen.findByTestId("img6");
    const img7 = await screen.findByTestId("img7");

    expect(img0, img1, img2, img3, img4, img5, img6, img7).toBeInTheDocument();
  });
});