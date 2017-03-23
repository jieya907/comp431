import { setErrorMsg } from './actions'
export const url = 'https://webdev-dummy.herokuapp.com'
import { updateFollowing } from './component/Main/user/userActions'
import { fetchProfile } from './component/Profile/profileAction.js'

// This function is copied from the sample code in inclass 14
// method is GET, POST, PUT...
// endpoint is "headline, loging..."
// payload is the json content.
export const resource = (method, endpoint, payload) => {
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

export const fetchArticles = () => {
    return (dispatch) => {
        resource('GET', 'articles')
            .then( r => {
                dispatch({type: "UPDATE_CONTENT", contents: r.articles })
            })
            .catch(r => {
                setErrorMsg("Cannot get any articles")(dispatch)

            })
    }
}

export const updateHeadline = (headline) => (dispatch) => {
    resource("PUT", "headline", {
        headline: headline
    })
        .then(r => {
            dispatch({type: "UPDATE_HEADLINE", text: headline})
        })
        .catch(r => {
            setErrorMsg(r.message)(dispatch)
        })
}

export const loginFetch = (username, password) => (dispatch) => {
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
        .then(r=> {
            fetchProfile()(dispatch)
        })
        .then(r => {
            updateFollowing("GET", username)(dispatch)
        })
        .catch( r => {
            setErrorMsg(r.message)(dispatch)
        })
}

export const register = (action) => (dispatch) => {
    resource('POST', 'register', {
        username: action.account.name,
        dob: action.account.bday,
        email: action.account.email,
        zipcode: action.account.zipcode,
        password: action.account.password
    })
        .then(r => dispatch(action))
        .catch( r=> {
            setErrorMsg(r.message)(dispatch)
        })
}

export const logout = () => (dispatch) => {
    dispatch(logoutFetch())
}

export const logoutFetch = () => (dispatch) => {
    resource('PUT', 'logout')
        .then(r => {
            dispatch( {type: "LOGOUT"})
        }).catch( r => {
            setErrorMsg(r.message)(dispatch)
        })
}


