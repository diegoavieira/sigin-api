import {models as Models} from '../../config/database';

let controller = {};

controller.usersList = (req, res) => {
	Models.Users.findAll().then(data => {
		res.json(data);
	}).catch(err => {
		res.send(err.message);
	});
};

controller.userCreate = (req, res) => {
	Models.Users.create({
		name: req.body.name
	}).then(data => {
		res.json(data);
	}).catch(err => {
		res.send(err.message)
	});
}

module.exports = controller;




