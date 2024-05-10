import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { keyID, keySecret } from './configEnv.js';
import { User } from '../models/user.model.js';

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

export function passportSetup() {
    passport.use(
        new GoogleStrategy({
            callbackURL: '/auth/google/redirect',
            clientID: keyID,
            clientSecret: keySecret
        }, (accessToken, refreshToken, profile, done) => {
            // passport callback function
            User.findOne({googleId:profile.id}).then((currentUser) => {
                if(currentUser) {
                    done(null, currentUser);
                } else {
                    new User({
                        username: profile.displayName,
                        googleId: profile.id,
                        picture: profile.picture
                    }).save().then((newUser) => {
                        done(null, newUser);
                    })
                }
            })
        })
    );
};

export default passportSetup;
