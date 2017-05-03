
// this is dbarticle.js 
var Article = require('./model.js').Post

function find(req, res) {
    findByAuthor(req.params.user, function(items) {
        res.send({items})
    })
}

module.exports = (app) => {
    app.get('/find/:user', find)
}


const findByAuthor = (author, callback) => {
    Article.find({ author: author }).exec(function(err, items) {
        console.log('There are ' + items.length + ' entries for ' + author)
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

