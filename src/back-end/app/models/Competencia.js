const habilidade = require('./Habilidade')
const disciplina_competencia = require('./DisciplinaCompetencia')

module.exports = function (sequelize, DataTypes) {
	const Competencia = sequelize.define('Competencia', {
		id_competencia: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		desc_competencia: {
			type: DataTypes.TEXT
		}
	});

	Competencia.hasMany(habilidade, {as: 'habilidades', foreignKey: 'id_competencia'});
	Competencia.hasMany(disciplina_competencia, {as: 'disciplina_competencia', foreignKey: 'id_competencia'});

	return Competencia;
};
