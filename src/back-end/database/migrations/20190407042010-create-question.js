'use strict';

// Both methods return a promise to correctly handle asynchronicity.
module.exports = {
	// Add altering commands here:
  up: (queryInterface, DataTypes) => {
		return queryInterface.createTable('Question', {
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
				unique: true
			},
			habilidades: {
				type: DataTypes.STRING,
				unique: true
			},
			alternativas: {
				type: DataTypes.STRING,
				allowNull: false
			}
		})
  },

	// Add reverting commands here:
  down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Question')
  }
};
