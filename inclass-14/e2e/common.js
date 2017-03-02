import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'jw46test',
    password: 'cool-member-sentence'
}

exports.login = () =>
    sleep(500)
        .then(findId('username').clear())
        .then(findId('password').clear())
        .then(findId('username').sendKeys("jw46test"))
        .then(findId('password').sendKeys(exports.creds.password))
        .then(findId('login').click())
        .then(sleep(2000))

exports.logout = () =>
    sleep(500)
        .then(findId('logout').click())
        .then(sleep(2000))
        .then(findId('message').getText()
            .then(text => {
                expect(text).to.equal("You have logged out")
            }))
        .then(sleep(1000))
    // IMPLEMENT ME
    // validate the message says: 'You have logged out'
