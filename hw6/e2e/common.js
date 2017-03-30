import { expect } from 'chai'
import { findName, findId, sleep } from './selenium'

exports.creds = {
    username: 'jw46test',
    password: 'cool-member-sentence'
}

exports.login = () =>
    sleep(500)
        .then(findName('loginName').clear())
        .then(findName('loginPw').clear())
        .then(findName('loginName').sendKeys("jw46test"))
        .then(findName('loginPw').sendKeys(exports.creds.password))
        .then(findId('login').click())
        .then(sleep(2000))

exports.logout = () =>
    sleep(500)
        .then(findId('logout').click())
        .then(sleep(2000))
        .then(findName('success').getText()
            .then(text => {
                expect(text).to.equal("You have successfully logged out")
            }))
        .then(sleep(1000))
    // IMPLEMENT ME
    // validate the message says: 'You have logged out'


