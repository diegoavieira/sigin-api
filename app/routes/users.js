import passport from 'passport';

module.exports = app => {
	const users = app.controllers.users;

	app.post('/signup', users.signup);

	app.post('/signin', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/signin',
		failureFlash: false
	}));

	app.route('/users')
		.all(users.authenticated)
		.get(users.listAll);

	app.route('/users/:id')
		.all(users.authenticated)
		.get(users.listById)
		.put(users.updateById)
		.delete(users.deleteById);

	app.get('/signin', users.renderSignin);
	app.get('/signup', users.renderSignup);
	app.get('/signout', users.signout);
};