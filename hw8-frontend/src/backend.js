import { setErrorMsg } from './actions'
//export const url = 'https://webdev-dummy.herokuapp.com'
//export const url = 'http://localhost:3000'
export const url = 'https://gentle-hollows-55657.herokuapp.com'
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

export const resourceForm = (method, endpoint, payload) => {
    const options = {
        method,
        credentials: 'include',
        body: payload
    }

    return fetch (`${url}/${endpoint}`, options)
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

// Communicating with backend for getting all articles
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

export const updateAvatarFetch = (img) => (dispatch) => {
    if (img) {
        let fd = new FormData()
        fd.append('image', img)

        resourceForm('PUT', 'avatar', fd)
            .then(r => {
                dispatch({type: 'UPDATE_AVATAR', field: r.avatar})
            })
            .catch(r => {
                setErrorMsg(r.message)(dispatch)
            })
    }
}

// get a user's headline
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

// a series of steps for login a user
export const loginFetch = (username, password) => (dispatch) => {
    resource('POST', 'login', {
        username, password
    })
        .then(r => resource('GET', 'headlines'))
        .then(r => {
            dispatch({type: "LOGIN", headline: r.headlines[0]})
        })
        .then(r => resource('GET', 'avatars'))
        .then(r => {
            dispatch({type: "UPDATE_AVATAR",field: r.avatars[0].avatar})
        })
        .then(r => {
            fetchProfile()(dispatch)
        })
        .then(r => {
            fetchArticles()(dispatch)
        })    
        .then(r => {
            updateFollowing("GET", username)(dispatch)
        })
        .catch( r => {
            setErrorMsg(r.message)(dispatch)
        })
}

// register a new user with the server
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

// logout out a user
export const logoutFetch = () => (dispatch) => {
    resource('PUT', 'logout')
        .then(r => {
            dispatch( {type: "LOGOUT"})
            dispatch({type: "SUCCESS", text: "You have successfully logged out"})
        }).catch( r => {
            setErrorMsg(r.message)(dispatch)
        })
}

export const checkLogin = ()=> (dispatch) => {
    let username;
    resource('GET', 'isloggedin')
        .then(r => {
            dispatch({type: 'AUTHENTICATE', response: r})
            username = r.username;
        })
        .then(r => resource('GET', 'headlines/' + username))
        .then(r => {
            dispatch({type: "LOGIN", headline: r.headlines[0]})
        })
        .then(r => resource('GET', 'avatars/' + username))
        .then(r => {
            dispatch({type: "UPDATE_AVATAR",field: r.avatars[0].avatar})
        })
        .then(r => {
            fetchProfile()(dispatch)
        })
        .then(r => {
            fetchArticles()(dispatch)
        })    
        .then(r => {
            updateFollowing("GET", '')(dispatch)
        })
 
        .catch( r => {
            dispatch({type: 'NOP'})
        })
}
