# Cistercian Numerals generator

If all you want to do is convert numbers to [Cistercian numerals](https://en.wikipedia.org/wiki/Cistercian_numerals), check out the [generator page](https://codepo8.github.io/cistercian/) which allows you to convert numbers to SVG or Canvas/PNG. 

You can also check out the snazzy [Cistercian Clock](https://codepo8.github.io/cistercian/clock.html) to impress friends and family. 

If you want to use this in your own products, there are two options:

## toCistercian.js - Node or browser number to Cistercian numeral converted in SVG

You can use this on the command line using: 

```
node toCistercian.js {number}
```

For example `node toCistercian,js 161` results in the following SVG:

```xml
<svg width="120" height="180" xmlns="http://www.w3.org/2000/svg">
    <title>Cistercian numeral for 161</title>
    <line x1="60" y1="20" x2="60" y2="160" stroke="#000" stroke-linecap="square" stroke-width="4"/>
    <line x1="60" y1="20" x2="100" y2="20" stroke="#000" stroke-linecap="square" stroke-width="4"/>
    <line x1="60" y1="20" x2="60" y2="160" stroke="#000" stroke-linecap="square" stroke-width="4"/>
    <line x1="20" y1="20" x2="20" y2="60" stroke="#000" stroke-linecap="square" stroke-width="4"/>
    <line x1="60" y1="20" x2="60" y2="160" stroke="#000" stroke-linecap="square" stroke-width="4"/>
    <line x1="100" y1="160" x2="60" y2="160" stroke="#000" stroke-linecap="square" stroke-width="4"/>
</svg>
```

You can also use this in a browser as shown in the [simple.html](https://codepo8.github.io/cistercian/simple.html) example: 

```html
<output></output>
<script src="toCistercian.js">
</script>
<script>
    const svg = toCistercian(1312);
    document.querySelector('output').innerHTML = svg;
</script>
```
## cistercian.js - convert to svg/png/canvas with customisation

The generator uses the more detailed [cistercian.js](cistercian.js) version, which allows you to generate numerals in various versions and formats.

Usage is in JavaScript and a browser environment.

```javascript
<script src="cistercian.js"></script>
<script>
    const converter = new Cistercian();
    converter.rendernumber(1312);
</script>
```

This would add an `output` element to the body and render the numeral with a text representation and a button to remove it again.
You can configure it to change the look and feel and what gets rendered by calling the `configure` method. See the [advanced example](https://codepo8.github.io/cistercian/advanced.html) for that.

If you want, for example, to render the numeral inside the element with the ID `mycanvas` as SVG with a `width` of `400`, lines 10 pixels thick and in the colour `peachpuff` and without any text display or button to delete, you can do the following:

```html
<div id="mycanvas"></div>
```

```javascript
myConverter.configure({
    renderer: 'svg',
    canvas: { width: 400 },
    stroke: { colour: 'peachpuff', width: 10 },
    addtext: false,
    addinteraction: false,
    outputcontainer: document.getElementById('mycanvas')
});
myConverter.rendernumber(1312);
```

Enjoy! 