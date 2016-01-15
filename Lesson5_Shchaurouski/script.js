sap.ui.getCore().attachInit(function () {
	sap.ui.require([
		"leverx/sap/shchaurouski/fifth/localService/mockserver"
	], function (mockserver) {
		mockserver.init();

		new sap.ui.xmlview({
			viewName: 'leverx.sap.shchaurouski.fifth.view.App'
		}).placeAt('content');
	});
});