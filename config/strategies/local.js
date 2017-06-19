import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {models as Models} from '../database';

module.exports = () => {
	const params = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }
	passport.use(new LocalStrategy(params, (req, email, password, done) => {
		Models.Users.findOne({
			where: {email: email}
		}).then(user => {
			if (user) {
				if (Models.Users.isPassword(user.password, password)) {
					return done(null, user);
				} else {
					return done(null, false, {
						message: 'Invalid password'
					});
				};
			} else {
				return done(null, false, {
					message: 'Unknown user'
				});
			}
		}).catch(error => {
			return done(error);
		});
	}));
};