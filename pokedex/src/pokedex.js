import axios from "axios";

const BASE_URL = 'https://pokeapi.co/api/v2/'

export const getPokemon = async (pokemonName) => {
    const res = await axios.get(BASE_URL + `pokemon/${pokemonName}`);
    return res.data;
}

export const getPokedex = async (id) => {
    const res = await axios.get(BASE_URL + `pokedex/${id}`);
    const data = res.data;
    const entryNumbers = data.pokemon_entries.map(entry => entry.entry_number);
    return await Promise.all(entryNumbers.map(nr => getPokemon(nr)));
}