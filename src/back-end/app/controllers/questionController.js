'use strict';

const database = require('./../database');

exports.create = async (values) => {
	return await database.create('Question', values);
};

exports.retrieve = async (values) => {
	return await database.retrieve('Question', values);
};

exports.update = async (id, values) => {
	return await database.update('Question', id, values);
};

exports.delete = async (values) => {
	return await database.delete('Question', values);
};

exports.list = async (values) => {
	return await database.list('Question', values);
};
