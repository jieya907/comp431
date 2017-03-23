import { expect } from 'chai'
import mockery from 'mockery'
import { fetchArticles, url } from './backend'

import { searchAction } from './component/Main/articles/articleAction.js'

// npm install https://www.clear.rice.edu/comp431/sample/mock-fetch.tgz
import fetch, { mock } from 'mock-fetch'

const headerJson = { 'Content-Type': 'application/json' }

// sample articles
const articles = {
    "articles": [
        {
            "id" : 1,
            "author": "A",
            "text": "something"
        }, 
        {
            "id" : 2,
            "author": "A",
            "text": "something"
        }, 
        {
            "id" : 3,
            "author": "A",
            "text": "something"
        }

    ]

}
describe('Validate article actions', () => {
    beforeEach(() => {
        global.fetch = fetch
    })


    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    // Test whether fetch articles return the desired results
    it ('should fetch articles', (done)=> {
        mock(`${url}/articles`, {
            method: 'GET',
            headers: headerJson,
            json: articles
        })

        const articleHelper = () => (dispatch) => {
            dispatch(fetchArticles())
        }


        fetchArticles()( fn => (action) => {
            expect(action.type).to.eql("UPDATE_CONTENT")
            expect(action.contents).to.deep.eql(articles)

        })
        done()
    })


    // test if action is emitted for search the articles
    it('should update the search key word', (done) => {
        const term = "jw46"
        searchAction(term)(
            action => {
                expect(action.type).to.be.eql("SHOW_SEARCH");
                expect(action.key).to.eql(term)
            }
        )
        done()
    })
})
