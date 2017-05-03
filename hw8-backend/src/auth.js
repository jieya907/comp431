var session      = require('express-session')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const User = require('./model.js').User
const Profile = require('./model.js').Profile
const ObjectId = require('mongoose').Types.ObjectId;
const passport = require('passport')

const redis = require('redis').createClient(process.env.REDIS_URL)

const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = {
    facebookAuth: {
        'clientID'      : '419909458364895', // your App ID
        'clientSecret'  : '3c460a39c2007e9beaa96be5e20a8717', // your App Secret
        'callbackURL'   : 'https://gentle-hollows-55657.herokuapp.com/auth/callback'

    }
}

// serialize the user for the session
passport.serializeUser(function(user, done) {
    console.log('in serializeUser', user)
    done(null, user.id);
});

// deserialize the user from the session
passport.deserializeUser(function(user, done) {
    done(null, user)
});

const secret = '3c460a39c2007e9beaa96be5e20a8717';

passport.use(new FacebookStrategy(
    {
        clientID      : '419909458364895', // your App ID
        clientSecret  : '3c460a39c2007e9beaa96be5e20a8717', // your App Secret
        callbackURL   : 'https://gentle-hollows-55657.herokuapp.com/auth/callback',
        //callbackURL   : 'http://localhost:3000/auth/callback',
        profileFields: ['id', 'displayName', 'emails']
    },
    function(token, refreshToken, profile, done) {
        process.nextTick(()=> {
            console.log(profile)
            sessionUser[profile.id] = { 
                username: profile.displayName,
                email: profile.emails[0]
            }

            Profile.find({username: profile.displayName})
                .exec((err, items)=> {
                    console.log(items)
                    console.log(items.length)
                    if (items.length == 0) {
                        const prof = {
                            username: profile.username,
                            headline: "",
                            following: [],
                            email: profile.emails[0],
                            zipcode: '',
                            avatar: "http://cdn.skim.gs/image/upload/v1456344012/msi/Puppy_2_kbhb4a.jpg"
                        }
                        new Profile(prof).save((err, prof) => {})

                        return done(null, profile)
                    }
                })


        })
    }));

exports.passport = passport

let sessionUser = {}

let cnter = 0;

const cookieKey = 'sid'

const getUser = (username, callback) => {
    let obj
    User.find({username, username}).exec((err, obj) => {
        callback({salt : obj[0].salt, hash: obj[0].hash})
    })
}

const getHash = (salt, password) => {
    return md5(salt + password)
}

const register = (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    const email = req.body.email;
    const zipcode  = req.body.zipcode;

    const prof = {
        username: username,
        headline: "",
        following: [],
        email: req.body.email,
        zipcode: req.body.zipcode,
        avatar: ""
    }

    new Profile(prof).save((err, prof) => {

        // in updatePassword, we will save a new user entry in the db
        updatePassword(username, password, res)
    })
}

/*
 * generate a number for session id
 */
const generateCode = (username) => {
    cnter += 1
    return cnter.toString();
}

/* Backend function for login a user
 * */
const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.sendStatus(400)
        return
    }

    getUser(username, (userObj) => {
        if (!userObj || userObj.hash !== getHash(userObj.salt,password)) {
            res.sendStatus(401)
            return
        } else {
            const sessionId = generateCode(username);
            res.cookie(cookieKey, sessionId, {maxAge: 3600 * 1000, httpOnly: true})


            redis.hmset(sessionId, sessionId, username)
            redis.hgetall(sessionId, (err, obj) => {
                console.log(sessionId + ' mapped to ' + obj)
            })

            var msg = { username: username, result: 'success'}
            res.send(msg)
        }
    })
}


/*
 * log out a user 
 */
const logout = (req, res) => {
    redis.del(req.cookies[cookieKey])
    console.log("after delete cookie")
    res.send('OK')
}

/* a middleware function for checking if a user is logged in
*/
const isLoggedIn = (req, res, next) => {
    const sid = req.cookies[cookieKey]

    if (sid) {

        redis.hgetall(sid, (err, object) => {
            if (object) {
                console.log(object, "is logged in");
                req.username = object[sid]
                next()
            } else{
                res.sendStatus(401)
            }
        })

    } else if (req.isAuthenticated()) {
        console.log("req is authenticated")

        const userObj = sessionUser[req.user]
        const username = userObj.username;
        req.username = userObj.username;

        res.cookie(cookieKey, req.user, {maxAge: 3600 * 1000, httpOnly: true})

        redis.hmset(req.user, req.user, username)
        next()
    } else {
        res.sendStatus(401)
    }
}

const checkLogin = (req, res) => {
    res.send({result: "Logged in", username: req.username})
}


exports.isLoggedIn = isLoggedIn


/*
 * endpoint for updating a password
 */
const password = (req, res) => {
    updatePassword(req.username, req.body.password, res);
}


/*
 * utility function for updating a password
 */
const updatePassword = (username, password, res) => {

    const salt = Math.random();
    const hash = md5(salt + password)
    User.remove({username: username}, (err) => {
        if (err) return handleError(err);
        console.log("removed entries for " + username)
    })

    new User({username: username, salt: salt, hash: hash }).save((err, obj)=> {
        console.log("saved a user object")
    })
    var msg = { username: username, result: 'success'}

    // set the cookies 
    const sessionId = generateCode(username);
    res.cookie(cookieKey, sessionId, {maxAge: 3600 * 1000, httpOnly: true})

    res.send(msg)
}

/*
 * for oauth
 */
const profile = (req, res) => {
    res.redirect('http://charming-crime.surge.sh')
}


/*
 * Failure redirect
 */
const fail = (req, res) => {
    console.log("something is bad")
    res.sendStatus(400)
}


exports.endpoints = (app) => {
    app.use(session({ secret: 'thisIsMySecretMessageHowWillYouGuessIt'}))
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/login/facebook', passport.authenticate('facebook', 
        {scope: 'email'}), (req, res) => {
            console.log("something?")
        })
    app.use('/auth/callback', passport.authenticate('facebook', {
        successRedirect: '/profile', failureRedirect:'/fail'}), 
        (req, res) => {
            console.log('finally got somewhere!')

        })
    app.use('/profile', profile)
    app.use('/fail', fail)

    app.post('/register', register)
    app.post('/login', login)
    app.get('/isloggedin', isLoggedIn, checkLogin)
    app.put('/logout', isLoggedIn, logout)
    app.put('/password', isLoggedIn, password)
}
