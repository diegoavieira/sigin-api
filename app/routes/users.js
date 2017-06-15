module.exports = app => {

	const controller = app.controllers.users;
	
	app.route('/users')
		.get(controller.usersList)
		.post(controller.userCreate);
};