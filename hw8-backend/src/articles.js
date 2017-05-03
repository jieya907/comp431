let nextId = 4;
const Post = require('./model.js').Post
const User = require('./model.js').User
const Profile = require('./model.js').Profile
const isLoggedIn = require('./auth.js').isLoggedIn
const ObjectId = require('mongoose').Types.ObjectId;
const md5 = require('md5')
const auth = require('./auth.js')
const uploadImage = require('./uploadCloudinary.js')

const getUser = (username, callback) => {
    Profile.find({username: username}).exec((err, items) => {
        callback(items[0])
    })
}


const findByAuthor = (inputAuthor, callback) => {
    let query;
    if (ObjectId.isValid(inputAuthor)) {
        query = Post.find({ _id: new ObjectId(inputAuthor)})
    } else {
        query = Post.find({ author: inputAuthor})
    }

    query.exec(function(err, items) {
        console.log('There are ' + items.length + ' entries for ' + inputAuthor)
        var totalLength = 0
        items.forEach(function(article) {
            if (article.body){
                totalLength += article.body.length
            }
        })
        console.log('average length', totalLength / items.length)		
        callback(items)
    })
}

const getArticlesByAuthors = (authors, limit, callback) => {
    console.log("authors are " + authors)
    Post.find({author: {$in: authors}})
        .sort({date: -1})
        .limit(limit).exec((err, items) => {
        callback(items)
    })
}

const showArticles = (req, res) => {
    if (req.params.id) {
        console.log("get article for id " + req.params.id)
        findByAuthor(req.params.id, (item) => {
            console.log(item)
            res.send(item)
        })
    } else {
        console.log("Showing all articles")
        getUser(req.username, (userObj) => {
            console.log(userObj)
            const usersToQuery = [req.username, ...userObj.following ]
            console.log( req.username, usersToQuery)

            getArticlesByAuthors(usersToQuery,10, (articles) => {
                res.send({articles: articles})
            })

        })
    }
}

const addArticle = (req, res) => {

    // These two lines are for inserting the articles with initDatabase.js
    //let newArt = Object.assign({}, req.body)
    //delete newArt._id;

    let newArt = {
        author: req.username,
        text: req.body.text,
        date: new Date(Date.now()),
        img: req.fileurl,
        comments: []
    };
    console.log("adding article ", newArt)

    new Post(newArt).save((err, post) => {
        console.log("returned item from mongoose", post)
        res.send({articles: [post]})
    })
}

const editArticle = (req, res) => {

    if(!req.params.id) {
        re.sendStatus(400)
    }

    console.log("article id is ", req.params.id)
    Post.find({_id: req.params.id}).exec((err, item) => {
        let article = {};
        if(!req.body.commentId) {
            let old = item[0]
            if(req.username != old.author) {
                res.sendStatus(401)
                return
            }
            article = {
                author: req.username,
                text: req.body.text,
                date: new Date(Date.now()),
                img: old.img,
                comments: old.comments
            }
            // update article text
            article.text= req.body.text;
            let nArt = {};
            nArt.text = req.body.text;
        } else if (req.body.commentId == -1)  {
            const cId = Math.floor(Math.random() * 1000000);
            const comment = {
                author: req.username,
                commentId: cId, // hash username and timestamp
                date: new Date(Date.now()),
                text: req.body.text,
            }
            console.log("add new comments ", comment)
            // Post a new comment 
            console.log("old article is ", item)
            article = item[0]
            if (article.comments) {
                article.comments.push(comment)
            }else {
                article.comments = []
                article.comments.push(comment)
            }
        } else {
            console.log("edit comment content")
            article = item[0]
            const comments = article.comments.map((c) => {
                if (c.commentId == req.body.commentId) {
                    if (c.author == req.username) {
                        c.text = req.body.text;
                    }
                    return c
                } else {
                    return c
                }
            })
            article.comments = comments;
        }

        console.log("article to be updated to " +  article)
        Post.findOneAndUpdate({_id: req.params.id}, article, (err, doc) => {

            console.log("after executing find and update " + doc)
            Post.find({_id: req.params.id}).exec((err, items) => {
                res.send({articles: items})
            })
        })
    })
}

exports.endpoints = (app) => {
    app.get('/articles/:id?', isLoggedIn, showArticles)
    app.post('/article', isLoggedIn, uploadImage('article'), addArticle)
    app.put('/articles/:id', isLoggedIn, editArticle)
}
