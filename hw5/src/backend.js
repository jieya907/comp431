import { setErrorMsg } from './actions'
const url = 'https://webdev-dummy.herokuapp.com'

// This function is copied from the sample code in inclass 14
// method is GET, POST, PUT...
// endpoint is "headline, loging..."
// payload is the json content.
const resource = (method, endpoint, payload) => {
    console.log(`${method} ${endpoint}`)
    const options = {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (payload) options.body = JSON.stringify(payload)

    return fetch(`${url}/${endpoint}`, options)
        .then(r => {
            console.log(endpoint + " "  + r.status)
            if (r.status === 200) {
                if (r.headers.get('Content-Type').indexOf('json') > 0) {
                    return r.json()
                } else {
                    return r.text()
                }
            } else {
                // useful for debugging, but remove in production
                console.error(`${method} ${endpoint} ${r.statusText}`)
                throw new Error(r.statusText)
            }
        })
}



const loginFetch = (username, password) => (dispatch) => {
    resource('POST', 'login', {
        username, password
    })
        .then(r => resource('GET', 'headlines'))
        .then(r => {
            dispatch({type: "LOGIN", headline: r.headlines[0]})
        })
        .then(r => {
            fetchArticles()(dispatch)
        })    
    //.then (articleHelper()(dispatch))
        .catch( r => {
            setErrorMsg(r.message)(dispatch)
        })
}


const logout = () => (dispatch) => {
    dispatch(logoutFetch())
}

const logoutFetch = () => (dispatch) => {
    resource('PUT', 'logout')
        .then(r => {
            dispatch( {type: "LOGOUT"})
        }).catch( r => {
            setErrorMsg(r.message)(dispatch)
        })
}


const articleHelper = () => (dispatch) => {
    dispatch(fetchArticles())
}

const fetchArticles = () => {
    return (dispatch) => {
        console.log("calling resource in fetchArticles")
        resource('GET', 'articles')
            .then( r => {
                console.log(r.articles)
                dispatch( {type: "UPDATE_CONTENT", contents: r.articles })
            })
            .catch(r => {
                console.log("in catch")
                setErrorMsg("Cannot get any articles")(dispatch)

            })
    }
}

export { loginFetch,logout, logoutFetch, fetchArticles, resource, url }
