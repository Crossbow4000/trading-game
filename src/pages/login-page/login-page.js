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
    auth.createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      props.usersCollection().doc(props.user.uid).set({
        "uid": String(props.user.uid),
        "wallet": 0,
        "inventory": [0, 1, 1],
        "key": String(uuidv4()),
        "username": String(username)
      })
      .then(response => {
        props.setSignedUp(true)
      })
      .catch(error => {
        console.log(error)
      })
    })
    .catch(error => {
      console.log(error)
      alert('Please make sure that you have correctly entered all of the fields')
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
