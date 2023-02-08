import React from 'react'

import '../../../../main.css';
import './crafting.css'



export default function Crafting() {
  return (
    <div className={"flex"}>
      {props.items?.map()}
    </div>
  )
}

function CraftingCard(props) {
  return(
    <div className={"grid | item-card"}>
      <h1 className={"item-card-title"}>{props.name}</h1>
      <h2 className={`item-card-rarity item-card-rarity-${props.rarity}`}>{props.rarity}</h2>
      <img className={"item-card-image"} src={props.image}/>
      <p className={"item-card-quantity"}>{props.quantity}</p>
    </div>
  )
}