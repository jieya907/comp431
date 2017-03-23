import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { browserHistory } from 'react-router';

import * as Actions from '../../actions'
import { register } from '../../backend.js'
import * as Validate from '../../validate'

export const Registration = ({ account, routePage, update, reportError, reportSuccess }) => {
    let inputs = {}

    const _route = () => {

        const valResult = Validate.validateFormRequired(inputs, account)
        switch (valResult.type) {
            case Actions.ERROR:
                reportError(valResult.text)
                break
            case Actions.NOP:
                reportError("Please complete all input fields.")
                break
            case Actions.UPDATE_ACCOUNT:
                update(valResult)
                reportSuccess("Successfully regisitered but cannot log in yet")
        }
    }

    return (
        <div className="col-sm-6">
        <h2> Register with your information </h2>
        <ul className="registration">
        <li>Display Name 
        <input type="text" placeholder="Your Name" ref={(node)=> inputs = {...inputs, name:node}}required/> 
        </li>

        <li>Email
        <input type="email" placeholder="e.g. someone@gmail.com" pattern="\w+@\w+\.+[a-z]+$" ref={(node)=> inputs = {...inputs, email: node}} required/> 
        </li>

        <li>Phone
        <input type="tel" pattern="\d{10}" placeholder="123"  title="only digits allowed" ref={(node)=> inputs = {...inputs, phone:node}}  />
        </li>

        <li>Date of Birth
        <input type="date" ref={(node)=> inputs = {...inputs, bday: node}} />
        </li>

        <li>Zipcode
        <input type="text" pattern="\d{5}" ref={(node)=> inputs = {...inputs, zipcode: node}} />
        </li>

        <li>Password
        <input type="password" pattern=".{6,}" title="Six or more characters" required ref={(node)=> inputs = {...inputs, password: node}} />
        </li>

        <li>Password Confirmation
        <input type="password" pattern=".{6,}" title="Six or more characters" required ref={(node)=> inputs = {...inputs, passwordconf: node}} /> 
        </li>

        </ul>
        <br/>
        <button onClick={()=>_route('MAIN')}>Submit</button>
        <br/>
        </div>
    )
}

Registration.propTypes = {
    update: PropTypes.func.isRequired,
    routePage: PropTypes.func.isRequired
}

export default connect(
    (state) => ({ account: state.account }),
    (dispatch) => {
        return {
            update: (action) => register(action)(dispatch),
            reportError: (msg) => Actions.setErrorMsg(msg)(dispatch),
            reportSuccess: (msg) => Actions.setSuccessMsg(msg)(dispatch),
            routePage: (page) => {
                return dispatch({type: Actions.ROUTE_TO, location: page })
            }

        }
    }
)(Registration)
