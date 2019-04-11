'use strict';

module.exports = function (sequelize, DataTypes) {
	const Alternativa = sequelize.define('Alternativa', {
		id_alternativa: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		veracidade: {
			type: DataTypes.CHAR
		},
		desc_alternativa: {
			type: DataTypes.TEXT
		},
		id_questao: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});

	Alternativa.associate = models => {
		Alternativa.belongsTo(models.Questao, {
			as: 'questao',
			foreignKey: 'id_questao'
		});
	}

	return Alternativa;
};
