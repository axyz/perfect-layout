# Perfect Layout

[Medium Article](https://medium.com/@axyz/in-search-of-the-perfect-image-gallery-34f46f7615a1)

[DEMO](http://codepen.io/axyz/full/VLJrKr/)

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

## Usage

on node
```
$ npm install --save perfect-layout
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
var perfectRows = perfectLayout(photos, width, height, {
  // default options
  margin: 0
});
```

### Options

- margin: [number]
If you are going to use a css margin for your images you need to specify it here
as well, so that the layout will adapt to scale down the images accordingly.

## Motivations

This was inspired by [chromatic.io](http://www.chromatic.io/FQrLQsb) galleries
and I want to credit the [@crispymtn](https://github.com/crispymtn) team for the
original implementation.

This version aim to be more lightweight using a greedy algorithm instead of the
optimal one and also leave to the user the responsability to choose how to
manipulate the DOM accordingly to the returned array.

## Example jQuery plugin

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

*N.B.* Please note that this is only an example on how to use the `perfectLayout` function.
The jQuery plugin is not to be used in production as it do not provide any
crossbrowser optimization, at the time of writing it should however correctly
work on the latest chrome and firefox browsers on linux.

For custom behaviour give a look at the [jqueryPlugin.js](https://github.com/axyz/perfect-layout/blob/master/jqueryPlugin.js) 
and use it as a starting point to generate the desired DOM nodes.

the data field can be used to populate the images with any needed metadata
you may need and is probably a good idea to provide it from your backend.

## Changelog

## [v1.2.0]
### Changed
- using breakPointPartition thanks to @GreenGremlin

## [v1.1.1]
### Changed
- using BST based linear partitioning instead of greedy one
- huge speed improvement
- the resulting set is now optimal
### Fixed
- the partition will now keep the same order as the input array
- the layout should now be equal to the chromatic.io one in all the cases

## [v1.1.0]
### Added
- margin option

## [v1.0.0]
### Initial Release
