const md5 = require('md5')
var redis = require('redis').createClient(process.env.REDIS_URL)


let user2Credentials = {}
let sessionUser = {}

let cnter = 0;

const getUser = (username) => {
    return user2Credentials[username]
}

const getHash = (username, password) => {
    return md5(user2Credentials[username].salt + password)
}

const register = (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;


    const salt = Math.random();
    const hash = md5(salt + password)

    user2Credentials[username] = {'salt' : salt, 'hash': hash}
    var msg = { username: username, result: 'success'}
    res.send(msg)
}


const cookieKey = 'sid'

const generateCode = (username) => {
    cnter += 1
    return cnter.toString();
}

const login = (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.sendStatus(400)
        return
    }

    const userObj = getUser(username)

    if (!userObj || userObj.hash !== getHash(username,password)) {
        res.sendStatus(401)
        return
    }

    const sessionId = generateCode(username);
    res.cookie(cookieKey, sessionId, {maxAge: 3600 * 1000, httpOnly: true})
   
    sessionUser[sessionId] = username;

    console.log(sessionId)
    console.log(username)
    //client.hmset("hardcoded", username, _=>{})
    redis.hmset(sessionId, sessionId, username)
    redis.hgetall(sessionId, (err, obj) => {
        console.log(sessionId + ' mapped to ' + obj)
    })

    var msg = { username: username, result: 'success'}
    res.send(msg)
}


const logout = () => {
    res.send('OK')
}


const isLoggedIn = (req, res, next) => {
    const sid = req.cookies[cookieKey]

    if (!sid) {
        return res.sendStatus(401)
    }

    redis.hgetall(sid, (err, object) => {
        console.log(object);
        if (object) {
            req.username = object
            next()
        } else{
            res.sendStatus(401)
        }
    })

    /*
    const username = sessionUser[sid]
    if (username) {
        req.username = username
        next()
    } else {
        res.sendStatus(401)
    }
    */
}

module.exports = (app) => {
    app.post('/register', register)
    app.post('/login', login)

    app.put('/logout', isLoggedIn, logout)
}
