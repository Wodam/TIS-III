'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
		const Alternativa = queryInterface.createTable('Alternativa', {
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
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Alternativa')
  }
};
