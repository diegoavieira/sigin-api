import {models as Models} from '../../config/database';
import passport from 'passport';

exports.authenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.json({msg: 'Not authorized'});
	}
};

exports.signin = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/signin',
	failureFlash: true
});

exports.signinError = (req, res) => {
	if (!req.user) {
		res.json({msg: req.flash('error')[0]});
	};
};

exports.signup = (req, res, next) => {
	Models.Users.create(
		req.body
	).then(result => {
		req.login(result, error => {
			if (error) return next(error);
			res.json(result)
		});
	}).catch(error => {
		res.status(412).json({msg: error.message});
	});
};

exports.signout = (req, res) => {
	req.logout();
	res.redirect('/');
};

exports.listAll = (req, res) => {
	Models.Users.findAll({
		attributes: {exclude: ['password']},
		order: [['id', 'ASC']]
	}).then(result => {
		res.json(result);
	}).catch(error => {
		res.status(412).json({msg: error.message});
	});
};

exports.listById = (req, res) => {
	Models.Users.findById(req.user.id, {
		attributes: {exclude: ['password']}
	}).then(result => {
		res.json(result);
	}).catch(error => {
		res.status(412).json({msg: error.message});
	});
};

exports.updateById = (req, res, next) => {
	Models.Users.findOne({
		where: {id: req.user.id},
		paranoid: false,
	}).then(id => {
		if (id) {
			return id.updateAttributes(req.body);
		} else {
			res.status(404).json({msg: 'Unknown user'});	
		}
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





