import React from "react"
import { useState } from "react"
import { getDisplayableID, getDisplayableName } from "./utils";

export const GridItem = ({id, name, sprite, isEvoItem}) => {

    const [pokemonData, setPokemonData] = useState({ id, name, sprite });

    return (
        <div className={`grid-item ${isEvoItem && "evolution-item"}`}>
            <span className="item-id">{getDisplayableID(pokemonData.id)}</span>
            <img className="item-img" src={pokemonData.sprite} alt={pokemonData.name} />
            <span className="item-name">{getDisplayableName(pokemonData.name)}</span>
        </div>
    )
}