Memoria
=======

<img src="https://travis-ci.org/Wildhoney/Memoria.png" />
&nbsp;
<img src="https://badge.fury.io/js/memoria-js.png" />
&nbsp;
<img src="https://www.codeship.io/projects/c571f800-7276-0131-62fb-262d8449eba4/status" />

**Demo:** http://wildhoney.io/memoria/example

Memoria is an extensible form storage for memorising user inputs. Never again will you lose form data!

Install via npm: `npm install memoria-js`

Implementation
-------

Although Memoria is zero configuration, there are a few requirements to get it working using native `input` fields.

 * All `form` containers must have a unique `name` attribute per website;
 * All `input`/`select`/`textarea` fields must have a unique `name`/`data-memoria-name` attribute per form;
 * All `input` fields with `type` of `radio` must be <a href="https://github.com/Wildhoney/Memoria#problem-of-radio-inputs">implemented specially</a>.
 * All custom input fields must be implemented using the <a href="https://github.com/Wildhoney/Memoria#custom-nodes">provided hooks</a>.

Unit Tests
-------

All of the unit tests for Memoria are written in <a href="http://jasmine.github.io/" target="_blank">Jasmine</a> and can be run with `grunt test`.

Contributions
-------

You're more than welcome to contribute to the Memoria project! Please include unit tests and it'll be more than happily merged in.

Clearing Storage
-------

Since a form submission is no guarantee that the form data was received successfully, Memoria leaves it entirely up to you to clear the stored form data.

Simply invoke `memoria.clear('form-name');` on your form submission, AJAX request `onSuccess` handler, etc... once you're sure the data has been safely received.

```javascript
onSuccess: function(response) {

    if (response.valid) {
        memoria.clear('contact-form');
    }

}
```

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

Ignoring Inputs
-------

By default Memoria will attempt to find all `input`, `select`, `textarea` fields. However, sometimes you not want a particular node to use Memoria. For this you can simply define the `data-memoria-ignore` attribute on any node.

```html
<div class="ui form small input">
    <input data-memoria-ignore type="text" name="name" id="name" data-memoria-event="onkeyup" />
</div>
```

HTML5 Input Fields
-------

Memoria supports <strong>all</strong> HTML5 input fields &ndash; the Baker's Dozen as they're endearingly known. As with all native `input` fields, there is zero configuration and they will all work out-of-the-box.

```html
<div class="ui form small input">
    <input type="number" id="age" name="age" value="16" />
</div>
```

HTML5 inputs are: `color`, `date`, `datetime`, `datetime-local`, `email`, `month`, `number`, `range`, `search`, `tel`, `time`, `url` and `week`!

Custom Nodes
-------

By default, Memoria supports all default `input` elements. However, what if you're using a custom JavaScript dropdown? What then? Luckily you're able to indicate a form input by applying the `data-memoria-input` attribute with a value &ndash; the value will be used to load your custom delegator object.

```html
<div class="options"
    data-memoria-input="Choice" data-memoria-event="onclick" data-memoria-name="gender">
    <div class="option" data-value="Male">Male</div>
    <div class="option" data-value="Female">Female</div>
</div>
```

From the above code &ndash; as seen in <strong>example/index.html</strong>, Memoria will be looking for an `object` called `Memoria.Observer.Choice`.

 * `data-memoria-input` &ndash; name of the delegator class to handle the callbacks;
 * `data-memoria-event` &ndash; on which event(s) to respond to the element;
 * `data-memoria-name` &ndash; name of the input for when it's stored in `localStorage`;

If it's necessary, you can also specify multiple events with `data-memoria-event` by separating them with a comma &ndash; don't worry about whitespace, Memoria will trim that for you.

```html
<div class="options"
    data-memoria-input="Choice" data-memoria-event="onclick, ondblclick" data-memoria-name="gender">
    <div class="option" data-value="Male">Male</div>
    <div class="option" data-value="Female">Female</div>
</div>
```

Memoria provides two callbacks:

 * `setupElement` &ndash; invoked when `localStorage` has found a value pertaining to the current custom element (`data-memoria-name`). Should be used to setup your element visually based on the saved value;
 * `eventFired` &ndash; invoked when the user triggers the event (`data-memoria-event`). Should be used to return the value you wish to save in `localStorage`;

For an example of a custom element, please refer to <a href="https://github.com/Wildhoney/Memoria/blob/master/packages/observers/MultipleSelect.js">`Memoria.Observer.MultipleSelect`</a>.
