import passport from 'passport';
import {models as Models} from './database';

module.exports = () => {
	passport.serializeUser((user, done) => {
		return done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		Models.Users.findById(id).then(user => {
			return done(null, user);
		}).catch(error => {
			return done(error, null);
		});
	});

	require('./strategies/local.js')();
	require('./strategies/facebook.js')();
};