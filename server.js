import app from './app/libs/express';

app.libs.database.sequelize.authenticate().then(() => {
		app.libs.database.sequelize.sync().done(() => {
			app.listen(app.get('port'), () => {
				console.log('Database connected successfuly.')
				console.log(`Server running at ${app.get('port')}.`);
			});
		});
	})
	.catch(err => {
		console.log('Unable to connect to the database: ', err.message);
	});