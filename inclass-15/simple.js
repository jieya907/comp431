const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

    function preprocess(req, res) {
        let body = ''
        req.on('data', function(chunk) {
            body += chunk
        })
        req.on('end', function() {
            req.body = body
            server(req, res)
        })
    }

    function setRes (payload, res) {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200
        res.end(JSON.stringify(payload))

    }

    function articles (req, res) {
        const payload = { "articles" : [
            {"id" : 1, "author" : "Scott", body: "a post"},
            {"id" : 2, "author" : "Scott", body: "another post"},
            {"id" : 3, "author" : "Scott", body: "yet another post"},
        ]}

        setRes(payload, res)
    }

    function login (req, res) {
        const info = JSON.parse(req.body)
        const payload = {
            username: info.username,
            result: "success"
        }
        setRes(payload, res)
    }
    function server(req, res) {
        console.log('Request method        :', req.method)
        console.log('Request URL           :', req.url)
        console.log('Request content-type  :', req.headers['content-type'])
        console.log('Request payload       :', req.body)

        if (req.method == "GET" ) {
            console.log("in first if statement")
            switch (req.url) {
                case "/":
                    return setRes({ 'hello': 'world' }, res)
                case "/articles":
                    console.log("in switch case")
                    return articles(req, res)
                default :
                    console.log( "unknown URL")
                    return
            }
        } else if (req.method == "POST") {
            if (req.url == "/login") {
                return login(req, res)
            }
        } else if (req.method == "PUT") {
            if (req.url == "/logout") {
                res.setHeader('Content-Type', 'text/plain')
                res.statusCode = 200
                res.end("OK")
                return
            }
        }
    }

