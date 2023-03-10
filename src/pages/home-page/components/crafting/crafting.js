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
            userDocument={props.userDocument}
          />
      )})}
    </div>
  )
}

function CraftingCard(props) {
  
  const CraftItem = () => {
    fetch(`https://trading-game-api.vercel.app/?action=CRAFT&uid=${props.userDocument.uid}&recipe=${props.id}&key=${props.userDocument.key}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
    })
  }

  return(
    <div className={"flex | crafting-card"} onClick={CraftItem} key={props.id}>
      {props.outputs.map((output, i) => {
        if(output) {
          return(
            <div className={"grid | output-container"} key={props.items[i].name}>
              <img src={props.items[i].image} className={"output-image"} />
              <h3 className={"output-title"}>{props.items[i].name}</h3>
              <p className={"output-quantity"}>{output}</p>
              <p className={"user-output-quantity"}>{props.userDocument.inventory[i]}</p>
              <div className={"spacer"}></div>
            </div>
          )
        }
      })}
      <div className={"border"}></div>
      {props.ingredients.map((ingredient, i) => {
        if(ingredient) {
          return(
            <div className={"flex | ingredient-container"} key={props.items[i].name}>
              <img src={props.items[i].image} className={"ingredient-image"} />
              <h3 className={"ingredient-title"} >{props.items[i].name}</h3>
              <p className={"ingredient-quantity"} >-{ingredient}</p>
              <p className={"user-ingredient-quantity"}>{props.userDocument.inventory[i]}</p>
              <div className={"spacer"}></div>
            </div>
          )
        }
      })}
    </div>
  )
}