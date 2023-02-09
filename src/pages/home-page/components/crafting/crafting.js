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
      craftableRecipies.push(recipe)
    }
  })

  let recipes = craftableRecipies.map(recipe => {
    return({
      id: recipe.id,
      ingredients: recipe.recipe.map(item => { if(item < 0){return Math.abs(item)} }),
      outputs: recipe.recipe.map(item => { if(item > 0){return item} })
    })
  })

  return (
    <div className={"flex"}>
      {recipes.map(recipe => {
        return(
          <CraftingCard 
            id={recipe.id}
            ingredients={recipe.ingredients}
            outputs={recipe.outputs}
            items={props.items}
          />
      )})}
    </div>
  )
}

function CraftingCard(props) {
  
  const CraftItem = () => {
    console.log(props.id)
  }

  return(
    <div className={"grid | crafting-card"} onClick={CraftItem()}>
      {props.outputs.map((output, i) => {
        if(output) {
          return(
            <div className={"flex | "}>
              <img src={props.items[i].image} />
              <h3>{props.items[i].name}</h3>
              <p>{output}</p>
            </div>
          )
        }
      })}
      {props.ingredients.map((ingredient, i) => {
        if(ingredient) {
          return(
            <div className={"flex | "}>
              <img src={props.items[i].image} />
              <h3>{props.items[i].name}</h3>
              <p>{ingredient}</p>
            </div>
          )
        }
      })}
    </div>
  )
}