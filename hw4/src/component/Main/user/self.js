import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../../actions'

export const Self = ({name, text, update}) => {
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
            <img src= "http://loremflickr.com/320/240"/>
            <div>
            <input type="text" placeholder="New Headline" ref={(node) => newHeadline = node} />
            <button onClick={_update}>Change Headline</button>
            </div>
        </div>
    )
}

export default connect (
    (state) => ({name: state.account.name, text: state.headline}),
    (dispatch, ownProps) => {
        return {
            update: (text) => dispatch({ type: Actions.UPDATE_HEADLINE, text})
        }
    }
)(Self)
