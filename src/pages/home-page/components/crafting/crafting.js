import React from 'react'

import '../../../../main.css';
import './crafting.css'

import { useCollectionData } from 'react-firebase-hooks/firestore'



export default function Crafting(props) {
  let craftableRecipies = []

  const [recipes] = useCollectionData(props.recipesCollection)

  recipes?.forEach(recipe => {
    let canUseRecipe = true
    console.log(recipe)
    recipe.recipe.forEach((itemInRecipe, i) => {
      if(itemInRecipe < 0) {
        if(props.userDocument.inventory[i] < Math.abs(itemInRecipe)) {
          canUseRecipe = false
        }
      }
    })
    if(canUseRecipe) {
      craftableRecipies.push(recipe.id)
    }
  })

  return (
    <div className={"flex"}>
      {console.log(craftableRecipies)}
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