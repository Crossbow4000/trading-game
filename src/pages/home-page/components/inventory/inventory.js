import React from 'react'

import '../../../../main.css';
import './inventory.css'



export default function Inventory(props) {
  return (
    <div>
      <p className={"wallet"}>Cash : {props.userDocument?.wallet}</p>
      <div className={"flex | inventory"}>
        {props.items?.map(item => {
          return (
            (props.userDocument.inventory[item.id] != 0)? 
              (<ItemCard 
                key={item.id}
                name={item.name} 
                quantity={props.userDocument.inventory[item.id]}
                rarity={item.rarity}
                image={item.image}
              />):
              (<></>)
          )
        })}
      </div>
    </div>
    
  )
}

function ItemCard(props) {
  return(
    <div className={"grid | item-card"} key={props.name}>
      <h1 className={"item-card-title"}>{props.name}</h1>
      <h2 className={`item-card-rarity item-card-rarity-${props.rarity}`}></h2>
      <img className={"item-card-image"} src={props.image}/>
      <p className={"item-card-quantity"}>{props.quantity}</p>
    </div>
  )
}