import React, { useEffect, useState } from "react";
import { getSpecies } from "./pokedex";
import { useParams } from "react-router-dom";

export const PokemonDetail = () => {

    // const { name } = useParams();
    // const [speciesData, setSpeciesData] = useState(null);

    // useEffect(() => {
    //     const fetchPokemonData = async () => {
    //         const speciesData = await getSpecies(name);
    //         setSpeciesData(speciesData);
    //     };
    //     fetchPokemonData();
    // },[name])

    return (
        <div>
            <h1>Hello there!</h1>
        </div>
    )
}