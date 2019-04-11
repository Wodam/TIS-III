'use strict';

module.exports = function (sequelize, DataTypes) {
	const Habilidade = sequelize.define('Habilidade', {
		id_habilidade: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		nome_habilidade: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		id_competencia: {
			type: DataTypes.INTEGER
		}
	});

	Habilidade.associate = models => {
		Habilidade.belongsTo(models.Competencia, {
			as: 'competencia',
			foreignKey: 'id_competencia'
		});
		Habilidade.hasMany(models.QuestaoHabilidade, {
			as: 'questao_habilidade',
			foreignKey: 'id_habilidade'
		});
	}

	return Habilidade;
};
