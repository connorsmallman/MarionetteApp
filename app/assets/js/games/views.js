var Marionette = require("backbone.marionette");

var Module = {};

Module.GameItemView = Marionette.ItemView.extend({
	tagName: "li",
	template: "#gameTemplate",
	events: {
		"click a": "showGameDetails"
	},
	showGameDetails: function (e) {
		e.preventDefault();
		this.model.select();
	}
});

Module.GameListView = Marionette.CollectionView.extend({
	tagName: "ul",
	className: "games",
	childView: Module.GameItemView
});

Module.GameDetailsLayoutView = Marionette.LayoutView.extend({
	template: "#gameDetailsLayoutTemplate",
	regions: {
		"summary" : "#gameDetailsSummaryContainer",
		"stats" : "#gameDetailsStatsContainer"
	}
});

Module.GameDetailsSummaryView = Marionette.ItemView.extend({
	template: "#gameDetailsSummaryTemplate"
});

Module.GameDetailsStatsView = Marionette.ItemView.extend({
	template: "#gameDetailsStatsTemplate"
});

module.exports = Module;