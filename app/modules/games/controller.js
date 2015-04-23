var Marionette = require("backbone.marionette");

var GamesDetailLayoutView = require("./views/gameDetailsLayout");
var GamesView = require("./views/games");

module.exports = Marionette.Object.extend({
	initialize: function (options) {
		this.module = options.module;
	},
	showGameList: function () {
		var gamesView = new GamesView({
			collection: module.collection
		});

		console.log(this.module.app);

		this.module.app.mainRegion.show(gamesView);
		this.module.router.navigate("games");
	},
	showGameDetails: function (game) {
		var layout = new GameDetailsLayoutView();

		this.module.router.show(layout);
		
		layout.summary.show(new GameDetailsSummaryView());
		layout.stats.show(new GameDetailsStatsView());
		
		this.module.router.navigate("game/" + game.id);
	}
});