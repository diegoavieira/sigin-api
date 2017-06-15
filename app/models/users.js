module.exports = (sequelize, DataType) => {
	const Users = sequelize.define('Users', {
		id: {
			type: DataType.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	
	}, {
			schema: 'public',
			updatedAt: false
		}
	);
	return Users;
}