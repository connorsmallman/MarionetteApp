var Backbone = require("backbone");

var GameModel = Backbone.Model.extend({
	url: "/api/games",
	defaults: {
		displayName: ""
	},
	select: function (app) {
		app.trigger("game:details:load", this);
	}
});

//Collections
var GamesCollection = Backbone.Collection.extend({
	url: "/api/games",
	model: GameModel
});

module.exports = GamesCollection;