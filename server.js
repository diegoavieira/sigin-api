process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import app from './config/express';
import {sequelize} from './config/database';
import passport from './config/passport';

passport();

sequelize.authenticate().then(() => {
	sequelize.sync().done(() => {
		app.listen(app.get('port'), () => {
			console.log('Database connected successfuly.')
			console.log(`Server running at ${app.get('port')}.`);
		});
	});
}).catch(err => {
	console.log('Unable to connect to the database: ', err.message);
});