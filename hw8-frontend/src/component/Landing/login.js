import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {  loginFetch, loginOAuthFetch } from '../../backend'
import { fetchProfile } from '../../component/Profile/profileAction.js'

export const Login = ({locallogin, fbLogin, profile})=> {

    let uname;
    let pw;

    const _login = ()=> {
        if (uname && uname.value && pw && pw.value) {
            locallogin(uname.value, pw.value)
            //profile()
        }
    }

    const _loginFB = ()=> {
        window.location = 'http://localhost:3000/login/facebook'
    }

    return (
        <div className="col-sm-6">
        <h2> Please Login with your user information </h2>
        <br/>
        <input name="loginName" type="text" placeholder="Username" ref={(node) => uname = node}/>
        <input name="loginPw" type="password" placeholder="Password" ref={(node) => pw = node}/>
        <button id="login" onClick={()=>_login()}>Log In</button>
        <button id='loginFB' onClick={()=>_loginFB()}>Login with Facebook </button>
        </div>
    )
}

export default connect(
    (state) => ({ errorMessage: state.errorMessage }),
    (dispatch) => ({
        locallogin: (username, password) => loginFetch(username, password)(dispatch),
        fbLogin: (username, password) => loginOAuthFetch(username, password)(dispatch),
        profile: () => fetchProfile(dispatch)
    })
)(Login)
