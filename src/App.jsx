import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './components/templates/Layout/Layout'
import Home from './components/pages/Home/Home'
import MoviesList from "../src/components/organisms/MoviesList/MoviesList";
import TvShowsList from "../src/components/organisms/TvShowsList/TvShowsList";
import MovieDetails from "../src/components/pages/MovieDetails/MovieDetails";
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="filmes" element={<MoviesList /> } />
          <Route path="filmes/:id" element={<MovieDetails />} />
          <Route path="series" element={<TvShowsList /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
