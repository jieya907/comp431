import { resource, resourceForm } from '../../../backend'
import { setErrorMsg } from "../../../actions"

// for dispatching actions for updating the contents
// base on the result of the fetch call
export const addArticleFetch = (article, image) => (dispatch) => {
    console.log(article)
    console.log(image)
    if (image) {
        let fd = new FormData()
        console.log("printing article.text", article.text)
        fd.append('text', article.text)
        fd.append('image', image)
        resourceForm('POST', 'article', fd)
            .then(r => {
                console.log(r)
                dispatch({type: "ADD_CONTENT", article: r.articles[0]})
            })
            .catch(r => {
                console.log(r)
                setErrorMsg("Cannot add new article")(dispatch)
            })

    }
    else {
        resource('POST', 'article', {
            text: article.text
        })
            .then(r => {
                dispatch({type: "ADD_CONTENT", article: article})
            })
            .catch(r => {
                setErrorMsg("Cannot add new article")(dispatch)
            })

    }
}

export const addCommentFetch = (text, articleId) => (dispatch) => {
    resource('PUT', 'articles/' + articleId, {
        text: text,
        commentId: -1
    }).then( r => {
        console.log(r.articles)
        dispatch({type: 'ADD_COMMENT', article: r.articles[0]})
    })
    .catch(r => {
        setErrorMsg(r.message)(dispatch)
    })
}

export const editCommentFetch = (text, articleId, commentId) => (dispatch) => {
    resource('PUT', 'articles/' + articleId, {
        text: text,
        commentId: commentId,
    }).then( r => {
        console.log(r.articles)
        dispatch({type: 'ADD_COMMENT', article: r.articles[0]})
    })
    .catch(r => {
        setErrorMsg(r.message)(dispatch)
    })
}

export const editArticleFetch = (text, articleId) => (dispatch) => {
    resource('PUT', 'articles/' + articleId, {
        text: text,
    }).then( r => {
        dispatch({type: 'EDIT_ARTICLE', article: r.articles[0]})
    })
    .catch(r => {
        setErrorMsg(r.message)(dispatch)
    })
}


// for dispatching actions for searching the articles
export const searchAction = (term ) => (dispatch) => {
    dispatch({
        type: "SHOW_SEARCH",
        key: term
    })
}
