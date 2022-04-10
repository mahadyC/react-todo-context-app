import React, { useEffect, useState } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import PokeCard from "./PokeCard";
import Loader from "./Loader";


const PokeList = ({favHandler}) => {
  const [pokemons, setPokemons] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [nextPokemons, setNextPokemons] = useState("https://pokeapi.co/api/v2/pokemon/");

  const getPokemons = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon/").then((res) => {
      const fetches = res.data.results.map((p) =>
        axios.get(p.url).then((res) => res.data)
      );

      Promise.all(fetches).then((data) => {
        setPokemons(data);
        setIsLoading(false);
      });
    });
  }

  useEffect(getPokemons, []);



  return (
    <div>
      <Container>
        <Row
          xs={2}
          md={4}
          lg={5}
          className="justify-content-between my-5 d-flex gap-3"
        >
          {isLoading && <Loader />}
          {!isLoading &&
            pokemons.map((pokemon) => (
              <PokeCard
                key={pokemon.name}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                favClick={() => favHandler(pokemon)}
              />
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default PokeList;
