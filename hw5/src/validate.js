import { resource, url } from './backend.js'
import * as Actions from './actions'
/*
 * This file validates the fields in a form and dispatch to 
 * update information to the server as needed
 *
 */
const help = {"name":"Your full name", "email":"Please enter your email address",
        "phone": "Your phone number. Digits only", 
        "birthday":"Your date of birth, must be over 16",
        "zipcode":"Zipcode, digits only", 
        "password":"Your password, more than 6 digits",
        "passconfirm":"Confirm your password, must be the same"}


export const validateName = (nameInput, account) => {
    if (nameInput.value){
        return {type: Actions.UPDATE_ACCOUNT, account : {...account, name: nameInput.value}};
    } else {
        return {type: Actions.NOP, account}
    }

}

// For fields that can be validated with regex patterns
export const validateWithPattern = (field, input, account) => {
    if (input.value) {
        if (!input.value.match(input.pattern)) {
            return {type: Actions.ERROR, text: help[field]};
        } else {
            account[field] = input.value;
            return {type: Actions.UPDATE_ACCOUNT, account};
        }
    } else {
        return {type: Actions.NOP, account}
    }
}

export const validateBDay = (input,account) => {
    if (input.value) {
        const bd = new Date(input.value)
        const ageDif = Date.now() - bd.getTime();
        let ageDate = new Date(ageDif)
        if (Math.abs(ageDate.getFullYear() - 1970) <18) {
            return {type: Actions.ERROR, text: "Must be over 18"};
        }
        return {
            type: Actions.UPDATE_ACCOUNT, 
            account: {...account, bday: input.value}};
    } else {
        return {type: Actions.NOP, account}
    }

}

export const validatePW = (pw, pwc, account) => {
    if (pw.value) {
        if (!pw.value.match(pw.pattern)) {
            return {type: Actions.ERROR, text: "Password in wrong format!"};
        }
        if(!pwc.value || pw.value !== pwc.value) {
            return {type: Actions.ERROR, text: "Password and Confirmation does not match"}
        }
        account['password'] = pw.value;

        return {type: Actions.UPDATE_ACCOUNT, account};
    } else {
        return {type: Actions.NOP, account}
    }

}

const updateItem = (field, payload) => (dispatch) => {
    resource('PUT', field, payload)
        .then(r => {
            dispatch({type: 'UPDATE_'+ field.toUpperCase() , field: r[field]})
        })
}


// Validate the fields and dispatch to update user info
export const validateForm = (inputs, account, dispatch) => {
    let result = validateName(inputs['name'], account);
    if (result.type === Actions.ERROR) {
        return result
    }

    result = validateWithPattern('email', inputs['email'], result.account); 
    if (result.type === Actions.ERROR) {
        return result
    }
    
    if (result.type != Actions.NOP && result.account.email) {
        updateItem('email', {'email': result.account.email})(dispatch)
    }
    result = validateBDay(inputs['bday'], result.account) 
    if (result.type === Actions.ERROR) {
        return result
    }
    result = validateWithPattern('zipcode', inputs['zipcode'], result.account) 
    if (result.type === Actions.ERROR) {
        return result
    }
    if (result.type != Actions.NOP && result.account.zipcode) {
        updateItem('zipcode', {'zipcode': result.account.zipcode})(dispatch)
    }
    result = validatePW(inputs['password'], inputs['passwordconf'], result.account); 
    if ( result.type === Actions.ERROR) {
        return result

    }
    return {type: Actions.UPDATE_PROF_ACCOUNT, account: result.account}
}

// validate the form and all fields are required to fill out
export const validateFormRequired = (inputs, account) => {
    let result = validateName(inputs['name'], account);
    if (result.type === Actions.ERROR || result.type === Actions.NOP) {
        return result
    }
    result = validateWithPattern('email', inputs['email'], result.account); 
    if (result.type === Actions.ERROR || result.type === Actions.NOP) {
        return result
    }
    result = validateWithPattern('phone', inputs['phone'], result.account);
    if (result.type === Actions.ERROR || result.type === Actions.NOP) {
        return result
    }
    result = validateBDay(inputs['bday'], result.account) 
    if (result.type === Actions.ERROR || result.type === Actions.NOP) {
        return result
    }
    result = validateWithPattern('zipcode', inputs['zipcode'], result.account) 
    if (result.type === Actions.ERROR || result.type === Actions.NOP) {
        return result

    }
    result = validatePW(inputs['password'], inputs['passwordconf'], result.account); 
    if (result.type === Actions.ERROR || result.type === Actions.NOP) {
        return result

    }
    return {type: Actions.UPDATE_ACCOUNT, account: result.account}
}

