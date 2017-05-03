var isLoggedIn = require('./auth.js').isLoggedIn
const Profile = require('./model.js').Profile
const User = require('./model.js').User
const uploadImage = require('./uploadCloudinary.js')
const index = (req, res) => {
    res.send({ hello: 'world' })
}

let user = {
    'username': 'Scott',
    'headline': 'Happy',
    'email': 'someone@abc.com',
    'zipcode': '77005',
    'avatar': 'http://cdn.skim.gs/image/upload/v1456344012/msi/Puppy_2_kbhb4a.jpg'
}

const getHeadline = (req, res) => {

    const users = req.params.users ? req.params.users.split(',') : [req.username]

    Profile.find({username: {$in: users}}).exec((err, items) => {
        let body = {}
        body.headlines = items.map((item) => {
            return {username: item.username, headline: item.headline}
        })
        res.send(body)
    })
}

const putHeadline = (req, res) => {
    if (!req.body.headline) {
        res.sendStatus(400)
        return
    }
    user.headline = req.body.headline;
    user.username = req.username;
    Profile.find({username: req.username}).exec( (err, item) => {
        if (item && item.length > 0) {
            let oldProf = item[0]
            oldProf.headline = req.body.headline;
            Profile.findOneAndUpdate({username: req.username},
                oldProf, (err, doc ) => {
                    console.log("after update headline")
                    res.send({
                        username: req.username, headline: req.body.headline
                    })
                    return
                })
        } else {
            new Profile(user).save((err, prof) => {
                console.log("saved a new profile")
            })
            res.send({
                "username" : req.username,
                "headline" : req.body.headline
            })

        }
    })
}

const updateProfile = (req, res, field) => {
    user.username = req.username;
    user[field] = req.body[field];

    Profile.find({username: req.username}).exec((err, item) => {
        let body = {username: req.username}
        body[field] = req.body[field]
        if (item && item.length > 0) {
            let oldProf = item[0]
            oldProf[field] = req.body[field];
            Profile.findOneAndUpdate({username: req.username},
                oldProf, (err, doc ) => {
                    res.send(body)
                    return
                })

        } else {
            new Profile(user).save((err, prof) => {
                console.log("saved a new profile")
                res.send(body)
                return
            })
        }
    }) 


}

const getProfile = (req, res, field) => {
    let user = req.params.user ? req.params.user : req.username
    let body = {username: user}

    Profile.find({username: user}, (err, item) => {
        console.log("in get profile user is ", user) 
        body[field] = item[0][field]
        res.send(body)
    })

}

const email = (req, res) => {
    updateProfile(req, res, 'email')
}

const getEmail = (req, res) => {
    getProfile(req, res, 'email')
}

const zipcode = (req, res) => {
    updateProfile(req, res, 'zipcode')
}

const getZipcode = (req, res) => {
    getProfile(req, res, 'zipcode')
}

const uploadAvatar = (req, res) => {
    req.body.avatar = req.fileurl;
    updateProfile(req, res, 'avatar')
}

const getAvatar = (req, res) => {

    const users = req.params.user ? req.params.user.split(',') : [req.username]

    Profile.find({username: {$in: users}}).exec((err, items) => {
        let body = {}
        body.avatars = items.map((item) => {
            return {username: item.username, avatar: item.avatar}
        })
        res.send(body)
    })
    
}

const getDob = (req, res) => {
    res.send({'dob':'652165200000'})
}

const addFollow = (req, res) => {
    const user = req.username;

    User.find({username: req.params.user}).exec((err, item) => {
        if (item.length == 0){
            res.status(404)
            res.send({"message" : "User to follow does not exist"})
            return
        } 
        Profile.find({username: user}, (err, item) => {
            if (err) {
                console.log(err)
                res.send(404)
                return
            }
            let userProf = item[0]
            userProf.following.push(req.params.user)
            Profile.findOneAndUpdate({username: user}, userProf, (err, doc) => {
                console.log("updated user profile")
                res.send({username: req.username, following: userProf.following})
            })
        })
    })

}

const getFollow = (req, res) => {
    getProfile(req, res, 'following')
}

const removeFollow = (req, res) => {
    Profile.find({username: req.username}).exec((err, item) => {
        if (item && item.length > 0) {
            let oldProf = item[0]
            oldProf.following = oldProf.following.filter((f) => {
                return f != req.params.user
            })
            Profile.findOneAndUpdate({username: req.username},
                oldProf, (err, doc ) => {
                    res.send(oldProf)
                    return
                })

        } 
    }) 


}


exports.endpoints = app => {
    app.get('/', index)
    app.get("/headlines/:users?", isLoggedIn, getHeadline)
    app.put("/headline", isLoggedIn, putHeadline);
    app.put("/email", isLoggedIn, email);
    app.get("/email/:user?", isLoggedIn, getEmail);
    app.get('/dob', isLoggedIn, getDob)
    app.get("/zipcode/:user?", isLoggedIn, getZipcode);
    app.put("/zipcode", isLoggedIn, zipcode);
    app.get("/avatars/:user?", isLoggedIn, getAvatar);
    app.put("/avatar", isLoggedIn, uploadImage('avatar'), uploadAvatar);
    app.put('/following/:user', isLoggedIn, addFollow);
    app.get('/following/:user?', isLoggedIn, getFollow)

    app.delete('/following/:user', isLoggedIn, removeFollow)
}
