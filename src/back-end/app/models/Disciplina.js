'use strict';

module.exports = function (sequelize, DataTypes) {
	const Disciplina = sequelize.define('Disciplina', {
		id_disciplina: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		nome_disciplina: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	Disciplina.associate = models => {
		Disciplina.hasMany(models.Questao, {
			as: 'questoes',
			foreignKey: 'id_questao'
		});
		Disciplina.hasMany(models.DisciplinaCompetencia, {
			as: 'disciplina_competencia',
			foreignKey: 'id_disciplina'
		});
	}

	return Disciplina;
};
