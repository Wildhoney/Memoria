Memoria
=======

Extensible form storage for memorising user inputs.

Overloading Event Name
-------

Memoria allows for each supported input type to overload the default event name.

For example, on an `input` field that is of `type` <strong>text</strong>, the default event is `onkeyup`. However, by adding the `data-memoria-event="onclick"` attribute to the `input` node, the `_save` method is now invoked on the `onclick` event instead of `onkeyup`.

Problem of Radio Inputs
-------

Since `input` elements with the type `radio` have the same names, they are indistinguishable from one another, which makes it problematic to pinpoint which one the value should be applied to. However, Memoria overcomes this by allowing you to specify a custom name for <strong>all</strong> of your events &ndash; for the most part this should be avoided, because the `name` attribute will suffice, but on `radio` inputs it is a <strong>must</strong>! Simply add the `data-memoria-name` attribute to each `radio` `input` and ensure their names are unique.