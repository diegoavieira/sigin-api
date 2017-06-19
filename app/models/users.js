import bcrypt from 'bcrypt';

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
		},
		password: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		email: {
			type: DataType.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: true,
				isEmail: true
			}
		}
	}, {
			schema: 'public',
			hooks: {
				beforeCreate: user => {
					const salt = bcrypt.genSaltSync();
					user.password = bcrypt.hashSync(user.password, salt);
				},
				beforeUpdate: user => {
					const salt = bcrypt.genSaltSync();
					user.password = bcrypt.hashSync(user.password, salt);
				}
			}
		}
	);
	Users.isPassword = (encodedPassword, password) => {
		return bcrypt.compareSync(password, encodedPassword);
	}
	return Users;
};