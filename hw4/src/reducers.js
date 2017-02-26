import * as Actions from './actions'
const initialItems = require('./initialState.json')

const Reducer = (state={
    login: false,
    account: {
        name:"",
        password:"",
    },
    page: 'LANDING',
    message: "",
}, action) => {
    switch (action.type) {
        case Actions.ERROR:
            return {...state, message: action.message}
        case Actions.ROUTE_TO:
            return {...state, page: action.page}
        case Actions.UPDATE_ACCOUNT:
            switch (action.field) {
                case "name":
                    return {...state, 
                        account: {
                            ...state.account, 
                            name: action.text
                        }}
                case 'password':
                    return {...state, 
                        account: {
                            ...state.account, 
                            password: action.text
                        }}
                default:
                    return state;
            }
        default:
            return state;
    }
}

export default Reducer
