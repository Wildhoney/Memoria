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
            case ('range'):
                this._setAttribute('checked');
                this._attachEvent(this._getEventName('onchange'));
                break;

            case ('number'):
            case ('search'):
            case ('date'):
            case ('month'):
            case ('time'):
            case ('week'):
            case ('datetime'):
            case ('datetime-local'):
            case ('color'):
                this._attachEvent(this._getEventName(['onchange', 'onkeyup', 'onclick']));
                break;

            default:
                this._attachEvent(this._getEventName('onkeyup'));
                break;

        }

    };

})(window);