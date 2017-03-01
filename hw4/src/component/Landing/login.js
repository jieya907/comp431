import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';

export const Login = ({login})=> {

    let uname;
    let pw;

    const _login = ()=> {
        if (uname && uname.value && pw && pw.value) {
            login(uname.value)
        }
    }

    return (
        <div className="login">
        <input name="loginName" type="text" placeholder="Username" ref={(node) => uname = node}/>
        <input name="loginPw" type="password" placeholder="Password" ref={(node) => pw = node}/>
        <button onClick={()=>_login()}>Log In</button>
        </div>
    )
}

export default connect(
    (state) => ({ errorMessage: state.errorMessage }),
    (dispatch) => {
        return {
            login: (uname) => dispatch({type: "LOGIN", uname})
        }
    }
)(Login)
