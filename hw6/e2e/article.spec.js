import { expect } from 'chai'
import { go, sleep, findClass, findId, findName, findCSS, By } from './selenium'
import common from './common'

describe('Test article actions', () => {


    const post = "A new brand post from selenium"
    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should create a new article', (done)=> {
        sleep(300)
            .then(findName("inputArticle").clear())
            .then(findName("inputArticle").sendKeys(post))
            .then(findName("btnAddArticle").click())
            .then(sleep(500))
            .then(r => {
                return findClass("articleText")
            })
            .then(r => {
              r[0].getText()
                .then(text => {
                    expect(text).to.eql(post)
                })
            })
        .then(done)

    })
    after('should log out', (done) => {
        common.logout().then(done)
    })
})
