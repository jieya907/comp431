import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const stmp2date = (author, time) => {
    return author + " posted at "  + new Date(parseInt(time))
}

export const Card = ({text, time, image, author}) => (
    <li>
        <span> {stmp2date(author, time)} </span>
        <span>{text}</span>
        <img src={image} className={ image === "" ? "hideImg" : ""}/>
        <button>Edit</button>
        <button>Comment</button>
    </li>
)

export default connect(null, null)(Card)
