## Perfect Layout

[DEMO](http://codepen.io/axyz/full/VLJrKr/)
[Medium Article](https://medium.com/@axyz/in-search-of-the-perfect-image-gallery-34f46f7615a1)

given an array of images in the form

```
{
  data: WATHEVER_YOU_WANT,
  src: "path/to/image.jpg",
  ratio: 1.5
}
```

returns an array of images in the form
```
{
  data: WATHEVER_YOU_WANT,
  src: "path/to/image.jpg",
  width: WIDTH,
  height: HEIGHT
}
```

where WIDTH and HEIGHT are the dimensions that image must have to fit the layout.

### Usage

on node
```
$ npm install --save perect-layout
```
and
```
var perfectLayout = require('perfect-layout')
```
while on the browser you can just
```
<script src="perfectLayout.min.js"></script>
```
then
```
var perfectRows = perfectLayout(photos, width, height);
```

This was inspired by [chromatic.io](http://www.chromatic.io/FQrLQsb) galleries
and I want to credit the [@crispymtn](https://github.com/crispymtn) team for the
original implementation.

This version aim to be more lightweight using a greedy algorithm instead of the
optimal one and also leave to the user the responsability to choose how to
manipulate the DOM accordingly to the returned array.

for convenience a jquery plugin is included for a basic usage.

assuming that a global `window.photos` array exists as specified above

```
<div id="gallery"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js"></script>
<script src="jquery.perfectLayout.min.js"></script>

<script>
$(document).ready(function() {
  $('#gallery').perfectGallery(photos);

  $(window).resize(function() {
    $('#gallery').perfectGallery(photos);
  });
});

</script>
```

For custom behaviour give a look at the [jqueryPlugin.js](https://github.com/axyz/perfect-layout/blob/master/jqueryPlugin.js) 
and use it as a starting point to generate the desired DOM nodes.

the data field can be used to populate the images with any needed metadata
you may need and is probably a good idea to provide it from your backend.
