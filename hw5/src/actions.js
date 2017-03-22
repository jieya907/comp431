export const ADD_CONTENT = 'ADD_CONTENT'
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const UPDATE_CONTENT = 'UPDATE_CONTENT'
export const UPDATE_HEADLINE = 'UPDATE_HEADLINE'
export const UPDATE_PROF_ACCOUNT = 'UPDATE_PROF_ACCOUNT'
export const ROUTE_TO = 'ROUTE_TO'
export const SHOW_SEARCH = 'SHOW_SEARCH'
export const UNFOLLOW = 'UNFOLLOW'
export const ADD_FOLLOW = 'ADD_FOLLOW'
export const LOGIN = 'LOGIN'
export const NOP = 'NOP'
export const ERROR = 'ERROR'

export const setErrorMsg = (msg) => {
    return (dispatch) => {
        dispatch({
            type: 'ERROR',
            text: msg
        })
    }
}