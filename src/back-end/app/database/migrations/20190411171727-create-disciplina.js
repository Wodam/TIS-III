'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
		const Disciplina = queryInterface.createTable('Disciplina', {
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
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Disciplina')
  }
};
