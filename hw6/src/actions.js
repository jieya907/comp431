export const ADD_COMMENT='ADD_COMMENT'
export const ADD_CONTENT = 'ADD_CONTENT'
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const UPDATE_AVATAR = 'UPDATE_AVATAR'
export const UPDATE_CONTENT = 'UPDATE_CONTENT'
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_ZIPCODE = 'UPDATE_ZIPCODE'
export const UPDATE_DOB = 'UPDATE_DOB'
export const UPDATE_HEADLINE = 'UPDATE_HEADLINE'
export const UPDATE_PROF_ACCOUNT = 'UPDATE_PROF_ACCOUNT'
export const ROUTE_TO = 'ROUTE_TO'
export const SHOW_SEARCH = 'SHOW_SEARCH'
export const SUCCESS = 'SUCCESS'
export const UNFOLLOW = 'UNFOLLOW'
export const ADD_FOLLOW = 'ADD_FOLLOW'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const NOP = 'NOP'
export const ERROR = 'ERROR'
export const UPDATE_FOLLOW = 'UPDATE_FOLLOW'

export const setErrorMsg = (msg) => {
    return (dispatch) => {
        dispatch({
            type: 'ERROR',
            text: msg
        })
    }
}

export const setSuccessMsg = (msg) => {
    return (dispatch) => {
        dispatch({
            type: 'SUCCESS',
            text: msg
        })
    }
}

export const routeTo = (location) => {
    return (dispatch) => {
        dispatch({
            type: ROUTE_TO,
            location: location
        })
    }
}
