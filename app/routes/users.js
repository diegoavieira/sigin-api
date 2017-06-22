import passport from 'passport';

module.exports = app => {
	const users = app.controllers.users;

	app.post('/signup', users.signup);

	app.route('/login')
		.post(users.login)
		.get(users.loginError);

	app.get('/logout', users.logout);

	app.get('/auth/facebook', users.loginFacebook);

	app.get('/auth/facebook/callback', users.loginFacebookCallback);

	app.route('/users')
		.all(users.authenticated)
		.get(users.listAll);

	app.route('/user')
		.all(users.authenticated)
		.get(users.listById)
		.put(users.updateById)
		.delete(users.deleteById);
};