import { expect } from 'chai'
import { go, sleep, findClass, findId, findName, findCSS, By } from './selenium'
import common from './common'

describe('Test article actions', () => {

    const editedPost = 'new post with different text'
    const post = "A new brand post from selenium"

    const uniquePost = 'Only One Article Like This'
    let username;

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should create a new article', (done)=> {
        sleep(300)
            .then(_ => findId('username'))
            .then( r => {
                r.getText()
                    .then( text => {
                        username = text
                    })
            })
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
    
    it('should edit an article', (done)=> {
        sleep(300)
            .then(r => {
                return findClass('articleText')
            })
            .then(r => {
                r[0].sendKeys(editedPost)
            })
            .then( r => {
                return findClass('btnEdit')
            })
            .then( r => {
                r[0].click()
            })
            .then(r => findClass('articleText'))
            .then(r => {
                r[0].getText()
                    .then(text => {
                        expect(text).to.eql(editedPost + post)
                    })
            })
            .then(done)
    })

    it('should search the article', (done) => {
        sleep(1000)
            .then(findName('searchBar').clear())
            .then(findName('searchBar').sendKeys(uniquePost))
            .then(sleep(300))
            .then(_ => findClass('articleText'))
            .then(r => {
                expect(r).to.have.length(1)
            })
            .then(_ => findId('articleMeta'))
            .then(r => {
                r.getText()
                    .then(text => {
                        expect(text.indexOf(username)).to.equal(0)
                    })
            })
            .then(done)
    })
    after('should log out', (done) => {
        common.logout().then(done)
    })
})
