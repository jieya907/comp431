import { expect } from 'chai'
import mockery from 'mockery'
import { loginFetch, resource, url } from './backend'
import { setErrorMsg, setSuccessMsg } from './actions'

// npm install https://www.clear.rice.edu/comp431/sample/mock-fetch.tgz
import fetch, { mock } from 'mock-fetch'


const headerJson = { 'Content-Type': 'application/json' }

describe('Validate actions', () => {

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

    it ('resource should be a resource', (done) => {
        mock(`${url}/sample`, {
            method:'GET',
            headers: headerJson,
            json : {
                'text': 'hello world'
            }
        })

        resource('GET', 'sample')
            .then( r => {
                console.log(r)
                expect(r).to.be.ok

            })
            .then(done)
            .catch(done)
    })

    it ('resource should give me the http error', (done) => {
        mock(`${url}/random`, {
            method:'GET',
            headers: headerJson,
            status: 401
        })

        resource('GET','random')
            .catch( r => {
                expect(r).to.be.Error;
                done()
            })
    })

    it ('resource should be postable', (done) => {

        mock(`${url}/login`, {
            method: 'POST',
            headers: headerJson,
            json: {
                username: "user",
                result: "success"
            }
        })

        resource('POST', 'login')
            .then( r => {
                expect(r).to.be.ok;
                expect(r.result).to.eql('success')
            })
            .then(done)
            .catch(done)
    })


    it ('should update error message', (done) => {
        const msg = 'test message'
        setErrorMsg(msg)(a => {
            expect(a.type).to.equal('ERROR')
            expect(a.text).to.equal(msg)
        })
        done()
    })

    it ('should update success message', (done) => {
        const msg = 'test message'
        setSuccessMsg(msg)(a => {
            expect(a.type).to.equal('SUCCESS')
            expect(a.text).to.equal(msg)
        })

        done()
    })
})

