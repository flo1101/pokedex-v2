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
  const [showPopup, setShowPopup] = useState(true);
  const SIZE = 151;

  useEffect(() => {
    const fetchPokedex = async () => {
      const pokedex = await getPokedex(2);
      setPokedex(pokedex);
      setDisplayedPokemon(pokedex);
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

  const closePopup = () => {
    localStorage.setItem("seenPopup", true);
    setShowPopup(false);
  }

  return (
    <Routes>
      <Route 
        path="/"
        element={
          <>
            {showPopup && (
              <div className="popup" onClose={closePopup}>
                <div className='popup-content'>
                  <h2>Welcome!</h2>
                  <p>
                    This is an online Pokédex of the original 151 Pokémon.
                    <div></div>
                    This Website was built with React and uses data from the PokéAPI.
                    For more information click <a className="popup-link" href="https://pokeapi.co/" target='_blank'>here</a>.
                  </p>
                  <div className="popup-close" onClick={closePopup}>
                    View Pokédex
                  </div>
                </div>
              </div>
            )}
            {loading && (
              <div className="loading-alert">
                  Loading Pokédex
                  <i className="ri-refresh-line"></i>
              </div>
            )}
            <main>
              <section className="top">
                <div className='searchform'>
                  <input
                    className={`searchbar ${loading && "no-access"}`}
                    placeholder="Search Pokémon..."
                    type="text"
                    value={searchInput}
                    onChange={handleSearchChange}
                    />
                  <i className={`ri-search-line ${loading && "no-access"}`} ></i>
                </div>
              </section>
              {loading ? (
                <div className="grid">
                  {Array.from({ length: SIZE }, (_, index) => (
                    <div key={index} className="preload-panel"></div>
                  ))}
                </div>
              ) : (
                <div className="grid">
                  {displayedPokemon.map(pokemonData => (
                    <Link key={pokemonData.id} to={`/pokemon/${pokemonData.name}`} state={{ pokemonData: pokemonData }}>
                      <GridItem 
                        key={pokemonData.id} 
                        id={pokemonData.id} 
                        name={pokemonData.name} 
                        sprite={pokemonData.sprites.front_default}
                      />
                    </Link>
                  ))}
                </div>
              )}
            </main>
          </>
        }
      ></Route>
      <Route path="/pokemon/:name" element={<PokemonDetail pokedex={pokedex} setPokedex={setPokedex} />} ></Route>
    </Routes>
  )
}