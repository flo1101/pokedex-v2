import React from "react"
import { useState } from "react"

export const GridItem = ({id, name, sprite, isEvoItem}) => {

    const [pokemonData, setPokemonData] = useState({ id, name, sprite });

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
        <div className={`grid-item ${isEvoItem && "evolution-item"}`}>
            <span className="item-id">{getDisplayableID(pokemonData.id)}</span>
            <img className="item-img" src={pokemonData.sprite} alt={pokemonData.name} />
            <span className="item-name">{getDisplayableName(pokemonData.name)}</span>
        </div>
    )
}