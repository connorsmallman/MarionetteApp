module.exports = function (app) {
	var module = {};
	var collection = {};

	var BreadCrumbCollection = require("./model");
	var BreadCrumbListView = require("./views"); 

	module.setCrumbs = function (data) {
		collection.reset(data);
	};

	module.load = function (region, initialData) {
		initialData || (initialData = {});
		collection = new BreadCrumbCollection(initialData);

		collection.on("breadcrumb:selected", function (crumb) {
			app.trigger(crumb.get("trigger"));
		});

		var view = new BreadCrumbListView({collection: collection});

		region.show(view);
	};

	return module;
}