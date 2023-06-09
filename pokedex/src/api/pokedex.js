import axios from "axios";

const BASE_URL = 'https://pokeapi.co/api/v2/'

const getPokemon = async (pokemonName) => {
    let data;
    try {
        const res = await axios.get(BASE_URL + `pokemon/${pokemonName}`);
        data = res.data;
    } catch (e) {
        console.log(e)
    }
    return data;
}

export const getPokedex = async (id) => {
    const res = await axios.get(BASE_URL + `pokedex/${id}`);
    const data = res.data;
    const numbers = data.pokemon_entries.map(entry => entry.entry_number);
    return await Promise.all(numbers.map(num => getPokemon(num)));
}

export const getSpecies = async (pokemonName) => {
    const res = await axios.get(BASE_URL + `pokemon-species/${pokemonName}`);
    return res.data;
}

export const getAbility = async (url) => {
    try {
        const res = await axios.get(url);
        const data = res.data;
        let abilityText;
        try {
            abilityText = data.effect_entries.filter(entry => entry.language.name === "en")[0].short_effect;
        } catch (e) {
            abilityText = data.flavor_text_entries.filter(entry => entry.language.name === "en")[0].flavor_text;
        }
        return abilityText;
    } catch (e) {
        console.log(e)
    }
}