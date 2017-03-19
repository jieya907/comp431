import Reducer from './reducers'

import * as Actions from './actions'

import { expect } from 'chai'

console.log(Reducer)

const initialItems = require('./initialState.json')

initialItems.contents.sort((a, b)=> {
    return parseInt(b.timestamp) - parseInt(a.timestamp)
})

let nextId = initialItems.following.length;

describe('Validate reducer', () => {

    it('should initialize state', () => {
        expect(
            Reducer(undefined, {})
        ).toEqual(
            {
                account: {},
                nextId: nextId,
                contents: initialItems.contents,
                errorMessage: "",
                following: initialItems.following,
                location: 'LANDING',
                profAccount : initialItems.profAccount,
                search: "",
                headline: "I NEED 8 HRS SLEEP",
            }
        )
    })

})
