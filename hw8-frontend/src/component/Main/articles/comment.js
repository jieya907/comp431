import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { editCommentFetch } from './articleAction.js'

const ContentEditable = require('react-contenteditable')
export const Comment = ({author, articleId, date, text, user, editComment}) => {

    let newComment;
    const _editComment = () => {
        if (newComment) {
            editComment(newComment)
        }
    }

    const _contentChange = (e) => {
        if (e.target && e.target.value != text) {
            newComment = e.target.value
        }
    }

    return (
        <li className="list-group-item"> 
        <b> {author} </b> 
        <ContentEditable
            html={text}
            disabled={ user!=author}
            onChange={(e) => _contentChange(e)}
        /> 
        <p>{date}</p>
        <button name='btnEditComment' className={ user != author ? 'hide' : '' }
        onClick={_editComment}>Submit Edit</button>
        </li>
    )
}

export default connect(
    (state) => {
        return {
            user: state.account.name,
        }
    },
    (dispatch, ownProps) => {
        return {
            editComment: (text) => editCommentFetch(text, articleId, ownProps.id)(dispatch)
        }
    }
)(Comment)
