const competencia = require('./Competencia')
const questao_habilidade = require('./QuestaoHabilidade.js')

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

	Habilidade.belongsTo(competencia, {as: 'competencia', foreignKey: 'id_competencia'});
	Habilidade.hasMany(questao_habilidade, {as: 'questao_habilidade', foreignKey: 'id_habilidade'});

	return Habilidade;
};
