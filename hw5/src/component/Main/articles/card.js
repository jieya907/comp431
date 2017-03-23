import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const stmp2date = (author, time) => {
    return author + " posted at "  + time
}

export const Card = ({text, time, image, author}) => (
    <div className="card">
        <b> {stmp2date(author, time)} </b>
        <br/>
        <span>{text}</span>
        <img src={image} className={ image === "" ? "hideImg" : ""}/>
        <div className="editBtn">
        <button>Edit</button>
        <button>Comment</button>
        </div>
    </div>
)

export default connect(null, null)(Card)
