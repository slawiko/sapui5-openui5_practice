sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/m/Dialog',
	'sap/m/Button',
	'sap/ui/model/json/JSONModel'
], function (Controller, Dialog, Button, JSONModel) {
	'use strict';
	var counter = 0;

	return Controller.extend('leverx.sap.shchaurouski.fourth.controller.App', {
		handleShowDialogPress: function (oEvent) {
			counter++;

			var dialog = new Dialog({
				title: 'Dialog opened ' + counter + ' times',
				type: 'Message',
				content: (function () {
					var dialogFragment = sap.ui.xmlfragment('leverx.sap.shchaurouski.fourth.view.DialogContent'),
						oData = {
							message: 'Test message'
						},
						oModel = new JSONModel(oData);

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