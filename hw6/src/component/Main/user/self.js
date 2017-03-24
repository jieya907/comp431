import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../../actions'
import { updateHeadline } from "../../../backend"

export const Self = ({name, text, avatar, update}) => {;
    let newHeadline;
    const _update = () => {
        if (newHeadline && newHeadline.value) {
            update(newHeadline.value);
            newHeadline.value = ""
        }
    }
    return (
        <div>
            <b>{name}</b>
            <br/>
            <span> {text}</span>
            <img src= {avatar}/>
            <div>
            <input type="text" placeholder="New Headline" ref={(node) => newHeadline = node} />
            <button onClick={_update}>Change Headline</button>
            </div>
        </div>
    )
}

export default connect (
    (state) => ({name: state.account.name, 
        text: state.headline, 
        avatar: state.avatar}),
    (dispatch, ownProps) => {
        return {
            update: (text) => updateHeadline(text)(dispatch)
        }
    }
)(Self)
