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

        switch (this.node.getAttribute('type')) {

            case ('radio'):
                this._setAttribute('checked');
                this._attachEvent(this._getEventName('onclick'));
                break;

            case ('checkbox'):
                this._setAttribute('checked');
                this._attachEvent(this._getEventName('onchange'));
                break;

            case ('number'):
                this._attachEvent(this._getEventName(['onchange', 'onkeyup']));
                break;

            default:
                this._attachEvent(this._getEventName('onkeyup'));
                break;

        }

    };

})(window);