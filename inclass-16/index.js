const express = require('express')
const bodyParser = require('body-parser')

let nextId = 4;

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


const addArticle = (req, res) => {
     console.log('Payload received', req.body)    
  const newArt = {id: nextId++, text: req.body.text, author: "A"};
    articles.articles.push(newArt)
     res.send(newArt)
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()

const showArticles = (req, res) => {
  res.send (articles);
}

app.use(bodyParser.json())

app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', showArticles)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
