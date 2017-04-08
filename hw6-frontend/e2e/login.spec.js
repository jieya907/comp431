import { expect } from 'chai'
import { go, sleep, findId, findClass, findName, findCSS, By } from './selenium'
import common from './common'

describe('Test login', () => {

    const preamble = 'You are successfully logged in'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
            .then(findName('mainMessage').getText()
                .then(text => {
                    expect(text.indexOf(preamble)).to.equal(0)
                })
                .then(done))
    })

    const newHeadline = 'hdl'
    it("Update the headline and verify the change", (done) => {
        sleep(500)
            .then(findId('newHeadline').clear())
            .then(findId('newHeadline').sendKeys(newHeadline))
            .then(findId('btnHeadline').click())
            .then(sleep(2000))
            .then(findId('headline').getText()
                .then(text => {
                    expect(text).to.equal(newHeadline);
                })
                .then(done))
    })


    after('should log out', (done) => {
        common.logout().then(done)
    })
})
