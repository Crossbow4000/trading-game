import React from 'react';
import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import '../../main.css';
import './login-page.css'



export default function App(props) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [username, setUsername] = useState()

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

  const SubmitSignUpForm = (event) => {
    event.preventDefault()
    fetch(`https://trading-game-api.vercel.app/?email=${email}&password=${password}&username=${username}`)
    .then(response => response.json())
    .then(json => {
      if(json.status == 200) {
        setState('sign-up')
      } else {
        alert('There was an error creating your account,\n please try again later.')
      }
    })
  }

  return (
    state == 'login' ? 
      (<form className={"flex | login-form"} onSubmit={event => SubmitLoginForm(event)}>
        <input className={"login-input"} type={"email"} placeholder={"email"} value={email} onChange={newValue => setEmail(newValue.target.value)}></input>
        <input className={"login-input"} type={"password"} placeholder={"password"} value={password} onChange={newValue => setPassword(newValue.target.value)}></input>
        <button className={"login-button"} type={"submit"}>Login</button>
        <button className={"sign-up-button"} type={"button"} onClick={event => {setState('sign-up')}}>Sign-Up</button>
      </form>):
      (<form className={"flex | login-form"} onSubmit={event => SubmitSignUpForm(event)}>
        <input className={"login-input"} type={"email"} placeholder={"email"} value={email} onChange={newValue => setEmail(newValue.target.value)}></input>
        <input className={"login-input"} type={"password"} placeholder={"password"} value={password} onChange={newValue => setPassword(newValue.target.value)}></input>
        <input className={"login-input"} type={"text"} placeholder={"username"} value={username} onChange={newValue => setUsername(newValue.target.value)}></input>
        <button className={"login-button"} type={"submit"}>Sign Up</button>
        <button className={"sign-up-button"} type={"button"} onClick={event => {setState('login')}}>Login</button>
      </form>)
  );
}
