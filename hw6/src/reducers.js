
import * as Actions from './actions'

import { filterContent } from './component/Main/articles/filterContent.js'

const Reducer = (state={
    account: {},
    avatar: "",
    nextId: 0,
    errorMessage: "",
    successMessage: "",
    following: [],
    location: 'LANDING',
    search: "",
    headline: "",
    contents: [],
    articles:[]
}, action) => {
    if(!action.type) {
        return state
    }
    switch (action.type) {
        case Actions.ERROR:
            return {...state, errorMessage: action.text}
        case Actions.ROUTE_TO:
            return {...state, location: action.location}
        case Actions.UPDATE_ACCOUNT:
            return {...state, account: action.account,  
                errorMessage: "Update Successful!"}
        case Actions.UPDATE_CONTENT:
            return {...state, 
                contents: [...action.contents], 
                articles:[...action.contents]}
        case Actions.UPDATE_HEADLINE:
            return {...state, headline: action.text}
        case Actions.ADD_CONTENT: // used for adding articles
            return {...state, 
                contents: [ action.article, ...state.contents],
                articles: [ action.article, ...state.contents]
            }
        case Actions.SHOW_SEARCH:
            return {...state, 
                search: action.key, 
                articles: filterContent(state.contents, action.key)}
        case Actions.ADD_FOLLOW:
            return {...state,following:[...state.following, action.account]}
        case Actions.UNFOLLOW:
            const newContent = state.contents.filter((item) => {
                return item.author != action.username
            })

            return {
                ...state,
                contents: newContent,
                articles: newContent
            }
        case Actions.UPDATE_AVATAR:
            return {...state, avatar: action.field}
        case Actions.UPDATE_EMAIL:
            return {...state, email: action.field}
        case Actions.UPDATE_DOB:
            let bday = new Date(action.field)
            return {...state, dob: bday.toDateString()}
        case Actions.UPDATE_ZIPCODE:
            return {...state, zipcode: action.field}
        case Actions.UPDATE_FOLLOW:
            return {...state, following: []}
        case Actions.SUCCESS:
            return {...state, successMessage: action.text}
        case Actions.LOGIN:
            return {
                ...state,
                account: {...state.account,
                    name:action.headline.username,
                },
                location: "MAIN",
                headline: action.headline.headline
            }
        case Actions.LOGOUT:
            return {
                account: {},
                avatar: "",
                nextId: 0,
                errorMessage: "",
                successMessage: "",
                following: [],
                location: 'LANDING',
                search: "",
                headline: "",
                contents: [],
                articles:[]
            }
        default:
            return state;
    }
}

export default Reducer
