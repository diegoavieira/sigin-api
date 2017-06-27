import passport from 'passport';
import {models as Models} from './database';

module.exports = () => {
	passport.serializeUser((user, cb) => {
		return cb(null, user.id);
	});

	passport.deserializeUser((id, cb) => {
		Models.Users.findById(id).then(user => {
			return cb(null, user);
		}).catch(error => {
			return cb(error, null);
		});
	});

	require('./strategies/local.js')();
	require('./strategies/facebook.js')();
};