(function($window, $j, $localStorage) {

    describe('Memoria', function() {

        var $simulateEvent, $data;

        beforeEach(function() {

            jasmine.getFixtures().fixturesPath = './tests/fixtures';
            loadFixtures('html5.html');

            $window.memoria._initialiseForms();

            $simulateEvent = function simulateEvent(element, eventName) {

                if ('createEvent' in document) {
                    var evt = document.createEvent('HTMLEvents');
                    evt.initEvent(eventName, false, true);
                    element.dispatchEvent(evt);
                }
                else {
                    element.fireEvent('on' + eventName);
                }

            };

            $data = function data(formName, elementName) {
                var data = JSON.parse($localStorage.memoria);
                return data[formName][elementName];
            }

        });

        describe('HTML5', function() {

            it('Can support the `input` with type `number`;', function() {
                var element     = document.querySelector('.number');
                element.value   = 2;
                $simulateEvent(element, 'change');
                expect($data('html5-test-form', 'number')).toEqual('2');
            });

            it('Can support the `input` with type `search`;', function() {
                var element     = document.querySelector('.search');
                element.value   = 'Adam';
                $simulateEvent(element, 'keyup');
                expect($data('html5-test-form', 'search')).toEqual('Adam');
            });

            it('Can support the `input` with type `date`;', function() {
                var element     = document.querySelector('.date');
                element.value   = '2013-12-12';
                $simulateEvent(element, 'change');
                expect($data('html5-test-form', 'date')).toEqual('2013-12-12');
            });

            it('Can support the `input` with type `month`;', function() {
                var element     = document.querySelector('.month');
                element.value   = '2014-01';
                $simulateEvent(element, 'change');
                expect($data('html5-test-form', 'month')).toEqual('2014-01');
            });

            it('Can support the `input` with type `time`;', function() {
                var element     = document.querySelector('.time');
                element.value   = '12:24';
                $simulateEvent(element, 'change');
                expect($data('html5-test-form', 'time')).toEqual('12:24');
            });

            it('Can support the `input` with type `week`;', function() {
                var element     = document.querySelector('.week');
                element.value   = '2009-W10';
                $simulateEvent(element, 'change');
                expect($data('html5-test-form', 'week')).toEqual('2009-W10');
            });

            it('Can support the `input` with type `datetime`;', function() {
                var element     = document.querySelector('.datetime');
                element.value   = '2013-12-12 01:09';
                $simulateEvent(element, 'change');
                expect($data('html5-test-form', 'datetime')).toEqual('2013-12-12 01:09');
            });

            it('Can support the `input` with type `datetime-local`;', function() {
                var element     = document.querySelector('.datetime-local');
                element.value   = '1985-10-10T13:14';
                $simulateEvent(element, 'change');
                expect($data('html5-test-form', 'datetime-local')).toEqual('1985-10-10T13:14');
            });

            it('Can support the `input` with type `range`;', function() {
                var element     = document.querySelector('.range');
                element.value   = 92;
                $simulateEvent(element, 'change');
                expect($data('html5-test-form', 'range')).toEqual('92');
            });

        });

    });

})(window, window.jQuery, window.localStorage);