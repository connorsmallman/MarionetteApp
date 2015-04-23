var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var BreadCrumbModule = require("./modules/breadcrumb/index");
var GamesModule = require("./modules/games/index");

var games = [
	{
		id: 1,
		displayName: "test1"
	},
	{
		id: 2,
		displayName: "test2"
	},
	{
		id: 3,
		displayName: "test2"
	}
];

//Application
var GMS = new Marionette.Application();

GMS.addRegions({
	mainRegion: "#GMSContainer",
	breadCrumbRegion: "#breadCrumbContainer"
});

//App Router
var HomeRouter = Backbone.Router.extend({
	routes: {
		"" : "showIndex",
	},
	showIndex: function () {
		GMS.trigger("index:load");
	}
});

//Controllers
var HomeController = Marionette.Object.extend({
	showIndex: function () {
		GMS.mainRegion.show(new IndexView());
	}
});

//Init
GMS.addInitializer(function () {
	var crumbs = {
		home: {
			title: "Home",
			trigger: "index:load"
		},
		games: {
			title: "Games list",
			trigger: "game:list:load"
		}
	}

	//load breadcrumb module
	var breadcrumbs = new BreadCrumbModule(GMS);
	breadcrumbs.load(GMS.breadCrumbRegion, {title: "Home"});

	var games = new GamesModule({
		app: GMS
	});

	GMS.on("game:details:load", function (game) {
		games.controller.showGameDetails(game);
		breadcrumbs.setCrumbs([
			crumbs.home,
			crumbs.games,
			{
				title: "Games " + game.get("id") + " Details"
			}
		]);
	});

	GMS.on("game:list:load", function () {
		games.controller.showGameList();
		breadcrumbs.setCrumbs([
			crumbs.home,
			crumbs.games
		]);
	});

	GMS.on("index:load", function () {
		GMS.HomeController.showIndex();
		breadcrumbs.setCrumbs(crumbs.home);
	});
});

GMS.addInitializer(function () {
	GMS.HomeController = new HomeController();
	GMS.HomeRouter = new HomeRouter();
	Backbone.history.start();
});

var IndexView = Marionette.ItemView.extend({
	template: "#indexTemplate",
	events: {
		"click #nav-game-list": "showGameList"
	},
	showGameList: function (e) {
		e.preventDefault();
		GMS.trigger("game:list:load");
	}
});

GMS.start();