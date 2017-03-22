import { expect } from 'chai'
import mockery from 'mockery'
import { fetchArticles, url } from './backend'

// npm install https://www.clear.rice.edu/comp431/sample/mock-fetch.tgz
import fetch, { mock } from 'mock-fetch'

const headerJson = { 'Content-Type': 'application/json' }

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

    it ('should fetch articles', (done)=> {
        mock(`${url}/articles`, {
            method: 'GET',
            headers: headerJson,
            json: articles
        })

        const articleHelper = () => (dispatch) => {
            dispatch(fetchArticles())
        }

        articleHelper()( fn => fn((action) => {
                expect(action.type).to.eql("UPDATE_CONTENT")
                expect(action.contents).to.deep.eql(articles)

            })
        )
        done()
    })
})
