'use strict';

const Sequelize = require('sequelize');

const model = require('./../models/index.js');

class Database {
  connect (configs = require('./../configs/database.json')[process.env.NODE_ENV || 'development']) {
	  return new Promise((resolve, reject) => {
      try {
				this.configs = configs;
        this.sequelize = new Sequelize(this.configs.database, this.configs.username, this.configs.password, this.configs);

        this.sequelize.authenticate().then(_ => {
					console.log('Database connected :)');
					model.importAll(this.sequelize).then(models => {this.models = models}).catch(console.log);
					resolve(this);
        }).catch(err => {
					console.error('Authentication error :(');
          reject(err);
        });
      } catch (e) {
				console.error('Error on connect to database :(');
        reject(e);
      }
	  })
	};

	async create (model, values, params = {}) {
		try {
			return await this.models[model].create(values, params)
		} catch (error) {
			console.log('[Database] Error on create \n', error);
			return error;
		}
	};

	async retrieve (model, id, params = {}) {
		try {
			return await this.models[model].findByPk(id, params);
		} catch (error) {
			console.log('[Database] Error on retrieve \n', error);
			return error;
		}
  };

	async update (model, id, values, params = {}) {
		try {
			let data = await this.models[model].findByPk(id, params);
			return data.update(values);
		} catch (error) {
			console.log('[Database] Error on update \n', error);
			return error;
		}
	};

	async delete (model, id, params = {}) {
		try {
			let data = await this.models[model].findByPk(id, params);
			return await data.destroy();
		} catch (error) {
			console.log('[Database] Error on delete \n', error);
			return error;
		}
  };

	async list (model, params = {}) {
		try {
			return await this.models[model].findAll(params);
		} catch (error) {
			console.log('[Database] Error on list \n', error);
			return error;
		}
  };

};

module.exports = new Database();
