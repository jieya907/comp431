import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import User from "./user"
import Self from "./self"

export const AddFollow = ({ addFollow }) => {

    let newFollow;
    const _addFollow = () => {
        if (newFollow && newFollow.value) {
            addFollow(
                {
                    name:newFollow.value,
                    text: "Hello!",
                    image: "http://loremflickr.com/320/240"
                })
            newFollow.value = ""
        }
    }
    return (<span>
        <input name="inputAdd" type="text" placeholder="Username" ref={(node) => newFollow = node} />
        <button name="btnAdd" onClick={_addFollow}>Add User to Follow</button>
        </span>)

}


export const Sidebar = ({following, addFollow})=> {
    return (
        <div className="col-sm-3" id="sidebar">
        <Self />
        <AddFollow addFollow={addFollow}/>
        <ul>
        {
            following.map((obj) => (
                <User key={obj.id} id={obj.id} name={obj.name} text={obj.text} image = {obj.image}/>
            ))
        }
        </ul>
        </div>
    )
}

export default connect(
    (state) => ({following: state.following}),
    (dispatch) => {
        return {
            addFollow: (account) => dispatch({ type: "ADD_FOLLOW", account})
        }
    }
)(Sidebar)
