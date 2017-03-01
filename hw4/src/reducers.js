
import * as Actions from './actions'
const initialItems = require('./initialState.json')

initialItems.contents.sort((a, b)=> {
    return parseInt(b.timestamp) - parseInt(a.timestamp)
})

const Reducer = (state={
    account: {},
    nextId: 3,
    contents: initialItems.contents,
    errorMessage: "",
    following: initialItems.following,
    location: 'LANDING',
    profAccount : initialItems.profAccount,
    search: "",
}, action) => {
    switch (action.type) {
        case Actions.ERROR:
            return {...state, errorMessage: action.text}
        case Actions.ROUTE_TO:
            return {...state, location: action.location}
        case Actions.UPDATE_ACCOUNT:
            return {...state, account: action.account}
        case Actions.UPDATE_PROF_ACCOUNT:
            return {...state, profAccount: action.account}
        case Actions.ADD_CONTENT:
            return {...state, contents: [ action.article, ...state.contents]}
        case Actions.SHOW_SEARCH:
            console.log("show " + action.key)
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
                account: {...state.account, name:action.uname},
                location: "MAIN"
            }
        default:
            return state;
    }
}

export default Reducer
