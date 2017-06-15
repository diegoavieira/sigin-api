import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

module.exports = app => {
	const config = app.libs.config;
	let db = null;
	
	if (!db) {
		const sequelize = new Sequelize(
			config.database,
			config.username,
			config.password,
			config.params
		);
		
		db = {
			sequelize,
			Sequelize,
			models: {}
		};
		
		const dir = path.join(__dirname, '../models');
		fs.readdirSync(dir).forEach(file => {
			const modelDir = path.join(dir, file);
			const model = sequelize.import(modelDir);
			db.models[model.name] = model;
		});
		
		// Object.keys(db.models).forEach(key => {
		// 	db.models[key].associate(db.models);
		// });
	}
	return db;
}
	
