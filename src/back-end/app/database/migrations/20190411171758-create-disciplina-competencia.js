'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
		const DisciplinaCompetencia = queryInterface.createTable('Disciplina_Competencia', {
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
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Disciplina_Competencia')
  }
};
