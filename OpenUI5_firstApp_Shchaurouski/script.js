sap.ui.getCore().attachInit(function () {
	new sap.ui.xmlview({
		viewName: "sap.ui.first.view.App"
	}).placeAt("content");
});
