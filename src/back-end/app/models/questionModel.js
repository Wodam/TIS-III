module.exports = function (sequelize, DataTypes) {
	const Question = sequelize.define('Question', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		text: {
			type: DataTypes.STRING,
			allowNull: false
		},
		competencias: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		habilidades: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		alternativas: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});

	return Question;
};
