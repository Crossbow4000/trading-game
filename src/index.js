import React, { StrictMode } from 'react';
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
  
  return (
    <StrictMode>
      <BrowserRouter>   
        <Routes>     
          <Route path="/login" element={<LoginPage auth={auth}/>}/>
          <Route path="/inventory" element={<HomePage page={"inventory"} auth={auth} user={user} itemsCollection={itemsCollection} usersCollection={usersCollection}/>}/>
          <Route path="*" element={!user ? <Navigate to={"/login"}/> : <Navigate to={"/inventory"}/>}/>
        </Routes> 
      </BrowserRouter>
    </StrictMode>
  )
}

root.render(
  <App/>
);