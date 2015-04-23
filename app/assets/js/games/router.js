var Backbone = require("backbone");

var GamesRouter = Backbone.Router.extend({
	routes: {
		"games" : "showGameList",
		"game/:id": "showGameDetails"
	},
	showGameList: function () {
		GMS.trigger("game:list:load");
	},
	showGameDetails: function (id) {
		var game = GMS.Games.get(id);
		game.select();
	}
});

module.exports = GamesRouter;