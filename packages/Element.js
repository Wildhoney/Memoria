(function($window) {

    "use strict";

    /**
     * @module Memoria
     * @submodule Element
     * @constructor
     */
    $window.Memoria.Element = function MemoriaElement() {};

    /**
     * @property prototype
     * @type {Object}
     */
    $window.Memoria.Element.prototype = {

        /**
         * @method _attachEvent
         * @param node {Object}
         * @param eventName {String}
         * Responsible for attaching the Memoria event to the given event name.
         * @private
         */
        _attachEvent: function _attachEvent(node, eventName) {

            if (typeof node[eventName] === 'undefined') {

                // Throw an exception if we're unable to find the specified event handler.
                throw 'Memoria: Unable to find the `' + eventName + '` event handler on `'
                        + node.nodeName.toLowerCase() +'` node.';

            }

            node[eventName] = function MemoriaEvent() {
//                console.log('Here');
            }

        }

    };


})(window);