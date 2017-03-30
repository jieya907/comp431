import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../../actions'
import { updateHeadline } from "../../../backend"

export const Self = ({name, text, avatar, update}) => {;
    let newHeadline;
    let newAvatar;
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
        <span id="headline"> {text}</span>
        <img src= {avatar}/>
        <div>
        <input id="newHeadline" type="text" placeholder="New Headline" ref={(node) => newHeadline = node} />
        <button id="btnHeadline" onClick={_update}>Change Headline</button>
        <input type="file"ref={(node) => newAvatar = node} />
        <button onClick={_update}>Change Avatar</button>
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
