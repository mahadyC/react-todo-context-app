import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokeList from "./components/PokeList";
import './App.css';
import Layout from "./components/Layout";
import Home from "./components/Home";
import PokeSingle from "./components/PokeSingle";
import FavList from "./components/FavList";

const App = () => {

  const [favorites, setFavorites] = useState([]);

  const getArray = JSON.parse(localStorage.getItem('favorites') || '0');

  useEffect(() => {
    if(getArray != 0) {
      setFavorites(getArray);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const favHandler = (pokemon) => {
    let item = favorites.some(item => item.id === pokemon.id);

    if(!item) {
      setFavorites(prevState => [...prevState, pokemon]);
      localStorage.setItem(pokemon.name, JSON.stringify(pokemon));
    }
    else{
      const newArray = [...favorites];
      newArray.splice(newArray.findIndex(item => item.id === pokemon.id), 1);
      setFavorites(newArray);
      localStorage.removeItem(pokemon.name);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pokelist" element={<PokeList favHandler={favHandler}/>} />
          <Route path="favorites" element={<FavList favHandler={favHandler} favorites={favorites}/>} />
          <Route path=":pokemonName" element={<PokeSingle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
