
import * as Actions from './actions'
const initialItems = require('./initialState.json')

const Reducer = (state={
    account: {},
    location: 'LANDING',
    errorMessage: "",
}, action) => {
    switch (action.type) {
        case Actions.ERROR:
            return {...state, errorMessage: action.text}
        case Actions.ROUTE_TO:
            return {...state, location: action.location}
        case Actions.UPDATE_ACCOUNT:
            return {...state, account: action.account, location:'MAIN'}
        default:
            return state;
    }
}

export default Reducer
