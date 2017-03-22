import React from 'react'
import Reducer from './reducers'

import * as Actions from './actions'

import { expect } from 'chai'

console.log(Reducer)

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


const tempAccount =  {
                    user: "Jane",
                    email: "jane@someplace.come",
                    zipcode: "77005"
                }


describe('Validate reducer', () => {

    it('should initialize state', () => {
        expect(
            Reducer(initialState, {})
        ).to.deep.equal(initialState)
    })

    it ('should state success', () => {
        expect(
            Reducer({},{
                type: Actions.UPDATE_ACCOUNT,
                account: tempAccount
            })
        ).to.deep.equal({
            account: tempAccount,
            errorMessage: "Update Successful!"
        })
    })
 
    it ('should state error', () => {
        expect(
            Reducer({},{
                type: Actions.ERROR,
                text: "Your phone number. Digits only"
            })
        ).to.deep.equal({
            errorMessage: "Your phone number. Digits only"
        })
    })
 
    it ('should filter displayed articles by the search keyword', () => {
        // should update the search key
        // should return the filtered text
    })


})
