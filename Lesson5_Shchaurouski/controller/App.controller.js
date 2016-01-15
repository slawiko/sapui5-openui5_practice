sap.ui.define([
	'sap/ui/core/mvc/Controller'
], function (Controller) {
	"use strict";
	return Controller.extend('leverx.sap.shchaurouski.fifth.controller.App', {
		onInit: function () {
			var oModel = new sap.ui.model.odata.ODataModel('/sap/opu/odata/', true);
			this.getView().setModel(oModel);
		}
	});
});