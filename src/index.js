import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuthState } from 'react-firebase-hooks/auth'
import { app, auth, firestore, usersCollection, itemsCollection } from './firebase.js'

import LoginPage from './pages/login-page/login-page.js';
import HomePage from './pages/home-page/home-page.js'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

function App() {
  const [user] = useAuthState(auth)

  const [isSignedUp, setSignedUp] = useState(user ? true : false)
  
  return (
    <StrictMode>
      {!user && !isSignedUp ? <LoginPage auth={auth}/> : <HomePage page={"inventory"} auth={auth} user={user} itemsCollection={itemsCollection} usersCollection={usersCollection} setSignedUp={setSignedUp}/>}
    </StrictMode>
  )
}

root.render(
  <App/>
);