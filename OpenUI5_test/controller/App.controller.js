sap.ui.define([
		"leverx/test/controller/BaseController",
		"sap/ui/model/json/JSONModel"
	], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("leverx.test.controller.App", {

        /**
         * Called when the app controller is instantiated.
         * @public
         */
		onInit: function() {
			var oViewModel,
				fnSetAppNotBusy,
				iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

			oViewModel = new JSONModel({
				busy: true,
				delay: 0
			});
			
			this.setModel(oViewModel, "appView");

			fnSetAppNotBusy = function() {
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			};

			this.getOwnerComponent().getModel().metadataLoaded().
			then(fnSetAppNotBusy, fnSetAppNotBusy);

			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}
	});

});