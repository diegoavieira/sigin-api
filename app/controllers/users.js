import {models as Models} from '../../config/database';
import passport from 'passport';

exports.authenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.json({msg: 'Not authorized'});
	};
};

exports.login = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
});

exports.loginError = (req, res) => {
	if (!req.user) {
		res.json({msg: req.flash('error')[0]});
	};
};

exports.loginFacebook = passport.authenticate('facebook');

exports.loginFacebookCallback = passport.authenticate('facebook', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
});

exports.signup = (req, res, next) => {
	const params = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		provider: 'local'
	};
	Models.Users.findOne({
		where: {email: params.email}
	}).then(user => {
		if (user) {
			res.json({msg: 'Email already registered.'})
		} else {
			Models.Users.create(params).then(result => {
				req.login(result, error => {
					if (error) return next(error);
					res.redirect('/');
				});
			}).catch(error => {
				res.status(412).json({msg: error.message});
			});
		}
	}).catch(error => {
		res.status(412).json({msg: error.message});
	});
};

exports.logout = (req, res) => {
	req.logout();
	res.redirect('/');
};

exports.listAll = (req, res) => {
	Models.Users.findAll({
		attributes: {exclude: ['password', 'provider', 'providerId']},
		order: [['id', 'ASC']]
	}).then(result => {
		res.json(result);
	}).catch(error => {
		res.status(412).json({msg: error.message});
	});
};

exports.listById = (req, res) => {
	Models.Users.findById(req.user.id, {
		attributes: {exclude: ['password', 'provider', 'providerId']},
	}).then(result => {
		res.json(result);
	}).catch(error => {
		res.status(412).json({msg: error.message});
	});
};

exports.updateById = (req, res, next) => {
	Models.Users.findOne({
		where: {id: req.user.id}
	}).then(id => {
		if (id) {
			return id.updateAttributes(req.body);
		} else {
			res.status(404).json({msg: 'Unknown user'});	
		};
	}).then(result => {
		res.json(result);
	}).catch(error => {
		res.status(412).json({msg: error.message});
	});
};

exports.deleteById = (req, res) => {
	Models.Users.destroy({
		where: {id: req.user.id}
	}).then(result => {
		res.json(result);
	}).catch(error => {
		res.status(412).json({msg: error.message});
	});
};





