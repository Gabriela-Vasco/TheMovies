import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './components/templates/Layout/Layout'
import Home from './components/pages/Home/Home'
import MoviesList from "../src/components/organisms/MoviesList/MoviesList";
import TvShowsList from "../src/components/organisms/TvShowsList/TvShowsList";
import CardDetails from "../src/components/pages/CardDetails/CardDetails";
import './App.scss'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="filmes" element={<MoviesList /> } />
          <Route path="filmes/:id" element={<CardDetails />} />
          <Route path="series" element={<TvShowsList /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
