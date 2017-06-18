import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {models as Models} from '../database';

module.exports = () => {
	passport.use(new LocalStrategy((username, password, done) => {
		Models.Users.findOne({
			where: {username: username}
		}).then(user => {
			if (Models.Users.isPassword(user.password, password)) {
				return done(null, user);
			} else {
				return done(null, false, {
					message: 'Invalid password'
				});
			};
			return done(null, user);
		}).catch(error => {
			return done(error, null, {
				message: 'Unknown user'
			});
		});
	}));
};