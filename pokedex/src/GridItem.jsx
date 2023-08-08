import React from "react"
import { useState } from "react"
import { getDisplayableID, getDisplayableName } from "./utils";

export const GridItem = ({id, name, sprite, isEvoItem, isFormItem}) => {

    const [pokemonData, setPokemonData] = useState({ id, name, sprite });
    
    return (
        <div className={`grid-item 
                        ${isEvoItem && "evolution-item"}
                        ${isFormItem && "form-item"}`}>
            <span className="item-id">{!isFormItem && getDisplayableID(pokemonData.id)}</span>
            <img className="item-img" src={pokemonData.sprite} alt={pokemonData.name} />
            <span className="item-name">{getDisplayableName(pokemonData.name)}</span>
        </div>
    )
}

GridItem.defaultProps = {
    isEvoItem: false,
    isFormItem: false
}
