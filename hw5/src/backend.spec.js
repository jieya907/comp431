import { expect } from 'chai'
import mockery from 'mockery'
import { login, loginFetch, logout, url } from './backend'

// npm install https://www.clear.rice.edu/comp431/sample/mock-fetch.tgz
import fetch, { mock } from 'mock-fetch'

const headerJson = { 'Content-Type': 'application/json' }
const testLogin = (username, password) => (dispatch) => {
            dispatch(loginFetch(username, password))
        }


describe( 'Validate authentication', () => {


    beforeEach(() => {
        global.fetch = fetch
    })


    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it ('should login a user', (done) => {
        const username = 'jw46test'
        const headline = 'Hello'
        const password = 'cool-member-sentence'

        mock(`${url}/login`, {
            method: 'POST',
            headers: headerJson,
            json: {
                username: username,
                result: "success"
            }
        })

        mock(`${url}/headlines`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            json: {
                headlines: [{ username: username, headline: headline }]
            }
        })

        
        testLogin(username, password)(
            function(fn) { 
                console.log(fn)
                return fn(function(action) {
                    expect(action.type).to.eql("LOGIN")
                    expect(action.headline).to.deep.eql(
                        {
                            username: username,
                            headline: headline
                        })
                    done()
                })
            }
        )
    })


    it('should not log in an invalid user', (done) => {
        mock(`${url}/login`, {
            method: 'POST',
            headers: headerJson,
            status: 401   
        })

        testLogin("someone", "something")(fn => fn( action => {
            expect(action.type).to.eql("ERROR")
            done()
        }))

    })

    it('should logout a user', (done) => {

        mock(`${url}/logout`, {
            method: 'PUT',
            headers: headerJson
        })

        logout()(fn => fn(action => {
            expect(action.type).to.eql("LOGOUT")
            done()
        }))
            
    })
})
