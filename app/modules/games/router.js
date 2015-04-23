var Backbone = require("backbone");

module.exports = Backbone.Router.extend({
	initialize: function (options) {
		this.module = options.module;
	},
	routes: {
		"games" : "showGameList",
		"game/:id": "showGameDetails"
	},
	showGameList: function () {
		this.module.app.trigger("game:list:load");
	},
	showGameDetails: function (id) {
		var game = this.module.app.collection.get(id);
		game.select();
	}
});