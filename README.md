Memoria
=======

Memoria is an extensible form storage for memorising user inputs. Never again will you lose form data!

Overloading Event Name
-------

Memoria allows for each supported input type to overload the default event name.

For example, on an `input` field that is of `type` <strong>text</strong>, the default event is `onkeyup`. However, by adding the `data-memoria-event="onclick"` attribute to the `input` node, the `_save` method is now invoked on the `onclick` event instead of `onkeyup`.

```html
<input type="text" name="name" id="name" data-memoria-event="onkeydown" />
```

Problem of Radio Inputs
-------

Since `input` elements with the type `radio` have the same names, they are indistinguishable from one another, which makes it problematic to pinpoint which one the value should be applied to. However, Memoria overcomes this by allowing you to specify a custom name for <strong>all</strong> of your nodes &ndash; for the most part this should be avoided, because the `name` attribute will suffice, but on `radio` inputs it is a <strong>must</strong>! Simply add the `data-memoria-name` attribute to each `radio` `input` and ensure their names are unique.

```html
<input name="response" data-memoria-name="response-yep" type="radio" />
<input name="response" data-memoria-name="response-nope" type="radio" />
```

Custom Nodes
-------

By default, Memoria supports a handful of node types. However, what if you're using a custom JavaScript dropdown? What then? Luckily you're able to indicate a form input by applying the `data-memoria-input` attribute with a value &ndash; the value will be used to load your custom delegator object.

```html
<div class="ui dropdown" data-memoria-input="Dropdown">
    <div class="text">Male/Female</div>
    <i class="dropdown icon"></i>
    <div class="menu">
        <div class="item" data-value="option1">Male</div>
        <div class="item" data-value="option2">Female</div>
    </div>
</div>
```

Which will attempt to load the `Memoria.Custom.Dropdown` object to handle the event and the saving.