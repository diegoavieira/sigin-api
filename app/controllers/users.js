import {models as Models} from '../../config/database';

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

exports.listAll = (req, res) => {
	Models.Users.findAll({
		attributes: {exclude: ['password']},
		paranoid: false,
		order: [['id', 'ASC']]
	}).then(result => {
		res.json(result);
	}).catch(error => {
		res.status(412).json({msg: error.message});
	});
};

exports.listById = (req, res) => {
	Models.Users.findById(req.params.id, {
		attributes: {exclude: ['password']},
		paranoid: false
	}).then(result => {
		res.json(result);
	}).catch(error => {
		res.status(412).json({msg: error.message});
	});
};

exports.updateById = (req, res, next) => {
	Models.Users.findOne({
		where: {id: req.params.id},
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
		where: {id: req.params.id}
	}).then(result => {
		res.json(result);
	}).catch(error => {
		res.status(412).json({msg: error.message});
	});
};

exports.renderSignin = (req, res) => {
	res.render('signin', {title: 'signin'});
};

exports.renderSignup = (req, res) => {
	res.render('signup', {title: 'signup'});
};

exports.signout = (req, res) => {
	req.logout();
	res.redirect('/');
};

exports.authenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.json({msg: 'Not authorized'});
	}
}




