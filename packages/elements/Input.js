(function($window) {

    "use strict";

    /**
     * @module Memoria
     * @submodule Input
     * @constructor
     */
    $window.Memoria.Input = function MemoriaInput() {};

    /**
     * @property prototype
     * @extends Memoria.Element
     * @type {Object}
     */
    $window.Memoria.Input.prototype = new $window.Memoria.Element();

    /**
     * @method initialise
     * @return {void}
     */
    $window.Memoria.Input.prototype.initialise = function initialise() {

        /**
         * @method isHTML5NodeWithClick
         * @param type
         * @return {Boolean}
         */
        var isHTML5NodeWithClick = function isHTML5NodeWithClick(type) {
            var types = ['number', 'search', 'date', 'range', 'month',
                         'time', 'week', 'datetime', 'datetime-local', 'color'];
            return (types.indexOf(type) !== -1);
        };

        if (isHTML5NodeWithClick(this.node.getAttribute('type'))) {
            // Determine if it's a common HTML5 node.
            this._attachEvent(this._getEventName(['onchange', 'onkeyup', 'onclick']));
            return;
        }

        switch (this.node.getAttribute('type')) {

            case ('radio'):
                this._setAttribute('checked');
                this._attachEvent(this._getEventName('onclick'));
                break;

            case ('checkbox'):
                this._setAttribute('checked');
                this._attachEvent(this._getEventName('onchange'));
                break;

            default:
                this._attachEvent(this._getEventName(['onkeyup', 'onchange']));
                break;

        }

    };

})(window);