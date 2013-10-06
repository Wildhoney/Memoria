(function($window, $localStorage) {

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
         * @property node
         * @type {Object}
         */
        node: null,

        /**
         * @property key
         * @type {Object}
         */
        key: null,

        /**
         * @method initialise
         * Responsible for throwing an exception notifying the developer that this class should be overloaded
         * by the super object, because the `initialise` method is where the developer specifies on which event
         * the input should respond to.
         * @return {void}
         */
        initialise: function initialise() {
            throw 'Memoria: You should overload the `initialise` method to pass in the event to listen on.';
        },

        /**
         * @method _attachEvent
         * @param eventName {String}
         * Responsible for attaching the Memoria event to the given event name.
         * @private
         */
        _attachEvent: function _attachEvent(eventName) {

            if (typeof this.node[eventName] === 'undefined') {

                // Throw an exception if we're unable to find the specified event.
                throw 'Memoria: Unable to find the `' + eventName + '` event on `'
                        + this.node.nodeName.toLowerCase() +'` node.';

            }

            // Attach the event to the `_save` method.
            this.node[eventName] = this._save.bind(this);

        },

        /**
         * @method _transferValue
         * Responsible for detecting if the `localStorage` object has the current set, and if it does
         * to populate the node with its value.
         * @return {void}
         * @private
         */
        _transferValue: function _transferValue() {

            var storage = this._getStorage(),
                key     = this.key,
                value   = storage[key.formName][key.nodeName];

            if (!value) {

                // Value doesn't seem to be set in `localStorage`.
                return;

            }

            // Otherwise there is a value and so we'll update the node's value to reflect it!
            this.node.value = value;

        },

        /**
         * @method _save
         * Responsible for saving the updated value into the `localStorage`.
         * @return {void}
         * @private
         */
        _save: function _save() {

            var storage = this._getStorage(),
                key     = this.key;

            // Create the namespace for the node and its related value.
            storage[key.formName][key.nodeName] = this.node.value;

            // Save the new form data into the "memoria" `localStorage` namespace.
            $localStorage.setItem('memoria', JSON.stringify(storage));

        },

        /**
         * @method getStorage
         * Responsible for returning the parsed JSON data from the `localStorage` data.
         * @return {Object}
         * @private
         */
        _getStorage: function _getStorage() {

            var storage = JSON.parse($localStorage.getItem('memoria'));

            if (typeof storage[this.key.formName] === 'undefined') {

                // Create the namespace for the form if it doesn't already exist.
                storage[this.key.formName] = {};

            }

            return storage;

        },

        /**
         * @method _getEventName
         * @param defaultEventName {String}
         * Responsible for first checking if the current node has a "data-memoria-event" set, and if it doesn't
         * then to return what was passed into the method
         * @return {String}
         * @private
         */
        _getEventName: function _getEventName(defaultEventName) {
            return this.node.getAttribute('data-memoria-event') || defaultEventName;
        }

    };


})(window, window.localStorage);