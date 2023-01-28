import React from 'react';
import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'

import ItemCard from './components/item-card/item-card.js'

import '../../main.css';
import './home-page.css'



export default function HomePage(props) {
  const auth = props.auth
  const user = props.user
  const page = props.page

  const [items] = useCollectionData(props.itemsCollection.orderBy('id', 'asc'))
  const [userDocument] = useDocumentData(props.usersCollection.doc(user.uid))

  return (
    page == "inventory" ? <Inventory auth={auth} user={user} items={items} userDocument={userDocument}/> : <Inventory auth={auth} user={user} items={items} userDocument={userDocument}/>
  )
}

function Inventory(props) {
  return (
    <div className={"flex"}>
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
  )
}
