(function($window) {

    "use strict";

    /**
     * @module Memoria
     * @submodule Textarea
     * @constructor
     */
    $window.Memoria.Textarea = function MemoriaTextarea() {};

    /**
     * @property prototype
     * @extends Memoria.Element
     * @type {Object}
     */
    $window.Memoria.Textarea.prototype = new $window.Memoria.Element;

    /**
     * @method initialise
     * @return {void}
     */
    $window.Memoria.Textarea.prototype.initialise = function initialise() {
        this._attachEvent('onkeyup');
    };


})(window);