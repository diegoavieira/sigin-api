import {models as Models} from '../../config/database';

exports.logged = (req, res) => {
	if (req.user) {
		res.json({
			logged: {
				name: req.user.name,
				email: req.user.email,
				date: new Date()
			}
		});
	} else {
		res.json({
			msg: 'Do you not are logged'
		});
	};
};