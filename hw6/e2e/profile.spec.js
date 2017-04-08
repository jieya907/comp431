import { expect } from 'chai'
import { go, sleep, findId, findClass, findName, findCSS, By } from './selenium'
import common from './common'

describe('Test Profile update', () => {

    const nEmail = 'another@abc.com'
    const nZip = '11011'
    const nPw = '111111'
    const msg = 'will not change'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should update the email', (done) => {
        sleep(500)
            .then(findId('btnProfile').click())
            .then(sleep(500))
            .then(findId('profEmail').clear())
            .then(findId('profEmail').sendKeys(nEmail))
            .then(findId('btnUpdate').click())
            .then(sleep(500))
            .then(findId('sEmail').getText()
                .then(text => {
                    expect(text.indexOf(nEmail)).to.equal(0)
                }))
            .then(done)
    })

    it('should update the zipcode', (done) => {
        sleep(500)
            .then(findId('profZip').clear())
            .then(findId('profZip').sendKeys(nZip))
            .then(findId('btnUpdate').click())
            .then(sleep(500))
            .then(findId('sZip').getText()
                .then(text => {
                    expect(text.indexOf(nZip)).to.equal(0)
                }))
            .then(done)
    })

    it('should update user password', (done) => {
        sleep(500)
            .then(findId('profPw').clear())
            .then(findId('profPw').sendKeys(nPw))
            .then(findId('profPwC').clear())
            .then(findId('profPwC').sendKeys(nPw))
            .then(findId('btnUpdate').click())
            .then(sleep(500))
            .then(findName('profSuccessMsg').getText()
                .then(text => {
                    expect(text.indexOf(msg)).to.equal(0)
                }))
            .then(findId('btnRouteMain').click())
            .then(done)
    })




    after('should log out', (done) => {
        common.logout().then(done)
    })
})
