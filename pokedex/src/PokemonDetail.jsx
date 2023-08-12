import React, { useEffect, useState } from "react";
import { getAbility, getEvolutionChain, getPokemon, getSpecies, getForms, getPokedex } from "./api/pokedex";
import { useLocation, useParams, Link } from "react-router-dom";
import { GridItem } from "./GridItem";
import { getDisplayableID, getDisplayableName } from "./utils";

import circleBg from './assets/circles-bg.svg';
import circleBg2 from './assets/circles-bg-2.svg';
import bugIcon from './assets/types/bug.svg';
import darkIcon from './assets/types/dark.svg';
import dragonIcon from './assets/types/dragon.svg';
import electricIcon from './assets/types/electric.svg';
import fairyIcon from './assets/types/fairy.svg';
import fightingIcon from './assets/types/fighting.svg';
import fireIcon from './assets/types/fire.svg';
import flyingIcon from './assets/types/flying.svg';
import ghostIcon from './assets/types/ghost.svg';
import grassIcon from './assets/types/grass.svg';
import groundIcon from './assets/types/ground.svg';
import iceIcon from './assets/types/ice.svg';
import normalIcon from './assets/types/normal.svg';
import poisonIcon from './assets/types/poison.svg';
import psychicIcon from './assets/types/psychic.svg';
import rockIcon from './assets/types/rock.svg';
import steelIcon from './assets/types/steel.svg';
import waterIcon from './assets/types/water.svg';

const typeData = {
    bug: { icon: bugIcon, bgClass: "bg-bug" },
    dark: { icon: darkIcon, bgClass: "bg-dark" },
    dragon: { icon: dragonIcon, bgClass: "bg-dragon" },
    electric: { icon: electricIcon, bgClass: "bg-electric" },
    fairy: { icon: fairyIcon, bgClass: "bg-fairy" },
    fighting: { icon: fightingIcon, bgClass: "bg-fighting" },
    fire: { icon: fireIcon, bgClass: "bg-fire" },
    flying: { icon: flyingIcon, bgClass: "bg-flying" },
    ghost: { icon: ghostIcon, bgClass: "bg-ghost" },
    grass: { icon: grassIcon, bgClass: "bg-grass" },
    ground: { icon: groundIcon, bgClass: "bg-ground" },
    ice: { icon: iceIcon, bgClass: "bg-ice" },
    normal: { icon: normalIcon, bgClass: "bg-normal" },
    poison: { icon: poisonIcon, bgClass: "bg-poison" },
    psychic: { icon: psychicIcon, bgClass: "bg-psychic" },
    rock: { icon: rockIcon, bgClass: "bg-rock" },
    steel: { icon: steelIcon, bgClass: "bg-steel" },
    water: { icon: waterIcon, bgClass: "bg-water" },
  };


  
