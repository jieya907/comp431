import { updateHeadline, url } from '../../backend'

import { fetchProfile } from './profileAction.js'

import { expect } from 'chai'
import mockery from 'mockery'

import fetch, { mock } from 'mock-fetch'

describe('Validate Profile actions', () => {

    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        global.fetch = fetch
    })


    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })



    it('should update headline', (done) => {
        const username = "someone"
        const headline = "something"

        const testUpdate = (text) => (dispatch) => {
            dispatch(updateHeadline(text))
        }

        mock(`${url}/headline`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            json: { username: username, headline: headline }
        })

        testUpdate("something")(
            fn => fn(action => {
                expect(action.type).to.eql("UPDATE_HEADLINE")
                expect(action.text).to.eql(headline)
                done()
            })
        )
    })

    it (' should fetch the users profile information ', (done) => {

        mock(`${url}/email`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: { 'email': 'abc@xyz.com'}
        })

        mock(`${url}/zipcode`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: { 'zipcode': 77005}
        })

        mock(`${url}/dob`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: { 'dob': '12-1' }
        })

        const test_function = () => {
            let keysToSee = 
                ['UPDATE_DOB', 'UPDATE_EMAIL', 'UPDATE_ZIPCODE']

            fetchProfile(fn => fn((action) => {
                keysToSee = keysToSee.filter((item) => {
                    return item != action.type
                })
                switch (action.type) {
                    case 'UPDATE_DOB':
                        expect(action.field).to.eql('12-1')
                        break
                    case 'UPDATE_EMAIL':
                        expect(action.field).to.eql('abc@xyz.com')
                        break
                    case 'UPDATE_ZIPCODE':
                        expect(action.field).to.eql(77005)
                        break
                }
            }))

            done()
        }
        test_function()

    })
})
