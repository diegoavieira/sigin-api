module.exports = {
	db: {
		database: 'signin-api',
		username: 'postgres',
		password: '123456',
		params: {
			dialect: 'postgres',
			define: {
				underscored: true
			}
		}
	},
	sessionSecret: '#g%8)i87ER4'
};