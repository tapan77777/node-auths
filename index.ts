import * as express from 'express';
import * as  passport from "passport";
import {Strategy} from 'passport-google-oauth20'


const app = express();
app.listen(5000, () => {
    console.log('server is started');
})

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new Strategy({
        clientID: '72478478521-gc2m2okok007fc1q64kofua8i0c7b9vi.apps.googleusercontent.com',
        clientSecret: 'IwE_I5TJ3eFivZz4IjaSAAJa',
        callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        // if user already exist in your dataabse login otherwise
        // save data and signup
        done(null, {});
    }
));

app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));

app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/auth/fail'}),
    (req, res, next) => {
        console.log(req.user, req.isAuthenticated());
        res.send('user is logged in');
    })

app.get('/auth/fail', (req, res, next) => {
    res.send('user logged in failed');
});

app.get('/logout', (req, res, next) => {
    req.logout();
    res.send('user is logged out');
});

