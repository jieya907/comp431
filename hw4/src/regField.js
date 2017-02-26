import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {validateText} from './actions'

let value
let pattern
export const RegField = ({field,type, placeholder, pattern, validate})=>{
    return (
        <li>
            <span> {field}</span>
            <input 
                name={field} 
                type={type} 
                placeholder={placeholder} 
                pattern={pattern} 
                ref={
                    (node)=> {
                        console.log(node)
                        value = node;
                        pattern = pattern
                }}/>
        </li>
    )
}

export default connect(null, 
    (dispatch)=> {
        return {
            validate: ()=> dispatch(validateText(value, pattern))
        }
    }) (RegField)
