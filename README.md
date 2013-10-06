Memoria
=======

Extensible form storage for memorising user inputs.

Overloading Event Name
-------

Memoria allows for each supported input type to overload the default event name.

For example, on an `input` field that is of `type` <strong>text</strong>, the default event is `onkeyup`. However, by adding the `data-memoria-event="onclick"` attribute to the `input` node, the `_save` method is now invoked on the `onclick` event instead of `onkeyup`.