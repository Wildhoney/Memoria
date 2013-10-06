(function($window) {

    "use strict";

    /**
     * @module Memoria
     * @submodule Input
     * @constructor
     */
    $window.Memoria.Input = function MemoriaInput(node) {

        this._attachEvent(node, 'onkeyup');

    };

    /**
     * @property prototype
     * @type {Object}
     */
    $window.Memoria.Input.prototype = new $window.Memoria.Element;

})(window);