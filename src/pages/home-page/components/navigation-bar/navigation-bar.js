import React from 'react'

import '../../../../main.css';
import './navigation-bar.css'



export default function NavigationBar(props) {
  const page = props.page
  const setPage = props.setPage

  return (
    <div className={"flex | navigation-bar"}>
      <NavigationButton title={"Inventory"} page={props.page} setPage={setPage} src={"https://firebasestorage.googleapis.com/v0/b/trading--game.appspot.com/o/icons%2Finventory.svg?alt=media&token=a9ca2d8c-e3ef-431d-85d6-103186a0f412"}/>
      <NavigationButton title={"Crafting"} page={props.page} setPage={setPage} src={"https://firebasestorage.googleapis.com/v0/b/trading--game.appspot.com/o/icons%2Fcrafting.svg?alt=media&token=0abba754-18e9-4829-9811-f7110131e1a8"}/>
      <NavigationButton title={"Market"} page={props.page} setPage={setPage} src={"https://firebasestorage.googleapis.com/v0/b/trading--game.appspot.com/o/icons%2Fmarket.svg?alt=media&token=f8dbee28-c5f3-4682-82f6-5cf0e15ee338"}/>
    </div>
  )
}

function NavigationButton(props) {
  let selected = 'not-selected';
  if(props.title.toLowerCase() == props.page) {
    selected = 'selected'
  } else {
    selected = 'not-selected'
  }

  const setPage = props.setPage
  const ChangePage = () => {
    setPage(props.title.toLowerCase())
  }

  return (
    <div className={"grid | navigation-button"}>
      <button className={`flex | ${selected}`} onClick={ChangePage}>
        <img src={props.src}/>
      </button>
      <h3 className={"button-title"}>{props.title}</h3>
    </div>
  )
}