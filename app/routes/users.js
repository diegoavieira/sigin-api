import passport from 'passport';

module.exports = app => {
	const users = app.controllers.users;

	app.post('/signup', users.signup);

	app.route('/signin')
		.post(users.signin)
		.get(users.signinError);

	app.route('/users')
		.all(users.authenticated)
		.get(users.listAll);

	app.route('/user')
		.all(users.authenticated)
		.get(users.listById)
		.put(users.updateById)
		.delete(users.deleteById);

	app.get('/signout', users.signout);
};