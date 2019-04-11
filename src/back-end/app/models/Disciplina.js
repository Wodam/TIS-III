const questao = require('./Questao')
const disciplina_competencia = require('./DisciplinaCompetencia')

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

	Disciplina.hasMany(questao, {as: 'questoes', foreignKey: 'id_questao'});
	Disciplina.hasMany(disciplina_competencia, {as: 'disciplina_competencia', foreignKey: 'id_disciplina'});

	return Disciplina;
};
