'use strict';

module.exports = function (sequelize, DataTypes) {
	const DisciplinaCompetencia = sequelize.define('DisciplinaCompetencia', {
		id_competencia: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		id_disciplina: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});

	DisciplinaCompetencia.associate = models => {
		DisciplinaCompetencia.belongsTo(models.Competencia, {
			as: 'competencia',
			foreignKey: 'id_competencia'
		});
		DisciplinaCompetencia.belongsTo(models.Disciplina, {
			as: 'disciplina',
			foreignKey: 'id_disciplina'
		});
	}

	return DisciplinaCompetencia;
};
