var Marionette = require("backbone.marionette");

module.exports = Marionette.ItemView.extend({
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