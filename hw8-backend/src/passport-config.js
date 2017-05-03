const passport = require('passport')
const User = require('./model.js').User

const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = {
    facebookAuth: {
        'clientID'      : '419909458364895', // your App ID
        'clientSecret'  : '3c460a39c2007e9beaa96be5e20a8717', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/callback'

    }
}

exports.passport = passport
// serialize the user for the session
passport.serializeUser(function(user, done) {
    console.log('in serializeUser', user)
    done(null, user.id);
});

// deserialize the user from the session
passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new FacebookStrategy(configAuth.facebookAuth,
    function(token, refreshToken, profile, done) {
        console.log("how about here?")
        process.nextTick(()=> {
            console.log("what's happening here?")
            /*
                User.findOne({'facebook.id': profile.id}, (err, user)=> {
            // if there is no user found with that facebook id, create them
                    var newUser = new User();

            // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

            // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

            // if successful, return the new user
                        return done(null, newUser);
                    });
                })
                */
            return done(null, profile)
        })
    }));


