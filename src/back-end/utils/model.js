'use strict';

const fs = require('fs');
const path = require('path');

const modelsDir = __dirname + '/../app/models';

module.exports = {
	// --- Import all models ---
	importAll: sequelize => {
		return new Promise((resolve, reject) => {
			try {
				this.models = {};

				fs
					.readdirSync(modelsDir)
					.filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js'))
					.forEach(file => {
						const model = sequelize['import'](path.join(modelsDir, file));
						this.models[model.name] = model;
					});

				Object.keys(this.models).forEach(modelName => {
					if (this.models[modelName].associate) {
						this.models[modelName].associate(this.models);
					}
				});

				resolve(this.models);
			} catch (e) {
				reject(e)
			}
		});
	}
}
