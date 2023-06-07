import React, { useEffect, useState } from "react";
import { getSpecies } from "./api/pokedex";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import circleBg from './assets/circles-bg.svg';
import circleBg2 from './assets/circles-bg-2.svg';

export const PokemonDetail = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { name } = useParams();
    const pokemonData = location.state.pokemonData;
    const [speciesData, setSpeciesData] = useState(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
            const speciesData = await getSpecies(name);
            setSpeciesData(speciesData);
        };
        fetchPokemonData();
    },[name])

    if(!pokemonData || !speciesData) {
        return <span>Loading...</span>;
    }

    const id = getDisplayableID(pokemonData.id);
    const dName = getDisplayableName(name);
    const img = pokemonData.sprites.other["official-artwork"].front_default;
    const description = speciesData.flavor_text_entries
        .filter(entry => entry.language.name === "en")[0].flavor_text
        .replaceAll("\n"," ")
        .replaceAll("\f", " ");
    const heightMtr = pokemonData.height / 10;
    const weightKg = pokemonData.weight / 10;
    let rarity = speciesData.is_legendary === true ? "Legendary" : "Generic";
    rarity = speciesData.is_mythical === true ? "Mythical" : rarity;
    const hp = pokemonData.stats[0].base_stat;
    const att = pokemonData.stats[1].base_stat;
    const def = pokemonData.stats[2].base_stat;
    const spAtt = pokemonData.stats[3].base_stat;
    const spDef = pokemonData.stats[4].base_stat;
    const init = pokemonData.stats[5].base_stat;
    


    function getDisplayableID(num) {
        let id = "#";
        for(let i = num.toString().length; i < 3; i++) {
            id += "0";
        }
        return id + num;
    }

    function getDisplayableName(str) {
        const words = str.split("-");
        const res = words.map(word => {
            const firstLetter = word[0];
            const rest = word.slice(1);
            return firstLetter.toUpperCase() + rest;
        })
        return res.join("-");
    }

    return (
        <main id="detail">
            <div className="top">
                <div className="prev-pokemon">
                    <i className="ri-arrow-left-s-line"></i>
                    <div className="settings-prev-id"></div>
                    <div className="settings-prev-name"></div>
                </div>
                <div id="details-back-btn">
                    <i className="ri-home-2-fill"></i>
                </div>
                <div className="next-pokemon">
                    <div className="settings-next-name"></div>
                    <div className="settings-next-id"></div>
                    <i className="ri-arrow-right-s-line"></i>
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
                    <div className="details-types"></div>
                    <div className="details-props">
                        <div><span className="details-prop-name">Height:</span><br /><span className="details-height">{heightMtr}</span></div>
                        <div><span className="details-prop-name">Weight:</span><br /><span className="details-weight">{weightKg}</span></div>
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
                            <span className="ability-one-name"></span>
                            <p className="ability-one-text"></p>
                        </div>
                        <div className="abilities-break"></div>
                        <div className="ability-two">
                            <span className="ability-two-name"></span>
                            <p className="ability-two-text"></p>
                        </div>
                    </div>
                    <div className="bg-shape-abilities"></div>
                    <img src={circleBg2} />
                </div>
                <div className="details-panel panel-6">
                    <span className="no-evos-text">This Pokémon doesn't evolve.</span>
                </div>
            </div>
            <h2>Special Forms</h2>
            <div className="grid-details-three">
                <div className="details-panel panel-7">
                    <span className="no-forms-text">This Pokémon has no special forms.</span>
                </div>
            </div>
        </main>
    )
}