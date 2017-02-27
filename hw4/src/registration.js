import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { browserHistory } from 'react-router';

import RegField from './regField'
import * as Actions from './actions'

const NEXT = "NEXT"

const help = {"name":"Your full name", "email":"Your email address",
        "phone": "Your phone number. Digits only", 
        "birthday":"Your date of birth, must be over 16",
        "zipcode":"Zipcode, digits only", 
        "password":"Your password, more than 6 digits",
        "passconfirm":"Confirm your password, must be the same"}

export const Registration = ({ errorMessage, updateAcc, reportError }) => {
    let inputs = {}
    let account = {}
    let message = "Please enter your account information"
    const validateName = (nameInput) => {
        if (!nameInput.value) {
            message = "Please enter your full name"; 
            return Actions.ERROR
        } else {
            account = {...account, name: nameInput.value}
            return NEXT
        }
    }

    const validateWithPattern = (field, input) => {
        if (!input.value || !input.value.match(input.pattern)) {
            message = help[field];
            return Actions.ERROR;
        } else {
            account[field] = input.value;
            console.log(account)
            return NEXT;
        }

    }

    const validateBDay = (input) => {
        if (!input.value) {
            message = "Must enter date of birth"
            return Actions.ERROR;
        }
        const bd = new Date(input.value)
        const ageDif = Date.now() - bd.getTime();
        let ageDate = new Date(ageDif)
        if (Math.abs(ageDate.getFullYear() - 1970) <18) {
            message = "Must be over 18"
            return Actions.ERROR;
        }
        account['bday'] = input.value;
        return NEXT;
    }

    const validatePW = (pw, pwc) => {
        if (!pw.value || !pw.value.match(pw.pattern)) {
            message = "Password in wrong format!";
            return Actions.ERROR;
        }
        if(!pwc.value || pw.value !== pwc.value) {
            message = "Password and Confirmation does not match"
            return Actions.ERROR;
        }
        account['password'] = pw.value;

        console.log("PASSWORD CONTENT" + pw.value);
        return NEXT;
    }

    const validateForm = () => {
        if (validateName(inputs['name']) === Actions.ERROR) {
            console.log(message)
            reportError(message)
            return
        }
        if (validateWithPattern('email', inputs['email']) === Actions.ERROR) {
            console.log(message)
            reportError(message)
            return
        }
        if (validateWithPattern('phone', inputs['phone']) === Actions.ERROR) {
            console.log(message)
            reportError(message)
            return

        }
        if (validateBDay(inputs['bday']) === Actions.ERROR) {
            console.log(message)
            reportError(message)
            return
        }
        if (validateWithPattern('zipcode', inputs['zipcode']) === Actions.ERROR) {
            console.log(message)
            reportError(message)
            return

        }
        if (validatePW(inputs['password'], inputs['passwordconf']) === Actions.ERROR) {
            console.log(message)
            reportError(message)
            return

        }
        updateAcc(account)
        browserHistory.push('main')

    }

    const _route = () => {
        return validateForm();
        //routePage(page);
    }

    return (
        <div>
        <b>{errorMessage}</b>
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
        <button onClick={()=>_route('MAIN')}>Submit</button>
        </div>
    )
}

Registration.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    updateAcc: PropTypes.func.isRequired,
    reportError: PropTypes.func.isRequired,
}


export default connect(
    (state) => ({ errorMessage: state.errorMessage }),
    (dispatch) => {
        console.log("IN CONNECT, SECOND ARGUMENT")
        return {
            updateAcc: (account) => dispatch({ type: Actions.UPDATE_ACCOUNT,account }),
            reportError: (text) => dispatch({ type: Actions.ERROR, text })
        }
    }
)(Registration)
