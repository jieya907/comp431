import { expect } from 'chai'
import { go, sleep, findId, findClass, findName, findCSS, By } from './selenium'
import common from './common'

describe('Test Profile update', () => {

    const preamble = 'You are successfully logged in'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should update the email', (done) => {
        sleep(500)
            .then()
    })


    after('should log out', (done) => {
        common.logout().then(done)
    })
})
