import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {  loginFetch, fetchArticles } from '../../backend'

export const Login = ({locallogin, articles})=> {

    let uname;
    let pw;

    const _login = ()=> {
        if (uname && uname.value && pw && pw.value) {
            locallogin(uname.value, pw.value)
            //articles()
        }
    }

    return (
        <div className="col-sm-6">
        <h2> Please Login with your user information </h2>
        <br/>
        <input name="loginName" type="text" placeholder="Username" ref={(node) => uname = node}/>
        <input name="loginPw" type="password" placeholder="Password" ref={(node) => pw = node}/>
        <button onClick={()=>_login()}>Log In</button>
        </div>
    )
}

export default connect(
    (state) => ({ errorMessage: state.errorMessage }),
    (dispatch) => ({locallogin: (username, password) => loginFetch(username, password)(dispatch),
                   articles: () => fetchArticles()(dispatch)})
)(Login)
