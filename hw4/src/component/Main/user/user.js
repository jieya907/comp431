import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const User = ({account, name, text, image, unfollow}) => {
    return (
        <div>
            <b> {name}</b>
            <br/>
            <span> {text}</span>
            <img src={image}/>
            <div className= "editBtn">
            <button onClick={unfollow}>Unfollow</button>
            </div>
        </div>
    )
}

export default connect (
    (state) => ({account: state.account}),
    (dispatch, ownProps) => {
        return {
            unfollow: () => dispatch({ type: "UNFOLLOW", id: ownProps.id})
        }
    }
)(User)
