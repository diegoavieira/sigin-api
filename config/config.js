	const env = process.env.NODE_ENV;
	
	if (env) {
		module.exports = require(`./env/${env}.js`);
	} else {
		module.exports =  require(`./env/development.js`);
	};
