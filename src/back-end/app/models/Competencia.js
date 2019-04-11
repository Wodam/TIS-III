'use strict';

module.exports = function (sequelize, DataTypes) {
	const Competencia = sequelize.define('Competencia', {
		id_competencia: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		desc_competencia: {
			type: DataTypes.TEXT
		}
	});

	Competencia.associate = models => {
		Competencia.hasMany(models.Habilidade, {
			as: 'habilidades',
			foreignKey: 'id_competencia'
		});
		Competencia.hasMany(models.DisciplinaCompetencia, {
			as: 'disciplina_competencia',
			foreignKey: 'id_competencia'
		});
	}

	return Competencia;
};
