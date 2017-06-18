exports.renderIndex = (req, res) => {

	res.render('index', {name: req.user ? req.user.name : ''});

};