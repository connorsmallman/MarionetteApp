var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var BreadCrumbModule = require("./breadcrumb/index");

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

//Models
var GameModel = Backbone.Model.extend({
	url: "/api/games",
	defaults: {
		displayName: ""
	},
	select: function () {
		GMS.trigger("game:details:load", this);
	}
});

//Collections
var GamesCollection = Backbone.Collection.extend({
	url: "/api/games",
	model: GameModel
});

//App Router
var AppRouter = Backbone.Router.extend({
	routes: {
		"" : "showIndex",
		"games" : "showGameList",
		"game/:id": "showGameDetails"
	},
	showIndex: function () {
		GMS.trigger("index:load");
	},
	showGameList: function () {
		GMS.trigger("game:list:load");
	},
	showGameDetails: function (id) {
		var game = GMS.Games.get(id);
		game.select();
	}
});

//Controllers
var AppController = Marionette.Object.extend({
	showIndex: function () {
		GMS.mainRegion.show(new IndexView());
	},
	showGameList: function () {
		var gameListView = new GameListView({
			collection: GMS.Games
		});

		GMS.mainRegion.show(gameListView);
		GMS.AppRouter.navigate("games");
	},
	showGameDetails: function (game) {
		var layout = new GameDetailsLayoutView()
		GMS.mainRegion.show(layout);
		
		layout.summary.show(new GameDetailsSummaryView());
		layout.stats.show(new GameDetailsStatsView());
		
		GMS.AppRouter.navigate("game/" + game.id);
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

	GMS.on("game:details:load", function (game) {
		GMS.AppController.showGameDetails(game);
		breadcrumbs.setCrumbs([
			crumbs.home,
			crumbs.games,
			{
				title: "Games " + game.get("id") + " Details"
			}
		]);
	});

	GMS.on("game:list:load", function () {
		GMS.AppController.showGameList();
		breadcrumbs.setCrumbs([
			crumbs.home,
			crumbs.games
		]);
	});

	GMS.on("index:load", function () {
		GMS.AppController.showIndex();
		breadcrumbs.setCrumbs(crumbs.home);
	});
});

GMS.addInitializer(function () {
	GMS.AppController = new AppController();
	GMS.AppRouter = new AppRouter();
	GMS.Games = new GamesCollection(games);

	//start
	Backbone.history.start();
});

//Views
var GameItemView = Marionette.ItemView.extend({
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

var GameListView = Marionette.CollectionView.extend({
	tagName: "ul",
	className: "games",
	childView: GameItemView
});

var GameDetailsLayoutView = Marionette.LayoutView.extend({
	template: "#gameDetailsLayoutTemplate",
	regions: {
		"summary" : "#gameDetailsSummaryContainer",
		"stats" : "#gameDetailsStatsContainer"
	}
});

var GameDetailsSummaryView = Marionette.ItemView.extend({
	template: "#gameDetailsSummaryTemplate"
});

var GameDetailsStatsView = Marionette.ItemView.extend({
	template: "#gameDetailsStatsTemplate"
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