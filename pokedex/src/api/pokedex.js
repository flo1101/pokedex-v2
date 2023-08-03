import axios from "axios";

const BASE_URL = 'https://pokeapi.co/api/v2/'

export const getPokemon = async (pokemonName) => {
    try {
        const res = await axios.get(BASE_URL + `pokemon/${pokemonName}`);
        return res.data;
    } catch (e) {
        console.log(e)
    }
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

export const getEvolutionChain = async (url) => {
    let evoData;
    try {
        const res = await axios.get(url);
        evoData = res.data.chain;
    } catch (e) {
        console.log(e);
    }
    console.log('Fetched Evolution Data:', evoData)
    const evoChain = await getEvolutions({ 'evoData': evoData, 'stage': 0 }, []);
    evoChain.sort((a,b) => a.stage - b.stage);
    console.log('Grouping and Sorting:', evoChain);
    const groupedEvoChain = evoChain.reduce((result, { pokemonData, stage }) => {
        if (result[stage]) {
            result[stage].push(pokemonData)
        } else {
            result.push([pokemonData]);
        } 
        return result;
      }, []);
    return groupedEvoChain;
}

const getEvolutions = async ({ evoData, stage }, evolutions) => {
    for (const evolution of evoData.evolves_to) {
      evolutions = await getEvolutions({ evoData: evolution, stage: stage + 1 }, evolutions);
    }
    const pokemonData = await getPokemon(evoData.species.name);
    evolutions.unshift({ pokemonData, stage });
    return evolutions;
  };
  