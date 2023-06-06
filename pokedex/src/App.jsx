import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPokedex } from './pokedex';
import { GridItem } from './GridItem';
import { PokemonDetail } from './PokemonDetail';

export const App = () => {

  const [searchInput, setSearchInput] = useState('');
  const [pokedex, setPokedex] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);

  useEffect(() => {
    const fetchPokedex = async () => {
      const pokedexData = await getPokedex(2);
      setPokedex(pokedexData);
      setDisplayedPokemon(pokedexData);
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
      <Route path="/" element={
        <main>
          <form className='searchform'>
            <input className='searchbar' placeholder='Search Pokemon...' type="text" value={searchInput} onChange={handleSearchChange}/>
          </form>
          <div className="grid">
            {displayedPokemon.map(p => {
              return (
                <Link key={p.id} to={`/pokemon/${p.name}`}>
                  <GridItem 
                    key={p.id} 
                    id={p.id} 
                    name={p.name} 
                    sprite={p.sprites.front_default}
                  />
                </Link>
              )
          })}
          </div>
        </main>
      }></Route>
      <Route path="/pokemon/:name" element={<PokemonDetail />} ></Route>
    </Routes>
  )
}