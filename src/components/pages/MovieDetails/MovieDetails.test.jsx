import { BrowserRouter } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import {render, screen, waitFor} from "@testing-library/react";
import {rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
const apiKey = import.meta.env.VITE_API_KEY;

describe("MovieDetails", () => {
  const server = setupServer(
    rest.get(`https://api.themoviedb.org/3/movie/976573?${apiKey}`, (req, res, ctx) => {
      const id = req.url.searchParams;
      return res(
        ctx.status(200),
        ctx.json(id, 
          {
            "adult": false,
            "backdrop_path": "/jZIYaISP3GBSrVOPfrp98AMa8Ng.jpg",
            "belongs_to_collection": null,
            "budget": 200000000,
            "genres": [
                {
                    "id": 16,
                    "name": "Animação"
                },
                {
                    "id": 35,
                    "name": "Comédia"
                },
                {
                    "id": 10751,
                    "name": "Família"
                },
                {
                    "id": 14,
                    "name": "Fantasia"
                },
                {
                    "id": 10749,
                    "name": "Romance"
                }
            ],
            "homepage": "",
            "id": 976573,
            "imdb_id": "tt15789038",
            "original_language": "en",
            "original_title": "Elemental",
            "overview": "Em uma cidade onde moradores do fogo, da água, da terra e do ar vivem juntos, uma jovem impetuosa e um homem tranquilo estão prestes a descobrir algo elementar: o quanto realmente têm em comum.",
            "popularity": 5517.032,
            "poster_path": "/cfXO8gMTz484ItS0AANhGS4v4b5.jpg",
            "production_companies": [
                {
                    "id": 2,
                    "logo_path": "/wdrCwmRnLFJhEoH8GSfymY85KHT.png",
                    "name": "Walt Disney Pictures",
                    "origin_country": "US"
                },
                {
                    "id": 3,
                    "logo_path": "/1TjvGVDMYsj6JBxOAkUHpPEwLf7.png",
                    "name": "Pixar",
                    "origin_country": "US"
                }
            ],
            "production_countries": [
                {
                    "iso_3166_1": "US",
                    "name": "United States of America"
                }
            ],
            "release_date": "2023-06-14",
            "revenue": 444822015,
            "runtime": 102,
            "spoken_languages": [
                {
                    "english_name": "English",
                    "iso_639_1": "en",
                    "name": "English"
                }
            ],
            "status": "Released",
            "tagline": "Os opostos se atraem.",
            "title": "Elementos",
            "video": false,
            "vote_average": 7.742,
            "vote_count": 1211
        })
      )
    })
  ) 

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render correctly", () => {
    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    )

    const movieDetailsTitle = screen.getByText("Voltar");
    expect(movieDetailsTitle).toBeInTheDocument();
  });

  it("should call fetchMovieDetailsData and render movie details", async () => {
    render(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    )
    waitFor(() => {
      const movieDetailsTitle = screen.getByText("Elementos")
      expect(movieDetailsTitle).toBeInTheDocument();
    });
  });
});