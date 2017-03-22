
import * as Actions from './actions'
const initialItems = require('./initialState.json')

initialItems.contents.sort((a, b)=> {
    return parseInt(b.timestamp) - parseInt(a.timestamp)
})

const initialState = {
    account: {},
    nextId: 0,
    errorMessage: "",
    following: initialItems.following,
    location: 'LANDING',
    profAccount : initialItems.profAccount,
    search: "",
    headline: "I NEED 8 HRS SLEEP",
    contents: [{"blah": "blah"}]
}

const Reducer = (state={
    account: {},
    nextId: 0,
    errorMessage: "",
    following: initialItems.following,
    location: 'LANDING',
    profAccount : initialItems.profAccount,
    search: "",
    headline: "I NEED 8 HRS SLEEP",
    contents: [{"blah": "blah"}]
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
            return {...state, account: action.account,  errorMessage: "Update Successful!"}
        case Actions.UPDATE_CONTENT:
            return {...state, contents: [...action.contents]}
        case Actions.UPDATE_HEADLINE:
            return {...state, headline: action.text}
        case Actions.UPDATE_PROF_ACCOUNT:
            return {...state, profAccount: action.account, errorMessage: "Update Successful!"}
        case Actions.ADD_CONTENT:
            return {...state, contents: [ action.article, ...state.contents]}
        case Actions.SHOW_SEARCH:
            return {...state, search: action.key}
        case Actions.ADD_FOLLOW:
            return {...state, nextId: state.nextId + 1,
                    following:[...state.following, {...action.account, id: state.nextId}]}
        case Actions.UNFOLLOW:
            return {
                ...state,
                following: state.following.filter(({id}) => id != action.id)
            }
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
            return initialState;
        default:
            return state;
    }
}

export default Reducer
