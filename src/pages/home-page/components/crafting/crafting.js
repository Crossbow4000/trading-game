import React from 'react'

import '../../../../main.css';
import './crafting.css'

import { useCollectionData } from 'react-firebase-hooks/firestore'



export default function Crafting(props) {
  let craftableRecipies = []

  props.recipes?.forEach(recipe => {
    let canUseRecipe = true
    recipe.recipe.forEach((itemInRecipe, i) => {
      if(itemInRecipe < 0) {
        if(props.userDocument.inventory[i] < Math.abs(itemInRecipe)) {
          canUseRecipe = false
        }
      }
    })
    if(canUseRecipe) {
      craftableRecipies.push(recipe.recipe)
    }
  })

  let recipes = craftableRecipies.map(recipe => {
    return({
      ingredients: recipe.map(item => { if(item < 0){return Math.abs(item)} }),
      outputs: recipe.map(item => { if(item > 0){return item} })
    })
  })

  return (
    <div className={"flex"}>
      {recipes.map(recipe => {
        return(
          <CraftingCard 
            ingredients={recipe.ingredients}
            outputs={recipe.outputs}
            items={props.items}
          />
      )})}
    </div>
  )
}

function CraftingCard(props) {
  console.log(props.name, props.image)
  return(
    <div className={"grid | crafting-card"}>
      {props.ingredients.map((ingredient, i) => {
        if(ingredient) {
          return(
            <h1>{props.items[i].name}</h1>
          )
        }
      })}
    </div>
  )
}