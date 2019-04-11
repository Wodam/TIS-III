'use strict';

const fs = require('fs');
const path = require('path');

class Models {
	// --- Import all models ---
	importAll (sequelize) {
		return new Promise((resolve, reject) => {
			try {
				this.models = {};

				fs
					.readdirSync(__dirname)
					.filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
					.forEach(file => {
						const model = sequelize['import'](path.join(__dirname, file));
						this.models[model.name] = model;
					});

				Object.keys(this.models).forEach(modelName => {
					if (this.models[modelName].associate) {
						this.models[modelName].associate(this.models);
					}
				});

				console.log('Models loaded :)');
				resolve(this.models);
			} catch (e) {
				console.error('Error on models load :(');
				reject(e)
			}
		});
	}
}

module.exports = new Models();
