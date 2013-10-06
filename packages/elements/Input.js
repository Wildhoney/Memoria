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
        this._attachEvent(this._getEventName('onkeyup'));
    };

})(window);