import React from 'react';
import { useState } from 'react'

import { Navigate } from 'react-router-dom'

import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import Inventory from './components/inventory/inventory.js'

import '../../main.css';
import './home-page.css'



export default function HomePage(props) {
  const auth = props.auth
  const user = props.user
  const [page, setPage] = useState('inventory')

  const [items] = useCollectionData(props.itemsCollection.orderBy('id', 'asc'))
  const [userDocument] = useDocumentData(props.usersCollection.doc(user.uid))

  return (
    <Body page={page} auth={auth} user={user} items={items} userDocument={userDocument}/>
  )
}


function Body(props) {
  switch(props.page) {
    case 'inventory':
      return <Inventory auth={props.auth} user={props.user} items={props.items} userDocument={props.userDocument}/>
    default:
      return <Inventory auth={props.auth} user={props.user} items={props.items} userDocument={props.userDocument}/>
  }
}

