import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addCommentFetch, editArticleFetch } from './articleAction.js'

import Comment from './comment.js'

const ContentEditable = require('react-contenteditable')

const stmp2date = (author, time) => {
    return author + " posted at "  + time
}

export const Card = ({text, time, image, 
    author, comments, user, addComment, editArticle, articleId}) => {
    let newComment;
    let newArticle;

    const _addComment = () => {
        if (newComment && newComment.value) {
            addComment(newComment.value)
            newComment.value = ''
        }
    }

    const _editArticle =(e) => {
        if(e.target && e.target.value != text) {
            newArticle = e.target.value;
        }
    }

    const _postEdits = () => {
        if (newArticle) {
            editArticle(newArticle)
        }
    }

    return (<div className="card">
        <b id='articleMeta'> {stmp2date(author, time)} </b>
        <br/>
        <ContentEditable className="articleText" 
            html={text}
            disabled={user != author}
            onChange={(e) => _editArticle(e)}
        />
        <img src={image} className={ image === "" ? "hideImg" : ""}/>
        <div className="editBtn">
        <button className='btnEdit' onClick={_postEdits}>Edit</button>
        <input name="commentInput" type="text" placeholder="Add Comment" 
        ref={(node) => newComment=node }/>
        <button name="btnComment" onClick={_addComment}>Add Comment</button>
        <ul className="list-group">
        {
            comments.map(({author, date, text, commentId}, mId) => {
                return (
                    <Comment author={author} articleId={articleId} date={date}
                    text={text} key={mId} id={commentId}/>
                )
            })
        }
        </ul>
        </div>
        </div>)
}

export default connect(
    (state, ownProps) => {
        return {
            user: state.account.name,
            articleId: ownProps.id,
        }
    }, 
    (dispatch, ownProps) => {
    return {
        addComment: (text) => addCommentFetch(text, ownProps.id)(dispatch),
        editArticle: (text) => editArticleFetch(text, ownProps.id)(dispatch)
    }
})(Card)
