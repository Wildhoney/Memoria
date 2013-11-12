(function($window) {

    "use strict";

    /**
     * @module Memoria
     * @submodule MultipleSelect
     * @constructor
     */
    $window.Memoria.Observer.MultipleSelect = {

        /**
         * @method onEvent
         * @param event {Object}
         * @param node {Object}
         * @return {Array}
         */
        onEvent: function onEvent(event, node) {

            var selectedIndexes = [];

            // Iterate over each OPTION in the SELECT node, determine if they're selected.
            for (var index = 0, maxOptions = node.options.length; index < maxOptions; index++) {

                var option = node.options[index];

                if (!option.selected) {
                    // Don't continue if it's not selected.
                    continue;
                }

                selectedIndexes.push(index);

            }

            return selectedIndexes;

        },

        /**
         * @method onRetrieval
         * @param node {Object}
         * @param value {Array}
         * @return {void}
         */
        onRetrieval: function onRetrieval(node, value) {

            // Iterate over each OPTION in the SELECT node, highlighting them if they should be.
            for (var index = 0, maxOptions = node.options.length; index < maxOptions; index++) {

                var option = node.options[index];

                if (value.indexOf(index) === -1) {
                    // Don't continue if it's not in the `localStorage.memoria` object.
                    continue;
                }

                option.setAttribute('selected');

            }

        }

    };

})(window);