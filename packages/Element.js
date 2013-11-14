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
         * @property form
         * @type {Object}
         */
        form: null,

        /**
         * @property key
         * @type {Object}
         */
        key: null,

        /**
         * @property observer
         * @type {Object}
         */
        observer: null,

        /**
         * @property _attribute
         * @type {String}
         * @default "value"
         */
        _attribute: 'value',

        /**
         * @method initialise
         * Responsible for throwing an exception notifying the developer that this class should be overloaded
         * by the super object, because the `initialise` method is where the developer specifies on which event
         * the input should respond to.
         * @return {void}
         */
        initialise: function initialise() {

            var attribute   = this.node.getAttribute('data-memoria-event'),
                eventNames  = [];

            if (!attribute) {
                // We were unable to find the event name automatically.
                throw 'MEMORIA: Unable to automatically find the event name.';
            }

            // Explode the event names by comma, because you can specify multiple events if necessary.
            eventNames = attribute.split(/,/);

            // Iterate over each of the event names for the current node.
            for (var eventIndex = 0, maxEvents = eventNames.length; eventIndex < maxEvents; eventIndex++) {
                var eventName = eventNames[eventIndex].trim();
                this._attachEvent(eventName);
            }

        },

        /**
         * @method attachObserver
         * @param observer {Object}
         * Responsible for adding an observer to the element for implementing hooks.
         * @return {void}
         */
        attachObserver: function attachObserver(observer) {
            this.observer = observer;
        },

        /**
         * @method _attachEvent
         * @param eventNames {Array}
         * Responsible for attaching the Memoria event to the given event name.
         * @private
         */
        _attachEvent: function _attachEvent(eventNames) {

            if (!Array.isArray(eventNames)) {
                // Transform the string into an array if it isn't already.
                eventNames = [eventNames];
            }

            // Iterate over each of the event types for the current node.
            for (var eventIndex = 0, maxEvents = eventNames.length; eventIndex < maxEvents; eventIndex++) {

                var eventName = eventNames[eventIndex];

                if (typeof this.node[eventName] === 'undefined') {

                    // Throw an exception if we're unable to find the specified event.
                    throw 'MEMORIA: Unable to find the `' + eventName + '` event on `' +
                        this.node.nodeName.toLowerCase() +'` node.';

                }

                // Attach the event to the `_save` method.
                this.node[eventName] = this._save.bind(this);

            }

        },

        /**
         * @method transferValue
         * Responsible for detecting if the `localStorage` object has the current set, and if it does
         * to populate the node with its value.
         * @return {void}
         */
        transferValue: function transferValue() {

            var storage = this._getStorage(),
                key     = this.key,
                value   = storage[key.formName][key.nodeName];

            if (!value) {
                // Value doesn't seem to be set in `localStorage`.
                return;
            }

            if (this.observer && typeof this.observer.onRetrieval === 'function') {

                // We have an observer and therefore we can let that tell us what to do with the value.
                this.observer.onRetrieval(this.node, value);

            } else {

                // Otherwise there is a value and so we'll update the node's value to reflect it!
                this.node[this._attribute] = value;

            }

        },

        /**
         * @method _save
         * @param event {Object}
         * Responsible for saving the updated value into the `localStorage`.
         * @return {void}
         * @private
         */
        _save: function _save(event) {

            if (!this.key.nodeName) {
                throw 'Memoria: Attempting to save value "' + this.node[this._attribute] + '" but node does not have a `name`.';
            }

            var storage = this._getStorage(),
                key     = this.key;

            if (this.observer && typeof this.observer.onEvent === 'function') {

                // We have an observer and therefore we'll retrieve the value from there instead.
                storage[key.formName][key.nodeName] = this.observer.onEvent(event, this.node);

            } else {

                // Create the namespace for the node and its related value.
                storage[key.formName][key.nodeName] = this.node[this._attribute];

            }

            // Save the new form data into the "memoria" `localStorage` namespace.
            $localStorage.setItem('memoria', JSON.stringify(storage));

            if (this.node.hasAttribute('data-memoria-name')) {

                // Find any nodes with the same name and reset them if we're using the pseudo-name.
                this._resetOthersWithSameName();

            }

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
        },

        /**
         * @method _setAttribute
         * @param name {String}
         * By default, Memoria attempts to set the `value` of the element. However, for some elements
         * this is not the case, and therefore this method allows the overriding of that default assumption.
         * @private
         */
        _setAttribute: function _setAttribute(name) {
            this._attribute = name;
        },

        /**
         * @method _resetOthersWithSameName
         * Responsible for finding any nodes with the same name as the one we're currently trying to save,
         * and removing its value from the `localStorage`.
         * @private
         */
        _resetOthersWithSameName: function __resetOthersWithSameName() {

            var storage     = this._getStorage(),
                actualName  = this.node.getAttribute('name'),
                nodes       = this.form.querySelectorAll('*[name="' + actualName + '"]');

            // Iterate over each node we've found with the same name.
            for (var nodeIndex = 0, maxNodes = nodes.length; nodeIndex < maxNodes; nodeIndex++) {

                var node = nodes[nodeIndex];

                if (node === this.node || !node.hasAttribute('data-memoria-name')) {
                    // We don't want to affect the current node, nor do we want to affect any nodes that
                    // don't have the `data-memoria-name` attribute set.
                    continue;
                }

                var name = node.getAttribute('data-memoria-name');

                if (!storage[this.key.formName][name]) {

                    // We've found an element with the same name, but it's not in the `localStorage` so it
                    // doesn't affect anything.
                    continue;

                }

                // Otherwise we'll delete our neighbour and update the `localStorage`!
                delete storage[this.key.formName][name];
                $localStorage.setItem('memoria', JSON.stringify(storage));

            }

        }

    };


})(window, window.localStorage);