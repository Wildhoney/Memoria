(function($window) {

    "use strict";

    /**
     * @module Memoria
     * @constructor
     */
    $window.Memoria = function Memoria() {

        // Determine of `localStorage` is supported by the current browser.
        if (typeof $window.localStorage === 'undefined') {
            return;
        }

        // Process to discover all valid forms, and the inputs contained within them.
        this._initialiseForms();

    };

    /**
     * @property prototype
     * @type {Object}
     */
    $window.Memoria.prototype = {

        /**
         * @property _supportedNodes
         * @type {Array}
         */
        _supportedNodes: ['input', 'select', 'textarea'],

        /**
         * @method _initialiseForms
         * Responsible for locating all the forms on the page that have a "name" attribute, which is the
         * only prerequisite for forms to inherit the Memoria functionality.
         * @private
         */
        _initialiseForms: function _initialiseForms() {

            var forms = $window.document.querySelectorAll('form[name]');

            // Iterate over each of the forms to obtain their input fields.
            for (var formIndex = 0, maxForms = forms.length; formIndex < maxForms; formIndex++) {

                if (!forms.hasOwnProperty(formIndex)) {
                    continue;
                }

                var form    = forms[formIndex],
                    nodes   = this._fetchInputs(form);

                // Iterate over each node to instantiate an object that belongs to that particular node.
                for (var nodeIndex = 0, maxNodes = nodes.length; nodeIndex < maxNodes; nodeIndex++) {

                    var node            = nodes[nodeIndex],
                        objectName      = node.nodeName.charAt(0).toUpperCase() + node.nodeName.slice(1).toLowerCase(),
                        delegatorObject = $window.Memoria[objectName],
                        saveKey         = {
                            formName    : form.getAttribute('name'),
                            nodeName    : node.getAttribute('name')
                        };

                    if (typeof delegatorObject === 'undefined') {

                        // Throw an exception if we're unable to find the delegator object.
                        throw 'MEMORIA: Unable to instantiate `Memoria.' + objectName + '` delegator object.';

                    }

                    // Otherwise we can create the related object, passing in the node and `localStorage` save key.
                    new delegatorObject(node, saveKey);

                }

            }

        },

        /**
         * @method _fetchInputs
         * @param form {Object}
         * Responsible for finding supported inputs from any given form object.
         * @return {Array}
         * @private
         */
        _fetchInputs: function _fetchInputs(form) {

            var nodesDiscovered = [];

            // Iterate over each supported node type index.
            for (var typeIndex = 0, maxTypes = this._supportedNodes.length; typeIndex < maxTypes; typeIndex++) {

                if (!this._supportedNodes.hasOwnProperty(typeIndex)) {
                    continue;
                }

                // Extract the valid nodes from the current form object.
                var nodes = form.querySelectorAll(this._supportedNodes[typeIndex]);

                // Iterate over each of the discovered nodes, pushing it into `nodesDiscovered`.
                for (var nodeIndex = 0, maxNodes = nodes.length; nodeIndex < maxNodes; nodeIndex++) {
                    nodesDiscovered.push(nodes[nodeIndex]);
                }

            }

            return nodesDiscovered;

        }

    };

    document.addEventListener('DOMContentLoaded', function() {

        // Listen to the banshees wail!
        $window.memoria = new $window.Memoria();

    }, false);

})(window);