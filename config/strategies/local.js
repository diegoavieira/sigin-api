import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {models as Models} from '../database';

module.exports = () => {
	const params = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }
	passport.use(new LocalStrategy(params, (req, email, password, cb) => {
		Models.Users.findOne({
			where: {email: email}
		}).then(user => {
			if (user) {
				if (Models.Users.isPassword(user.password, password)) {
					return cb(null, user);
				} else {
					return cb(null, false, {
						message: 'Invalid password'
					});
				};
			} else {
				return cb(null, false, {
					message: 'Unknown user'
				});
			}
		}).catch(error => {
			return cb(error);
		});
	}));
};