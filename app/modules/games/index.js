var GamesCollection = require("./model");
var GamesRouter = require("./router");
var GamesController = require("./controller");

module.exports = function (settings) {
	var module = {};

	console.log(settings);

	var initialData = settings.initialData || [];

	module.app = settings.app || {};

	module.collection = new GamesCollection(initialData);

	module.router = new GamesRouter({
		module: module
	});

	module.controller = new GamesController({
		module: module
	});

	return module;
}