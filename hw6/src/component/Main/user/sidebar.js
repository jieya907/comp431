import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import User from "./user"
import Self from "./self"
import { updateFollowing } from './userActions'

export const AddFollow = ({ addFollow }) => {

    let newFollow;
    const _addFollow = () => {
        if (newFollow && newFollow.value) {
            addFollow(newFollow.value)
            newFollow.value = ""
        }
    }
    return (<span>
        <input name="inputFollow" type="text" 
        placeholder="Username" ref={(node) => newFollow = node} />
        <button name="btnAddFollow" onClick={_addFollow}>Add User to Follow</button>
        </span>)

}

// Sidebar that contains the list of following users
export const Sidebar = ({following, addFollow})=> {
    return (
        <div className="col-sm-3" id="sidebar">
        <Self />
        <AddFollow addFollow={addFollow}/>
        <ul id="followings">
        {
            following.map((obj) => {
                return (<User key={obj.id} id={obj.id} name={obj.name} text={obj.text} image = {obj.image}/>)
            })
        }
        </ul>
        </div>
    )
}

export default connect(
    (state) => ({following: state.following}),
    (dispatch) => {
        return {
            addFollow: (username) => updateFollowing("PUT", username)(dispatch)
        }
    }
)(Sidebar)
