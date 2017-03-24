import { resource } from '../../../backend'
import { setErrorMsg } from "../../../actions"

// for dispatching actions for updating the contents
// base on the result of the fetch call
export const addArticleFetch = (article) => (dispatch) => {
    resource('POST', 'article', {
        text: article.text
    })
        .then(r => {
            console.log(r)
            dispatch({type: "ADD_CONTENT", article: article})
        })
        .catch(r => {
            setErrorMsg("Cannot add new article")(dispatch)
        })
}

// for dispatching actions for searching the articles
export const searchAction = (term ) => (dispatch) => {
    dispatch({
        type: "SHOW_SEARCH",
        key: term
    })
}
