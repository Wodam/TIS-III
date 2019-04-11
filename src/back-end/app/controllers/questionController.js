'use strict';

const database = require('./../database');

exports.create = async (values) => {
	let question = await database.create('Questao', values.questao);

	let options = values.alternativas.map(async alternativa => {
		alternativa.id_questao = question.dataValues.id_questao;
		console.log(alternativa)
		return await database.create('Alternativa', alternativa)
	});

	console.log(await options)

	// Promise.all(options).then(_ => {
	// 	console.log(options)
	// 	return {
	// 		question: question,
	// 		options: options
	// 	};
	// })
	// let options = await values.alternativas.map(async alternativa => await database.create('Alternativa', {id_questao: question.dataValues.id_questao}))
};

exports.retrieve = async (values) => {
	return await database.retrieve('Questao', values);
};

exports.update = async (id, values) => {
	return await database.update('Questao', id, values);
};

exports.delete = async (values) => {
	return await database.delete('Questao', values);
};

exports.list = async (values) => {
	let questions = await database.list('Questao', values);
	for (var i = 0; i < questions.length; i++) {
		questions[i].dataValues.alternativas = await database.list('Alternativa', {where: {id_questao: questions[i].dataValues.id_questao}});
	}
	return questions;
};
