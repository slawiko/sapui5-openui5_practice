sap.ui.getCore().attachInit(function () {
	var oText = sap.m.Text({
		text: "Hello world"
	});

	var oApp = new sap.m.App("myApp", {
		initialPage: "myPage"
	});

	oApp.placeAt("content");
});
