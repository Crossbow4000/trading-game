import React from 'react';
import { useState } from 'react'

import { Navigate } from 'react-router-dom'

import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import NavigationBar from './components/navigation-bar/navigation-bar.js'
import Inventory from './components/inventory/inventory.js'
import Crafting from './components/crafting/crafting.js'

import '../../main.css';
import './home-page.css'



export default function HomePage(props) {
  const auth = props.auth
  const user = props.user
  const [page, setPage] = useState('inventory')

  const [items] = useCollectionData(props.itemsCollection.orderBy('id', 'asc'))
  const [userDocument] = useDocumentData(props.usersCollection.doc(user.uid))
  const [recipes] = useCollectionData(props.recipesCollection)
  
  return (
    <div>
      <NavigationBar page={page} setPage={setPage}/>
      <Body page={page} auth={auth} user={user} items={items} userDocument={userDocument} recipes={recipes}/>
    </div>
  )
}


function Body(props) {
  switch(props.page) {
    case 'inventory':
      return <Inventory auth={props.auth} user={props.user} items={props.items} userDocument={props.userDocument}/>
    case 'crafting':
      return <Crafting  auth={props.auth} user={props.user} items={props.items} userDocument={props.userDocument} recipes={props.recipes} />
    default:
      return <Inventory auth={props.auth} user={props.user} items={props.items} userDocument={props.userDocument}/>
  }
}

