import axios from "axios";
import { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { Button } from "react-bootstrap";



const PokeSingle = () => {

    let {pokemonName} = useParams();
    // let [pokeDetail, setPokeDetail] = useState();
    const [pokemon, setPokemon] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).catch(error => {console.log(error);}).then(res => {console.log(res.data);setPokemon(res.data); setIsLoading(false)});
    }, [])

    // const getPokemonDetail = async (pokemonName) => {
    //    await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(res => setPokeDetail(res.data))
    // }
    // getPokemonDetail(pokemonName);
    return(
        <div style={{display: "flex", justifyContent: "center"}}>
        {isLoading && <Loader />}
        {!isLoading && (
            <div>
                <h2> {pokemon.name}</h2>
                <img src={pokemon.sprites.other.dream_world.front_default} />    
                <p>Base experience: {pokemon.base_experiece}</p>
                <p>Height: {pokemon.height} cm</p>
                <p>Weight: {pokemon.weight} kg</p>
                <p>Single page will be her { pokemon.name}</p>
                <div>
                    <p>Types: {" "}</p>
                    <ul>
                        {pokemon.types.map((item) => (
                            <li key={item.type.name}>{item.type.name}</li>
                        ))}
                    </ul>
                </div>
                <LinkContainer to="/pokelist">
                    <Button>Back</Button>
                </LinkContainer>
            </div>
        )}
        </div>

    )
}

export default PokeSingle;