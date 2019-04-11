'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
		const QuestaoHabilidade = queryInterface.createTable('Questao_Habilidade', {
			id_questao: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			id_habilidade: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		});

		QuestaoHabilidade.associate = models => {
			QuestaoHabilidade.belongsTo(models.Questao, {
				as: 'questao',
				foreignKey: 'id_questao'
			});
			QuestaoHabilidade.belongsTo(models.Habilidade, {
				as: 'habilidade',
				foreignKey: 'id_habilidade'
			});
		}

		return QuestaoHabilidade;
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Questao_Habilidade')
  }
};
