module.exports = app => {
	let controller = {};
	const Users = app.libs.database.models.Users;
	
	controller.usersList = (req, res) => {
		Users.findAll().then(data => {
			res.json(data);
		}).catch(err => {
			res.send(err.message);
		})
	};

	controller.userCreate = (req, res) => {
		Users.create({
			name: req.body.name
		}).then(data => {
			res.json(data);
		}).catch(err => {
			res.send(err.message)
		});
	}
	return controller;
}



