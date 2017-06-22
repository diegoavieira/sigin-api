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
	sessionSecret: '#g%8)i87ER4',
	facebook: {
		clientID: '109925769560510',
		clientSecret: '03bd17d34d518aa547e24460da9cdf54',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	}
};