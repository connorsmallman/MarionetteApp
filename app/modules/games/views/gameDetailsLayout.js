var Marionette = require("backbone.marionette");

module.exports = Marionette.LayoutView.extend({
	template: "#gameDetailsLayoutTemplate",
	regions: {
		"summary" : "#gameDetailsSummaryContainer",
		"stats" : "#gameDetailsStatsContainer"
	}
});