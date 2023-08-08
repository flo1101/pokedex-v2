import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPokedex } from './api/pokedex';
import { GridItem } from './GridItem';
import { PokemonDetail } from './PokemonDetail';

export const App = () => {

  const [searchInput, setSearchInput] = useState('');
  const [pokedex, setPokedex] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokedex = async () => {
      const pokedexData = await getPokedex(1);
      setPokedex(pokedexData);
      setDisplayedPokemon(pokedexData);
      setLoading(false);
    };
    fetchPokedex();
  }, []);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    filterByName(e.target.value);
  };

  const filterByName = (name) => {
    const q = name.toLowerCase();
    const res = pokedex.filter(pokemon => pokemon.name.includes(q));
    setDisplayedPokemon(res);
  }

  return (
    <Routes>
      <Route 
        path="/"
        element={
          <main>
            <section className="top">
              <div className='searchform'>
                <input className='searchbar' placeholder='Search Pokemon...' type="text" value={searchInput} onChange={handleSearchChange}/>
                <i class="ri-search-line"></i>
              </div>
            </section>
            {loading ? (
              <div className="loading-screen">
                <span>Loading...</span>
              </div>
            ) : (
              <div className="grid">
                {displayedPokemon.map(pokemonData => {
                  return (
                    <Link key={pokemonData.id} to={`/pokemon/${pokemonData.name}`} state={{ pokemonData: pokemonData }}>
                      <GridItem 
                        key={pokemonData.id} 
                        id={pokemonData.id} 
                        name={pokemonData.name} 
                        sprite={pokemonData.sprites.front_default}
                      />
                    </Link>
                  )
              })}
              </div>
            )}
          </main>
      }></Route>
      <Route path="/pokemon/:name" element={<PokemonDetail pokedex={pokedex} setPokedex={setPokedex} />} ></Route>
    </Routes>
  )
}