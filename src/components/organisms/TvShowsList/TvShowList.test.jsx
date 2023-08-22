import { BrowserRouter } from "react-router-dom";
import TvShowsList from "./TvShowsList";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom"; 

const apiKey = import.meta.env.VITE_API_KEY;

describe("TvShowList", () => {
  const server = setupServer(
    rest.get(`https://api.themoviedb.org/3/tv?${apiKey}`, (req, res, ctx) => {
      const id = req.url.searchParams;
      return res(
        ctx.status(200),
        ctx.json(id, 
          {
            "adult": false,
            "backdrop_path": "/oOce9hLMVFubjAJliau4kiSNPnW.jpg",
            "created_by": [
                {
                    "id": 117443,
                    "credit_id": "5253851c19c2957940204dd0",
                    "name": "Dick Wolf",
                    "gender": 2,
                    "profile_path": "/tRMEuYNVFjXYJ7gh1sGJSxq9Vwq.jpg"
                }
            ],
            "episode_run_time": [
                42
            ],
            "first_air_date": "1990-09-13",
            "genres": [
                {
                    "id": 80,
                    "name": "Crime"
                },
                {
                    "id": 18,
                    "name": "Drama"
                }
            ],
            "homepage": "http://www.nbc.com/law-order",
            "id": 549,
            "in_production": true,
            "languages": [
                "en"
            ],
            "last_air_date": "2023-05-18",
            "last_episode_to_air": {
                "id": 4358259,
                "name": "Episódio 22",
                "overview": "",
                "vote_average": 8.5,
                "vote_count": 2,
                "air_date": "2023-05-18",
                "episode_number": 22,
                "episode_type": "finale",
                "production_code": "",
                "runtime": null,
                "season_number": 22,
                "show_id": 549,
                "still_path": "/2VVoBy4sitPSftiD4DsugVHDoBx.jpg"
            },
            "name": "Lei & Ordem",
            "next_episode_to_air": null,
            "networks": [
                {
                    "id": 6,
                    "logo_path": "/cm111bsDVlYaC1foL0itvEI4yLG.png",
                    "name": "NBC",
                    "origin_country": "US"
                }
            ],
            "number_of_episodes": 488,
            "number_of_seasons": 22,
            "origin_country": [
                "US"
            ],
            "original_language": "en",
            "original_name": "Law & Order",
            "overview": "O drama mostra o processo complicado de determinar a culpa ou a inocência, quando vidas estão em jogo. Muitas vezes inspirado pelas notícias mais recentes, o enredo destaca dilemas éticos e pessoais.",
            "popularity": 6293.06,
            "poster_path": "/1Opw4Qfiza2Uk5ENZgLWVmQyzoL.jpg",
            "production_companies": [
                {
                    "id": 25545,
                    "logo_path": "/jH9KNT9C9fYMrGqD4IKLlRL6MYN.png",
                    "name": "Wolf Entertainment",
                    "origin_country": "US"
                },
                {
                    "id": 26727,
                    "logo_path": "/jeTxdjXhzgKZyLr3l9MllkTn3fy.png",
                    "name": "Universal Television",
                    "origin_country": "US"
                },
                {
                    "id": 8301,
                    "logo_path": "/zrcVDabl14MNfPwxL8DC2IyR12t.png",
                    "name": "Universal Media Studios",
                    "origin_country": "US"
                }
            ],
            "production_countries": [
                {
                    "iso_3166_1": "US",
                    "name": "United States of America"
                }
            ],
            "seasons": [
                {
                    "air_date": null,
                    "episode_count": 7,
                    "id": 1684,
                    "name": "Especiais",
                    "overview": "",
                    "poster_path": "/vVUVEqs0KwplqHvv2GyCj2tpMSr.jpg",
                    "season_number": 0,
                    "vote_average": 0.0
                },
                {
                    "air_date": "1990-09-13",
                    "episode_count": 22,
                    "id": 1664,
                    "name": "Temporada 1",
                    "overview": "",
                    "poster_path": "/hGrkBU5p60zZj9bMByo9cegZfhl.jpg",
                    "season_number": 1,
                    "vote_average": 7.3
                },
                {
                    "air_date": "1991-09-17",
                    "episode_count": 22,
                    "id": 1665,
                    "name": "Temporada 2",
                    "overview": "",
                    "poster_path": "/nykyEGoMsVPnyrnoUL0g93YJPQZ.jpg",
                    "season_number": 2,
                    "vote_average": 7.3
                },
                {
                    "air_date": "1992-09-23",
                    "episode_count": 22,
                    "id": 1666,
                    "name": "Temporada 3",
                    "overview": "",
                    "poster_path": "/emKji2D1tLAJsFad84ENA4PufI5.jpg",
                    "season_number": 3,
                    "vote_average": 7.2
                },
                {
                    "air_date": "1993-09-15",
                    "episode_count": 22,
                    "id": 1667,
                    "name": "Temporada 4",
                    "overview": "",
                    "poster_path": "/fiSP98l9G7zjC0sBWwQ02Nmhpub.jpg",
                    "season_number": 4,
                    "vote_average": 7.3
                },
                {
                    "air_date": "1994-09-21",
                    "episode_count": 23,
                    "id": 1668,
                    "name": "Temporada 5",
                    "overview": "",
                    "poster_path": "/v8yqfobOp6jSDomgcOnotfsGM2i.jpg",
                    "season_number": 5,
                    "vote_average": 7.4
                },
                {
                    "air_date": "1995-09-20",
                    "episode_count": 23,
                    "id": 1669,
                    "name": "Temporada 6",
                    "overview": "",
                    "poster_path": "/5GaJYO3BXCUaHKXr9e7wC1IARwo.jpg",
                    "season_number": 6,
                    "vote_average": 7.6
                },
                {
                    "air_date": "1996-09-18",
                    "episode_count": 23,
                    "id": 1671,
                    "name": "Temporada 7",
                    "overview": "",
                    "poster_path": "/mEGBAiPkZcp4GgPv7CQmFhOEWrK.jpg",
                    "season_number": 7,
                    "vote_average": 7.5
                },
                {
                    "air_date": "1997-09-24",
                    "episode_count": 24,
                    "id": 1670,
                    "name": "Temporada 8",
                    "overview": "",
                    "poster_path": "/35bYc6LYxA8L8pCm2Pxl3dCIqq5.jpg",
                    "season_number": 8,
                    "vote_average": 7.4
                },
                {
                    "air_date": "1998-09-23",
                    "episode_count": 24,
                    "id": 1672,
                    "name": "Temporada 9",
                    "overview": "",
                    "poster_path": "/2mW0rzeZqqCYwpC84GEm4vDyckB.jpg",
                    "season_number": 9,
                    "vote_average": 7.5
                },
                {
                    "air_date": "1999-09-22",
                    "episode_count": 24,
                    "id": 1673,
                    "name": "Temporada 10",
                    "overview": "",
                    "poster_path": "/A3VQXxgkwnUgDOEo1rG1QpvgV2c.jpg",
                    "season_number": 10,
                    "vote_average": 7.4
                },
                {
                    "air_date": "2000-10-18",
                    "episode_count": 24,
                    "id": 1675,
                    "name": "Temporada 11",
                    "overview": "",
                    "poster_path": "/u5MyTy53EWtnsMQewECGfNDywme.jpg",
                    "season_number": 11,
                    "vote_average": 7.2
                },
                {
                    "air_date": "2001-09-26",
                    "episode_count": 24,
                    "id": 1674,
                    "name": "Temporada 12",
                    "overview": "",
                    "poster_path": "/xAazzYBfFquWWqes5dozpQ0x4jW.jpg",
                    "season_number": 12,
                    "vote_average": 7.3
                },
                {
                    "air_date": "2002-10-02",
                    "episode_count": 24,
                    "id": 1676,
                    "name": "Temporada 13",
                    "overview": "",
                    "poster_path": "/2DzgIJzKVY9OfYxRMJjJLIZRhfi.jpg",
                    "season_number": 13,
                    "vote_average": 7.4
                },
                {
                    "air_date": "2003-09-24",
                    "episode_count": 24,
                    "id": 1677,
                    "name": "Temporada 14",
                    "overview": "",
                    "poster_path": "/26ByCQKroHuBs7ZgbkwHTsHvU77.jpg",
                    "season_number": 14,
                    "vote_average": 7.3
                },
                {
                    "air_date": "2004-09-22",
                    "episode_count": 24,
                    "id": 1678,
                    "name": "Temporada 15",
                    "overview": "",
                    "poster_path": "/z07aBZ5euhdhl0hyzWhwU1mGsrN.jpg",
                    "season_number": 15,
                    "vote_average": 7.2
                },
                {
                    "air_date": "2005-09-21",
                    "episode_count": 22,
                    "id": 1680,
                    "name": "Temporada 16",
                    "overview": "",
                    "poster_path": "/vo1hHZ1Bpt7XOYDqab7rqw5VTZL.jpg",
                    "season_number": 16,
                    "vote_average": 7.1
                },
                {
                    "air_date": "2006-09-22",
                    "episode_count": 22,
                    "id": 1679,
                    "name": "Temporada 17",
                    "overview": "",
                    "poster_path": "/zjSZrjqz9f3n6XoPYpaIgzwDQT3.jpg",
                    "season_number": 17,
                    "vote_average": 7.0
                },
                {
                    "air_date": "2008-01-02",
                    "episode_count": 18,
                    "id": 1682,
                    "name": "Temporada 18",
                    "overview": "",
                    "poster_path": "/q0nVi8xzk7DHpeFnQ678f8asYxC.jpg",
                    "season_number": 18,
                    "vote_average": 7.4
                },
                {
                    "air_date": "2008-11-05",
                    "episode_count": 22,
                    "id": 1681,
                    "name": "Temporada 19",
                    "overview": "",
                    "poster_path": "/fIIoj3EzsHcgF9Yd0ISWKinmLX8.jpg",
                    "season_number": 19,
                    "vote_average": 7.1
                },
                {
                    "air_date": "2009-09-25",
                    "episode_count": 23,
                    "id": 1683,
                    "name": "Temporada 20",
                    "overview": "",
                    "poster_path": "/yoISWagCsb16Hnoi16Ot1nur2FV.jpg",
                    "season_number": 20,
                    "vote_average": 7.0
                },
                {
                    "air_date": "2022-02-24",
                    "episode_count": 10,
                    "id": 219379,
                    "name": "Temporada 21",
                    "overview": "",
                    "poster_path": "/dEDC93cV4n4oJuIEzTCBfPM8dCs.jpg",
                    "season_number": 21,
                    "vote_average": 7.9
                },
                {
                    "air_date": "2022-09-22",
                    "episode_count": 22,
                    "id": 299108,
                    "name": "Temporada 22",
                    "overview": "",
                    "poster_path": "/1Opw4Qfiza2Uk5ENZgLWVmQyzoL.jpg",
                    "season_number": 22,
                    "vote_average": 7.9
                }
            ],
            "spoken_languages": [
                {
                    "english_name": "English",
                    "iso_639_1": "en",
                    "name": "English"
                }
            ],
            "status": "Returning Series",
            "tagline": "",
            "type": "Scripted",
            "vote_average": 7.58,
            "vote_count": 437
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
        <TvShowsList />
      </BrowserRouter>
    )

    const showsListSort = screen.getByText("Ordenar por");
    expect(showsListSort).toBeInTheDocument();
  });

  it("should fetch data and render tv shows", async () => {
    render(
      <BrowserRouter>
        <TvShowsList/>
      </BrowserRouter>
    )
    waitFor(() => {
      const show = screen.getByAltText(/Lei & Ordem (1990)/)
      expect(show).toBeInTheDocument();
    });
  });

  it("should change page when next page button is clicked", async () => { 
    render(
      <BrowserRouter>
        <TvShowsList/>
      </BrowserRouter>
    )
    const button = screen.getByTestId("next-page-button");
    fireEvent.click(button);
    const page = screen.getByText("2");

    expect(page).toBeInTheDocument();
  });

  it("should change page when prev page button is clicked", async () => { 
    render(
      <BrowserRouter>
        <TvShowsList/>
      </BrowserRouter>
    )
    const buttonNext = screen.getByTestId("next-page-button");
    fireEvent.click(buttonNext);
    const buttonPrev = screen.getByTestId("prev-page-button");
    fireEvent.click(buttonPrev);
    const page = screen.getByText("1");

    expect(page).toBeInTheDocument();
  });

  it("should change genre when button is clicked", async () => {
    render(
      <BrowserRouter>
        <TvShowsList/>
      </BrowserRouter>
    )

    const button = screen.getByTestId("genre-button");
    fireEvent.click(button);
    const btn = screen.getByRole("button", {name: "Ação e Aventura"});
    expect(btn).toHaveClass("buttons__button--purple");

  });
});