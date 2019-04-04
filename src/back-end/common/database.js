'use strict';

const Sequelize = require('sequelize');
const connection = require('./connection');

module.exports = {
  connect: _ => {
    return new Promise(
			(resolve, reject) => {
        try {
					this.configs = require('./../resources/db-config.json')[process.env.NODE_ENV || 'development'];
					// TODO: don't send the entire object for optional configs
          this.sequelize = new Sequelize(this.configs.database, this.configs.username, this.configs.password, this.configs);

          this.sequelize.authenticate().then(_ => {
						console.log('Database connected :)')
						resolve(this);
          }).catch(err => {
						console.error('Error on connect to database :(');
            reject(err);
          });
        } catch (e) {
          reject(e);
        }
    })
  },
};
