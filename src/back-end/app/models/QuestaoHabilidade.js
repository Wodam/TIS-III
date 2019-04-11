const questao = require('./Questao')
const habilidade = require('./Habilidade')

module.exports = function (sequelize, DataTypes) {
	const QuestaoHabilidade = sequelize.define('QuestaoHabilidade', {
		id_questao: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		id_habilidade: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});

	QuestaoHabilidade.belongsTo(questao, {as: 'questao', foreignKey: 'id_questao'});
	QuestaoHabilidade.belongsTo(habilidade, {as: 'habilidade', foreignKey: 'id_habilidade'});

	return QuestaoHabilidade;
};
