'use strict';

const database = require('./../database');

exports.create = async (values) => {
	return await database.create('Questao', values);
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
	return await database.list('Questao', values);
};
