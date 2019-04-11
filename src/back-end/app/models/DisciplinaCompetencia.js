const competencia = require('./Competencia')
const disciplina = require('./Disciplina')

module.exports = function (sequelize, DataTypes) {
	const DisciplinaCompetencia = sequelize.define('DisciplinaCompetencia', {
		id_competencia: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		id_disciplina: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});

	DisciplinaCompetencia.belongsTo(competencia, {as: 'competencia', foreignKey: 'id_competencia'});
	DisciplinaCompetencia.belongsTo(disciplina, {as: 'disciplina', foreignKey: 'id_disciplina'});

	return DisciplinaCompetencia;
};
