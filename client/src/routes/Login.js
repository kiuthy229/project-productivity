import React from 'react';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import App from '../App.css'
import app from '../firebase-config';

var auth = getAuth(app);

function Login (){

  const signUp = () =>{
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((u) => {
        console.log('Successfully Signed Up');
      })
      .catch((err) => {
        console.log('Error: ' + err.toString());
      })
  }

  const login = () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    signInWithEmailAndPassword(auth, email, password)
      .then((u) => {
        console.log('Successfully Logged In');
      })
      .catch((err) => {
        console.log('Error: ' + err.toString());
      })
  }

    return <div style={{ textAlign: 'center' }}>
                <h1 style={{position:"relative", top:"50px", color:"#E43D91"}}>Create Your Account At FocusCam</h1>
                <div className='login-form' >
                <div>
                    <label htmlFor='email' className='email-text'>Email</label>
                    <input className='email' id="email" placeholder="Enter Email.." type="text"/>
                    </div>
                    <div>
                    <div className='password-text'>Password</div>
                    <input className='password' id="password" placeholder="Enter Password.." type="text"/>
                    </div>
                    <button className='login-btn' style={{margin: '10px'}} onClick={login}>Login</button>
                    <button className='signup-btn' style={{margin: '10px'}} onClick={signUp}>Sign Up</button>
                </div>
                
            </div>
    
}

export default Login;