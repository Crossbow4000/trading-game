import React from 'react';
import { useState } from 'react';

import { Navigate } from 'react-router-dom'

import '../../main.css';
import './login-page.css'



export default function App(props) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [state, setState] = useState('login')

  const auth = props.auth

  const SubmitLoginForm = (event) => {
    event.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      setEmail('')
      setPassword('')
    })
    .catch(error => {
      alert('Email or password was incorrect')
    })
    
  }

  return (
    state == 'login' ? 
      (<form className={"flex | login-form"} onSubmit={event => SubmitLoginForm(event)}>
        <input className={"login-input"} type={"text"} placeholder={"email"} value={email} onChange={newValue => setEmail(newValue.target.value)}></input>
        <input className={"login-input"} type={"password"} placeholder={"password"} value={password} onChange={newValue => setPassword(newValue.target.value)}></input>
        <button className={"login-button"} type={"submit"}>Login</button>
        <button className={"sign-up-button"} type={"button"} onClick={event => {event.preventDefault(); setState('sign-up')}}>Sign-Up</button>
      </form>):
      (<div>

      </div>)
  );
}
