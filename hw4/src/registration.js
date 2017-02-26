import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import RegField from './regField'

const regFields = {
    "fields" : [
        {"field": "Display Name", "type" : "text", "placeholder": "Your Name", "Pattern": "[a-z]+"},
        {"field": "Email Address", "type": "email", "placeholder": "someone@gmail.com", "Pattern": "\w+@\w+\.+[a-z]+$"},
        {"field" : "Phone Number", "type":"tel", "placeholder": "12345678", "Pattern":"\d+"},
        //{"field" : "Zipcode" },
        //{"field" : "Password" },
        //{"field" : "Password Confirm" },

    ]
}

export const Registration = ({routePage}) => {
    const validateForm = () => {

    }

    const route = (page) => {
        console.log(routePage)
        routePage(page);
    }

    return (
        <div>
        <ul className="registration">
        {
            regFields.fields.map((field, id)=> {
                console.log(field);
                return <RegField 
                key={id} field={field.field} 
                type={field.type} placeholder={field.placeholder} 
                pattern={field.pattern}/>
            })}
        </ul>
        <button onClick={()=>route('MAIN')}>Submit</button>
        </div>
    )
}

export default connect(
    null,
    (dispatch) => {
        return {
            routePage: (page) => dispatch({type:'ROUTE_TO', page})
        }
    }
)(Registration)
