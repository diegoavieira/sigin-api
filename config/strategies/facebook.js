import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {models as Models} from '../database';
import {facebook as config} from '../config';

module.exports = () => {
	const params = {
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    passReqToCallback: true
  };
	passport.use(new FacebookStrategy(params, (req, accessToken, refreshToken, profile, cb) => {
		const profileData = {
			email: profile.emails[0].value,
			name: profile.displayName,
			password: profile.id,
			providerId: profile.id,
			provider: 'facebook'
		};
		Models.Users.findOne({
			where: {
				providerId: profile.id
			}
		}).then(providerData => {
			if (!providerData) {
				Models.Users.create(profileData).then(result => {
					return cb(null, result);
				}).catch(error => {
					return cb(error);
				});
			} else {
				providerData.update({
					name: profile.displayName
				}).then(result => {
					return cb(null, result);
				}).catch(error => {
					return cb(error);
				});
			};
		}).catch(error => {
			return cb(error);
		});
	}));
};