export const PokemonDetail = ({ pokedex, setPokedex }) => {

    const location = useLocation();

    let { name } = useParams();
    const [loading, setLoading] = useState(true);
    
    const [pokemonData, setPokemonData] = useState(null);
    const [speciesData, setSpeciesData] = useState(null);
    const [abilities, setAbilities] = useState([]);
    const [evolutions, setEvolutions] = useState([]);
    const [forms, setForms] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            window.scrollTo(0,0);

            // fetch Pokedex / PokemonData if necessary
            if (!pokedex) setPokedex(await getPokedex(2));
            const pokemon = location?.state?.pokemonData ? location?.state?.pokemonData : await getPokemon(name);
            setPokemonData(pokemon);

            // fetch species
            const speciesData = await getSpecies(name);
            setSpeciesData(speciesData);

            // fetch abilities
            const urlOne = pokemon.abilities[0].ability.url;
            const abilityOne = await getAbility(urlOne);
            setAbilities((prevAbilities) => [...prevAbilities, abilityOne]);

            if (pokemon.abilities.length > 1) {
                const urlTwo = pokemon.abilities[1].ability.url;
                const abilityTwo = await getAbility(urlTwo);
                setAbilities((prevAbilities) => [...prevAbilities, abilityTwo]);
            };
            
            // fetch evolutions
            const evoUrl = speciesData.evolution_chain.url;
            setEvolutions(await getEvolutionChain(evoUrl));

            // fetch forms
            setForms(await getForms(speciesData));

            setLoading(false);
        };
        fetchData();

    },[name])

    if(loading) {
        return (
            <main className="loading-screen">
                <span>Loading {getDisplayableName(name)}...</span>
            </main>
        );
    }


    // Displayed Infos
    const id = getDisplayableID(pokemonData?.id);
    const dName = getDisplayableName(name);
    const img = pokemonData?.sprites.other["official-artwork"].front_default;
    const description = speciesData?.flavor_text_entries
        .filter(entry => entry?.language?.name === "en")[0]?.flavor_text
        .replaceAll("\n"," ")
        .replaceAll("\f", " ");
    const heightMtr = pokemonData?.height / 10;
    const weightKg = pokemonData?.weight / 10;
    let rarity = speciesData?.is_legendary === true ? "Legendary" : "Generic";
    rarity = speciesData?.is_mythical === true ? "Mythical" : rarity;
    const hp = pokemonData?.stats[0].base_stat;
    const att = pokemonData?.stats[1].base_stat;
    const def = pokemonData?.stats[2].base_stat;
    const spAtt = pokemonData?.stats[3].base_stat;
    const spDef = pokemonData?.stats[4].base_stat;
    const init = pokemonData?.stats[5].base_stat;
    const types = pokemonData?.types.map(type => type.type.name);
    const abilityOneName = getDisplayableName(pokemonData?.abilities[0].ability.name);
    const abilityTwoName = pokemonData?.abilities.length > 1 ? getDisplayableName(pokemonData?.abilities[1].ability.name) : '';

    // Prev/Next Pokemon
    const prevPokemon = pokemonData?.id === 1 ? pokedex[pokedex.length - 1] : pokedex[pokemonData?.id - 2];
    const nextPokemon = pokemonData?.id === pokedex.length ? pokedex[0] : pokedex[pokemonData?.id];

    return (
        <main id="detail">
            <div className="top">
                <div className="navbar">
                    <Link className="prev-pokemon" key={prevPokemon?.id} to={`/pokemon/${prevPokemon?.name}`} state={{ pokemonData: prevPokemon }}>
                        <i className="ri-arrow-left-s-line"></i>
                        <div className="navbar-prev-id">{prevPokemon && getDisplayableID(prevPokemon.id)}</div>
                        <div className="navbar-prev-name">{prevPokemon && getDisplayableName(prevPokemon.name)}</div>
                    </Link>
                    <Link id="navbar-back-btn" key={pokemonData?.id} to={"/"}>
                        <i className="ri-home-2-fill"></i>
                    </Link>
                    <Link className="next-pokemon" key={nextPokemon?.id} to={`/pokemon/${nextPokemon?.name}`} state={{ pokemonData: nextPokemon }}>
                        <div className="navbar-next-id">{nextPokemon && getDisplayableID(nextPokemon.id)}</div>
                        <div className="navbar-next-name">{nextPokemon && getDisplayableName(nextPokemon.name)}</div>
                        <i className="ri-arrow-right-s-line"></i>
                    </Link>
                </div>
            </div>
            <div className="grid-details-one">
                <div className="details-panel panel-1">
                    <div className="details-img-box">
                            <img className="details-img" src={img} alt="" />
                    </div>
                    <img className="circle-bg" src={circleBg} />
                </div>
                <div className="panel-2">
                    <div>
                        <span className="details-id">{id}</span>
                        <h2 className="details-name">{dName}</h2>
                    </div>
                    <p className="details-flavor-text">{description}</p>
                </div>
                <div className="details-panel panel-3">
                    <div className="details-types">
                        {types.map(type => {
                            return (
                                <div className={`detail-type ${typeData[type].bgClass}`} key={type}>
                                    <div className="detail-type-img">
                                        <img src={typeData[type].icon} alt="" />
                                    <div />
                                </div>
                                {getDisplayableName(type)}
                                </div>
                            )
                        })}
                    </div>
                    <div className="details-props">
                        <div><span className="details-prop-name">Height:</span><br /><span className="details-height">{heightMtr} m</span></div>
                        <div><span className="details-prop-name">Weight:</span><br /><span className="details-weight">{weightKg} kg</span></div>
                        <div><span className="details-prop-name">Rarity:</span><br /><span className="details-group">{rarity}</span></div>
                    </div>
                </div>
                <div className="details-panel panel-4">
                    <div className="stats-grid-item stat-hp">
                        <div className="animation-box">
                            <svg className="stats-loaded-circle">
                                <circle cx="50%" cy="50%" r="50%" style={{strokeDashoffset: 301-hp}}/>
                            </svg>
                            <div className="stats-bg-circle"></div>
                            <span className="stat-value">{hp}</span>
                        </div>
                        <span className="stat-name">HP</span>
                    </div>
                    <div className="stats-grid-item stat-attack">
                        <div className="animation-box">
                            <svg className="stats-loaded-circle">
                                <circle style={{strokeDashoffset: 301-att}} cx="50%" cy="50%" r="50%"/>
                            </svg>
                            <div className="stats-bg-circle"></div>
                            <span className="stat-value">{att}</span>
                        </div>
                        <span className="stat-name">Attack</span>
                    </div>
                    <div className="stats-grid-item stat-defense">
                        <div className="animation-box">
                            <svg className="stats-loaded-circle">
                                <circle style={{strokeDashoffset: 301-def}} cx="50%" cy="50%" r="50%"/>
                            </svg>
                            <div className="stats-bg-circle"></div>
                            <span className="stat-value">{def}</span>
                        </div>
                        <span className="stat-name">Defense</span>
                    </div>
                    <div className="stats-grid-item stat-sp-attack">
                        <div className="animation-box">
                            <svg className="stats-loaded-circle">
                                <circle style={{strokeDashoffset: 301-spAtt}} cx="50%" cy="50%" r="50%"/>
                            </svg>
                            <div className="stats-bg-circle"></div>
                            <span className="stat-value">{spAtt}</span>
                        </div>
                        <span className="stat-name">Sp-Attack</span>
                    </div>
                    <div className="stats-grid-item stat-sp-defense">
                        <div className="animation-box">
                            <svg className="stats-loaded-circle">
                                <circle style={{strokeDashoffset: 301-spDef}} cx="50%" cy="50%" r="50%"/>
                            </svg>
                            <div className="stats-bg-circle"></div>
                            <span className="stat-value">{spDef}</span>
                        </div>
                        <span className="stat-name">Sp-Defense</span>
                    </div>
                    <div className="stats-grid-item stat-init">
                        <div className="animation-box">
                            <svg className="stats-loaded-circle">
                                <circle style={{strokeDashoffset: 301-init}} cx="50%" cy="50%" r="50%"/>
                            </svg>
                            <div className="stats-bg-circle"></div>
                            <span className="stat-value">{init}</span>
                        </div>
                        <span className="stat-name">Initiative</span>
                    </div>
                </div>
            </div>
            <h2>Abilities & Evolutions</h2>
            <div className="grid-details-two">
                <div className="details-panel panel-5">
                    <div className="abilities-content">
                        <div className="ability-one">
                            <span className="ability-one-name">{abilityOneName}</span>
                            <p className="ability-one-text">{abilities[0]}</p>
                        </div>
                        { abilities.length > 1 && (
                            <>
                                <div className="abilities-break"></div>
                                <div className="ability-two">
                                    <span className="ability-two-name">{abilityTwoName}</span>
                                    <p className="ability-two-text">{abilities[1]}</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="bg-shape-abilities"></div>
                    <img src={circleBg2} />
                </div>
                <div className="details-panel panel-6">
                    { evolutions.length === 0 && <span className="no-evos-text">This Pokémon doesn't evolve.</span> }
                    {evolutions.map((evolutionStage, index) => (
                        <React.Fragment key={index}>
                            {evolutionStage.map((pokemonData) => (
                            <React.Fragment key={pokemonData.id}>
                                <Link key={pokemonData.id} to={`/pokemon/${pokemonData.name}`} state={{ pokemonData }}>
                                    <GridItem
                                        key={pokemonData.id}
                                        id={pokemonData.id}
                                        name={pokemonData.name}
                                        sprite={pokemonData.sprites.front_default}
                                        isEvoItem={true}
                                    />
                                </Link>
                            </React.Fragment>
                            ))}
                            {index !== evolutions.length - 1 && (
                            <div key={`arrow-${index}`} className="evolution-btn-box">
                                <div className="evo-arrow">
                                <i className="ri-arrow-right-s-line"></i>
                                </div>
                            </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <h2>Special Forms</h2>
            <div className="grid-details-three">
                <div className="details-panel panel-7">
                    {!forms.length &&  <span className="no-forms-text">This Pokémon has no special forms.</span>}
                    {forms.map(form => (
                        <GridItem 
                            key={form.id}
                            id={form.id}
                            name={form.name}
                            sprite={form.sprites.front_default}
                            isFormItem={true}
                        />
                    ))}
                </div>
            </div>
        </main>
    )
}