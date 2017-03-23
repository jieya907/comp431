import React from 'react'
import Reducer from './reducers'

import * as Actions from './actions'

import { expect } from 'chai'

const initialItems = require('./initialState.json')

// Expected what the initial state to be 
const initialState = {
    account: {},
    nextId: 0,
    errorMessage: "",
    following: [],
    location: 'LANDING',
    profAccount : initialItems.profAccount,
    search: "",
    headline: "I NEED 8 HRS SLEEP",
    contents: [{"blah": "blah"}]
}

// hard coded articles that I expect to see after the test 
const articles =  [
    {
        "id" : 1,
        "author": "A",
        "text": "something"
    }, 
    {
        "id" : 2,
        "author": "A",
        "text": "something"
    }, 
    {
        "id" : 3,
        "author": "A",
        "text": "something else"
    }

]


describe('Validate reducer', () => {

    it('should initialize state', () => {
        expect(
            Reducer(initialState, {})
        ).to.deep.equal(initialState)
    })

    it ('should state success', () => {
        expect(
            Reducer({},{
                type: Actions.SUCCESS,
                text: "Update Successful!"
            })
        ).to.deep.equal({
            // check if the successMessage field is updated
            successMessage: "Update Successful!"
        })
    })

    it ('should state error', () => {
        expect(
            Reducer({},{
                type: Actions.ERROR,
                text: "Your phone number. Digits only"
            })
        ).to.deep.equal({
            // check if the errorMessage field is updated
            errorMessage: "Your phone number. Digits only"
        })
    })

    it ('should set the articles', () => {
        expect(
            Reducer({}, {
                type: Actions.UPDATE_CONTENT,
                contents: articles
            })
        ).to.deep.eql({
            // check if the contents field is updated
            contents: articles,
            articles: articles
        })
    })

    it ('should set the search keyword', () => {
        expect(
            Reducer({
                contents: [],
                articles: []
            }, {
                type: Actions.SHOW_SEARCH,
                key: "jw46"
            })
        ).to.deep.eql({
            // check if the search term field is updated
            search: "jw46",
            contents: [],
            articles:[]
        })
    })

    it ('should filter displayed articles by the search keyword', () => {
        // should return all text, filter by author 
        expect(
            Reducer({
                articles: articles,
                contents: articles,
            }, {
                type: Actions.SHOW_SEARCH,
                key: "A"
            })
        ).to.deep.eql({
            search: "A",
            contents: articles,
            articles: articles,
        })
        // should return only third text, filter by text content
        expect(
            Reducer({
                contents: articles,
                articles: articles,
            }, {
                type: Actions.SHOW_SEARCH,
                key: "else"
            })
        ).to.deep.eql({
            search: "else",
            contents: articles,
            articles: [
                {
                    "id" : 3,
                    "author": "A",
                    "text": "something else"
                }
            ]
        })
    })


})
