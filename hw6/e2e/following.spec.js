import { expect } from 'chai'
import { go, sleep, findId, findClass, findName, findCSS, By } from './selenium'
import common from './common'

describe('Test login', () => {

    const user = 'cqw1test'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should add a user to follow', (done)=> {
        let numFollowing
        sleep(300)
            .then(findClass("following")
                .then(r => {
                    numFollowing = r.length;
                }))
            .then(findName("inputFollow").clear())
            .then(findName("inputFollow").sendKeys(user))
            .then(findName("btnAddFollow").click())
            .then(sleep(500))
            .then(r => {
                return findClass("following")
            })
            .then(r => {
               expect(r).to.have.length(numFollowing + 1)
            })
            .then(done)

    })


    after('should log out', (done) => {
        common.logout().then(done)
    })
})
