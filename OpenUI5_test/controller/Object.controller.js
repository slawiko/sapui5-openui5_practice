sap.ui.define([
    "leverx/test/controller/BaseController",
    "sap/ui/model/json/JSONModel",
], function(BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("leverx.test.controller.Object", {

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the object controller is instantiated.
         * @param {sap.ui.base.Event} oEvent
         * @public
         */
        onInit: function() {
            this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
        },

        /**
         * Called when pattern matched event is fired
         * @private
         */
        _onObjectMatched: function(oEvent){
            var sProjectId = oEvent.getParameter("arguments").ProjectId;

            //Specify path to the object: Projects(ProjectId) or TeamMembers(ProjectId='ProjectId',TeamMemberID='TeamMemberID') the object
            this.getView().bindElement({
                path: "/Projects('" + sProjectId + "')",
                events: {
                    change: this._onBindingChange.bind(this)
                }
            });
        },

        /**
         * Called each time when binding for the view  pattern matched event is fired
         * @private
         */
        _onBindingChange: function(){
            var oView = this.getView(),
                oElementBinding = oView.getElementBinding();

            // No data for the binding
            if (!oElementBinding.getBoundContext()) {
                this.getRouter().getTargets().display("objectNotFound");
                return;
            }
        },

        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */

        /**
         * Navigates back in the browser history, if the entry was created by this app.
         * If not, it navigates to the Fiori Launchpad home page.
         * @public
         */
        onNavBack: function() {
            var oHistory = sap.ui.core.routing.History.getInstance(),
                sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                // The history contains a previous entry
                history.go(-1);
            }
        },

        /**
         * Event handler when a table item gets pressed
         * @param {sap.ui.base.Event} oEvent the table selectionChange event
         * @public
         */
        onPress: function(oEvent) {
            // The source is the list item that got pressed
            this._showObject(oEvent.getSource());
        }
    });
});