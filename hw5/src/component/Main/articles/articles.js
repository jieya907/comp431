import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


import * as Actions from "../../../actions"
import Card from './card.js'
import {filterContent} from './filterContent'

export const AddArticle = ({user, addArticle}) => {
    let newContent;
    let newArticle = {};

    const _addArticle = () => {
        if (newContent && newContent.value) {
            newArticle['author'] = user;
            newArticle['text'] = newContent.value;
            newArticle['timestamp'] = Date.now();
            newArticle['image'] = "";
            addArticle(newArticle)
            newContent.value ="Post"
        }
    }
    const _clear = () => {
        if (newContent || newContent.value) {
            newContent.value = ""
        }
    }

    return (<span>
        <input name="inputArticle" type="text" placeholder="Post" ref={(node) => newContent = node} />
        <button name="btnAddArticle" onClick={_addArticle}>Add Post</button>
        <button name="btnClear" onClick={_clear}>Clear</button>
        <input type="file"/>

    </span>)
}

export const Articles = ({ user, contents, addArticle, search }) => {
    let searchTerm;

    const _search = () => {
        if (searchTerm) {
            search(searchTerm.value)
        } 
    }
    
    return (<div className="col-sm-9">
        <AddArticle user={user} addArticle={addArticle}/>

        <input name="searchBar" type="text" placeholder="Search your feed" ref={(node) => searchTerm = node} onChange={_search} />
        <div className="article">
            {
                contents.map((obj, id) => (
                    <Card key={id} text={obj.text} time={obj.timestamp} image={obj.image} author={obj.author}/>
                ))}
        </div>
    </div>)

}

export default connect(
    (state) => {
        return {
            user: state.account.name,
            contents : filterContent(state.contents, state.search)
        }
    },
    (dispatch) => {
        return {
            addArticle: (article) => dispatch({type: "ADD_CONTENT", article}),
            search: (key) => dispatch({type: "SHOW_SEARCH", key})
        }
    }

)(Articles)
