import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../../actions'
import { updateHeadline, updateAvatarFetch } from "../../../backend"

export const Self = ({name, text, avatar, update, updateAvatar}) => {;
    let newHeadline;
    let newAvatar;
    const _update = () => {
        if (newHeadline && newHeadline.value) {
            update(newHeadline.value);
            newHeadline.value = ""
        }
    }

    const _updateAvatar = () => {
        if (newAvatar) {
            updateAvatar(newAvatar)
        }
    }

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            newAvatar = e.target.files[0]
        }
    }
    return (
        <div>
        <b id='username'>{name}</b>
        <br/>
        <span id="headline"> {text}</span>
        <img src= {avatar}/>
        <div>
        <input id="newHeadline" type="text" placeholder="New Headline" ref={(node) => newHeadline = node} />
        <button id="btnHeadline" onClick={_update}>Change Headline</button>
        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} />
        <button onClick={_updateAvatar}>Change Avatar</button>
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
            update: (text) => updateHeadline(text)(dispatch),
            updateAvatar: (img) => updateAvatarFetch(img) (dispatch)
        }
    }
)(Self)
