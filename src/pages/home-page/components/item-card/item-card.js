import React from 'react';

import './item-card.css'



export default function ItemCard(props) {
  return(
    <div className={"grid | item-card"}>
      <h1 className={"item-card-title"}>{props.name}</h1>
      <h2 className={`item-card-rarity item-card-rarity-${props.rarity}`}>{props.rarity}</h2>
      <img className={"item-card-image"} src={props.image}/>
      <p className={"item-card-quantity"}>{props.quantity}</p>
    </div>
  )
}