Memoria
=======

<img src="https://travis-ci.org/Wildhoney/Memoria.png" />

Memoria is an extensible form storage for memorising user inputs. Never again will you lose form data!

Clearing Storage
-------

Since a form submission is no guarantee that the form data was retrieved successfully, Memoria leaves it entirely up to you to clear the stored form data.

Simply invoke `memoria.clear('form-name');` on your form submission, AJAX request `onSuccess` handler, etc... once you're sure the data has been safely received.

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
<div class="options"
    data-memoria-input="Choice" data-memoria-event="onclick" data-memoria-name="gender">
    <div class="option" data-value="Male">Male</div>
    <div class="option" data-value="Female">Female</div>
</div>
```

From the above code &ndash; as seen in <strong>example/index.html</strong>, Memoria will be looking for an `object` called `Memoria.Dropdown`.

Memoria provides two callbacks:

 * `onRetrieval` &ndash; invoked when `localStorage` has found a value pertaining to the current custom element (`data-memoria-name`). Should be used to setup your element visually based on the saved value;
 * `onEvent` &ndash; invoked when the user triggers the event (`data-memoria-event`). Should be used to return the value you wish to save in `localStorage`;