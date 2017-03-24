import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { logoutFetch } from '../../backend.js'
import * as Actions from '../../actions'
import * as Validate from '../../validate'

export const Profile = ({account, errorMessage, email, zipcode, bday, validate, update, routePage}) => {
    let inputs = {}

    const _route = (page) => {
        routePage(page)
    } 

    const _update = ()=>{
        validate(inputs, account)
    }

    return (
        <div>
        <h1> Update your profile information </h1>
        <b>{errorMessage}</b>
        <ul className="profile">
        <li>Display Name 
        <input type="text" placeholder="Your Name" ref={(node)=> inputs = {...inputs, name:node}}required/> 
        <span>{account.name}</span> 
        </li>

        <li>Email
        <input type="email" placeholder="e.g. someone@gmail.com" pattern="\w+@\w+\.+[a-z]+$" ref={(node)=> inputs = {...inputs, email: node}} required/> 
        <span>{email}</span> 
        </li>

        <li>Date of Birth
        <input type="date" ref={(node)=> inputs = {...inputs, bday: node}} />
        <span>{bday}</span> 
        </li>

        <li>Zipcode
        <input type="text" pattern="\d{5}" ref={(node)=> inputs = {...inputs, zipcode: node}} />
        <span>{zipcode}</span> 
        </li>

        <li>Password
        <input type="password" pattern=".{6,}" title="Six or more characters" required ref={(node)=> inputs = {...inputs, password: node}} />
        </li>

        <li>Password Confirmation
        <input type="password" pattern=".{6,}" title="Six or more characters" required ref={(node)=> inputs = {...inputs, passwordconf: node}} /> 
        </li>

        </ul>
        <button onClick={()=>_update()}>Update</button>
        <button onClick={()=>_route('MAIN')}>Back to Main page</button>
        </div>
    )

}

export default connect(
    (state) => ({ 
        account: state.account,
        errorMessage: state.errorMessage , 
        email: state.email,
        zipcode: state.zipcode,
        bday: state.dob
    }),
    (dispatch) => {
        return {
            update: (action) => dispatch(action),
            validate: (inputs, account) => Validate.validateForm(inputs, account, dispatch),
            routePage: (page) => {
                return dispatch({ type: Actions.ROUTE_TO, location: page })
            },
        }
    }
)(Profile)
