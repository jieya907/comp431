import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as Actions from '../../actions'
import * as Validate from '../../validate'

export const Profile = ({errorMessage, account, update, routePage}) => {
    let inputs = {}

    const _route = (page) => {
        routePage(page)
    } 

    const _update = ()=>{
        update (Validate.validateForm(inputs, account))
    }
    return (
        <div>
        <p> Update your profile information </p>
        <b>{errorMessage}</b>
        <ul className="profile">
        <li>Display Name 
        <input type="text" placeholder="Your Name" ref={(node)=> inputs = {...inputs, name:node}}required/> 
        <span>{account.name}</span> 
        </li>

        <li>Email
        <input type="email" placeholder="e.g. someone@gmail.com" pattern="\w+@\w+\.+[a-z]+$" ref={(node)=> inputs = {...inputs, email: node}} required/> 
        <span>{account.email}</span> 
        </li>

        <li>Phone
        <input type="tel" pattern="\d{10}" placeholder="123"  title="only digits allowed" ref={(node)=> inputs = {...inputs, phone:node}}  />
        <span>{account.phone}</span> 
        </li>

        <li>Date of Birth
        <input type="date" ref={(node)=> inputs = {...inputs, bday: node}} />
        <span>{account.bday}</span> 
        </li>

        <li>Zipcode
        <input type="text" pattern="\d{5}" ref={(node)=> inputs = {...inputs, zipcode: node}} />
        <span>{account.zipcode}</span> 
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
    (state) => ({ errorMessage: state.errorMessage , account: state.profAccount}),
    (dispatch) => {
        return {
            update: (action) => dispatch(action),

            routePage: (page) => {
                return dispatch({ type: Actions.ROUTE_TO, location: page })
            }
        }
    }
)(Profile)
