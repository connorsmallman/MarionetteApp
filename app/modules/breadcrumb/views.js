var Marionette = require('backbone.marionette');

var BreadCrumbItemView = Marionette.ItemView.extend({
	tagName: "li",
	template: "#breadcrumbTemplate",
	events: {
		"click a":"fireTrigger"
	},
	fireTrigger: function (e) {
		e.preventDefault();
		this.model.select();
	}
});

var BreadCrumbListView = Marionette.CollectionView.extend({
	tagName: "ol",
	className: "breadcrumbs",
	childView: BreadCrumbItemView
});

module.exports = BreadCrumbListView;