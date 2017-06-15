import app from'./config/express';
import {sequelize} from './config/database';

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