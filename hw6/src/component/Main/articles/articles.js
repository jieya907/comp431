import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { addArticleFetch, searchAction } from './articleAction'

import * as Actions from "../../../actions"
import Card from './card.js'
import { filterContent } from './filterContent'

export const AddArticle = ({user, addArticle}) => {
    let newContent;
    let newArticle = {};
    let newImage;

    const _addArticle = () => {
        if (newContent && newContent.value) {
            // create a new article object
            newArticle['author'] = user;
            newArticle['text'] = newContent.value;
            newArticle['date'] = new Date(Date.now());
            newArticle['img'] = "";
            newArticle['comments'] = [];
            addArticle(newArticle, newImage)
            newContent.value ="Post"
        }
    }
    const _clear = () => {
        if (newContent || newContent.value) {
            newContent.value = ""
        }
    }

    const handleImageChange = (e) => {
        if(e.target.files.length >0) {
        newImage = e.target.files[0]
        }
    }

    return (<span>
        <input name="inputArticle" type="text" 
        placeholder="Post" ref={(node) => newContent = node} />
        <button name="btnAddArticle" onClick={_addArticle}>Add Post</button>
        <button name="btnClear" onClick={_clear}>Clear</button>
        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)}/>

        </span>)
}

// the main content body that contains all the articles
export const Articles = ({ user, contents, addArticle, search }) => {
    let searchTerm;

    //update the search terms
    const _search = () => {
        if (searchTerm) {
            search(searchTerm.value)
        } 
    }
    return (<div className="col-sm-9">
        <AddArticle user={user} addArticle={addArticle}/>

        <input name="searchBar" 
        type="text" 
        placeholder="Search your feed" 
        ref={(node) => searchTerm = node} 
        onChange={_search} />
        <div name="articles">
        {
            contents.map((obj, id) => (
                <Card key={id} text={obj.text} time={obj.date} 
                image={obj.img} author={obj.author} comments={obj.comments} id={obj._id}/>
            ))}
        </div>
        </div>)

}

export default connect(
    (state) => {
        return {
            user: state.account.name,
            contents : state.articles
        }
    },
    (dispatch) => {
        return {
            addArticle: (article, newImage) => addArticleFetch(article, newImage)(dispatch),
            search: (key) => searchAction(key)(dispatch)
        }
    }

)(Articles)
