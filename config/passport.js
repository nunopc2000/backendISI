const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt.js');
const pipedriveController = require('../controllers/pipedriveController.js');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use('local-login', new LocalStrategy ({
    usernameField:'email',
    passwordField:'password'
}, (email, password, done) => {
    const req = "a";
    let emailN = "";
    let passN = "";
    let cargo = "";
    pipedriveController.getUsers(req, (res) => {
        if(res.statusCode == 200){

            for (let i=0; i <res.utilizadores.length; i++){
                if(res.utilizadores[i].email == email){
                    emailN = res.utilizadores[i].email;
                    passN = res.utilizadores[i].password;
                    id = res.utilizadores[i].id;
                    cargo = res.utilizadores[i].cargo;
                }
            }
            if (emailN === ""){
                return done('error')
            } else {
                bCrypt.compare(password, passN, function(err, result){
                    if (result){
                        return done(null, {
                            'id': id,
                            'cargo': cargo
                        })
                    } else {
                        return done(null, false);
                    }
                })
            }
        } else {
            return done(null, false);
        }
    })

}
));

passport.serializeUser(function (user, done){
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

const isValidPassword = async function (userpass, passoword){
    return await bCrypt.compare(password, userpass);
}