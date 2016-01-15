sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/m/Dialog',
	'sap/m/Button',
	'sap/ui/model/json/JSONModel'
], function (Controller, Dialog, Button, JSONModel) {
	"use strict";
	return Controller.extend('leverx.sap.shchaurouski.fifth.controller.App', {
		onInit: function () {
			var oModel = new sap.ui.model.odata.ODataModel('/sap/opu/odata/', true);
			this.getView().setModel(oModel);
		},
		onReviewPress: function (oEvent) {
			var productId = oEvent.getSource().getBindingContext().getProperty('Id'),
				dialog = new Dialog({
					title: productId,
					content: (function () {
						var dialogFragment = sap.ui.xmlfragment('leverx.sap.shchaurouski.fifth.view.DialogContent'),
							i,
							oModel = new sap.ui.model.odata.ODataModel('/sap/opu/odata/', true);

						// ************


						// ************
						dialogFragment.setModel(oModel);
						return dialogFragment;
					})(),
					beginButton: new Button({
						text: 'Close',
						press: function () {
							dialog.close();
						}
					}),
					afterClose: function () {
						dialog.destroy();
					}
				});

			dialog.open();
		}
	});
});