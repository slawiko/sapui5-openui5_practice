sap.ui.define([
    "leverx/test/controller/BaseController"
], function(BaseController) {
    "use strict";

    return BaseController.extend("leverx.test.controller.NotFound", {

        /**
         * Navigates to the worklist when the link is pressed
         * @public
         */
        onLinkPressed: function() {
            this.getRouter().navTo("worklist");
        }

    });

});