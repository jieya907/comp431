import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addCommentFetch } from './articleAction.js'

const stmp2date = (author, time) => {
    return author + " posted at "  + time
}

export const Card = ({text, time, image, author, comments, addComment}) => {
    let newComment;

    const _addComment = () => {
        console.log(newComment.value)
        if (newComment && newComment.value) {
            addComment(newComment.value)
            newComment.value = ''
        }
    }

    return (<div className="card">
        <b> {stmp2date(author, time)} </b>
        <br/>
        <span className="articleText">{text}</span>
        <img src={image} className={ image === "" ? "hideImg" : ""}/>
        <div className="editBtn">
        <button>Edit</button>
        <input name="commentInput" type="text" placeholder="Add Comment" 
        ref={(node) => newComment=node }/>
        <button name="btnComment" onClick={_addComment}>Add Comment</button>
        <ul className="list-group">
        {
            comments.map(({author, date, text, id}, mId) => {
                return (
                    <li className="list-group-item" key={mId}> 
                    <span> {author} commented {text} on {date} </span>
                    </li>
                )
            })
        }
        </ul>
        </div>
        </div>)
}

export default connect(null, (dispatch, ownProps) => {
    return {
        addComment: (text) => addCommentFetch(text, ownProps.id)(dispatch)
    }
})(Card)
