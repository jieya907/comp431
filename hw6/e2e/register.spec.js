
import { expect } from 'chai'
import { go, sleep, findId, findClass, findName, findCSS, By } from './selenium'
import common from './common'

describe('Test login', () => {

    const user = {
        name: 'someone',
        email: 'someone@abc.com',
        tel: '1234567890',
        dob: '1990-12-1',
        zip: '11111',
        password: '111111',
    }

    it('should register a new user', (done) => {
        go().then(sleep(500))
            .then(findId('regName').clear())
            .then(findId('regEmail').clear())
            .then(findId('regTel').clear())
            .then(findId('regZip').clear())
            .then(findId('regPw').clear())
            .then(findId('regPwC').clear())
            .then(findId('regName').sendKeys(user.name))
            .then(findId('regEmail').sendKeys(user.email))
            .then(findId('regTel').sendKeys(user.tel))
            .then(findId('regDob').sendKeys(user.dob))
            .then(findId('regZip').sendKeys(user.zip))
            .then(findId('regPw').sendKeys(user.password))
            .then(findId('regPwC').sendKeys(user.password))
            .then(findId('btnReg').click())
            .then(sleep(5000))
            .then(findName('success').getText()
                .then(text => {
                    expect(text).to.equal('Successfully registered but cannot log in yet')
                })
                .then(done))
    })
})
