import passport from 'passport';

module.exports = app => {

	const index = app.controllers.index;
	
	app.route('/')
		.get(index.logged)
};