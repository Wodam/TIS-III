'use strict';

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  connect: _ => {
	  return new Promise((resolve, reject) => {
      try {
				this.configs = require('./../configs/database.json')[env];
        this.sequelize = new Sequelize(this.configs.database, this.configs.username, this.configs.password, this.configs);

        this.sequelize.authenticate().then(_ => {
					resolve(this);
        }).catch(err => {
          reject(err);
        });
      } catch (e) {
        reject(e);
      }
	  })
	}
};
