import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { unfollowFetch } from './userActions'

export const User = ({account, name, text, image, unfollow}) => {
    return (
        <div className="following">
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
            unfollow: () => unfollowFetch(ownProps.name)(dispatch)
        }
    }
)(User)
