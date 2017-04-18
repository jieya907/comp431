import { resource, resourceForm } from '../../../backend'
import { setErrorMsg } from "../../../actions"

// for dispatching actions for updating the contents
// base on the result of the fetch call
export const addArticleFetch = (article, image) => (dispatch) => {
    if (image) {
        let fd = new FormData()
        fd.append('text', article.text)
        fd.append('image', image)
        resourceForm('POST', 'article', fd)
            .then(r => {
                dispatch({type: "ADD_CONTENT", article: r.articles[0]})
            })
            .catch(r => {
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
