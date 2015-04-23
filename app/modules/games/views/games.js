var Marionette = require("backbone.marionette");
var Game = require("./game");

module.exports = Marionette.CollectionView.extend({
	tagName: "ul",
	className: "games",
	childView: Game
});