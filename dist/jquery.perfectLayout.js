(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = perfectLayout;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libBreakpointPartitionJs = require('./lib/BreakpointPartition.js');

var _libBreakpointPartitionJs2 = _interopRequireDefault(_libBreakpointPartitionJs);

function perfectLayout(photos, screenWidth, screenHeight, opts) {
  opts = opts || {};
  opts.margin = opts.margin || 0;

  var rows = _perfectRowsNumber(photos, screenWidth, screenHeight);
  var idealHeight = parseInt(screenHeight / 2, 10);

  if (rows < 1) {
    return photos.map(function (img) {
      return {
        data: img.data,
        src: img.src,
        width: parseInt(idealHeight * img.ratio) - opts.margin * 2,
        height: idealHeight
      };
    });
  } else {
    var _ret = (function () {
      var weights = photos.map(function (img) {
        return parseInt(img.ratio * 100, 10);
      });
      var partitions = (0, _libBreakpointPartitionJs2['default'])(weights, rows);

      var current = 0;

      return {
        v: partitions.map(function (row) {
          var summedRatios = row.reduce(function (sum, el, i) {
            return sum + photos[current + i].ratio;
          }, 0);

          return row.map(function () {
            var img = photos[current++];

            return {
              data: img.data,
              src: img.src,
              width: parseInt(screenWidth / summedRatios * img.ratio, 10) - opts.margin * 2,
              height: parseInt(screenWidth / summedRatios, 10)
            };
          });
        })
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }
}

function _perfectRowsNumber(photos, screenWidth, screenHeight) {
  var idealHeight = parseInt(screenHeight / 2);
  var totalWidth = photos.reduce(function (sum, img) {
    return sum + img.ratio * idealHeight;
  }, 0);
  return Math.round(totalWidth / screenWidth);
}
module.exports = exports['default'];

},{"./lib/BreakpointPartition.js":3}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ = require('.');

var _2 = _interopRequireDefault(_);

$.fn.perfectLayout = function (photos) {
  var node = this;
  var scrollBarSize = $('html').hasClass('touch') ? 0 : 15;
  var perfectRows = (0, _2['default'])(photos, window.innerWidth - scrollBarSize, $(window).height());
  node.empty();

  perfectRows.forEach(function (row) {
    row.forEach(function (img) {
      var imgNode = $('<div style="float: left;" class="image"></div>');
      imgNode.css({
        'width': img.width + 'px',
        'height': img.height + 'px',
        'background': 'url(' + img.src + ')',
        'background-size': 'cover'
      });
      node.append(imgNode);
    });
  });
};

},{".":1}],3:[function(require,module,exports){
// Rather than blindly perform a binary search from the maximum width. It starts
// from the ideal width (The ideal width being the width if the images fit
// perfectly in the given container.) and expands to the next width that will
// allow an item to move up a row. This algorithm will find the exact width that
// produces the "ideal" layout and should generally find it in two or three
// passes.
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = BreakpointPartition;

function BreakpointPartition(imageRatioSequence, expectedRowCount) {
  if (imageRatioSequence.length <= 1) return [imageRatioSequence];
  if (expectedRowCount >= imageRatioSequence.length) return imageRatioSequence.map(function (item) {
    return [item];
  });

  var layoutWidth = findLayoutWidth(imageRatioSequence, expectedRowCount);
  var currentRow = 0;

  return imageRatioSequence.reduce(function (rows, imageRatio) {
    if (sum(rows[currentRow]) + imageRatio > layoutWidth) currentRow++;
    rows[currentRow].push(imageRatio);
    return rows;
    // waiting for more elegant solutions (Array.fill) to work correctly
  }, new Array(expectedRowCount).join().split(',').map(function () {
    return [];
  }));
}

// starting at the ideal width, expand to the next breakpoint until we find
// a width that produces the expected number of rows
function findLayoutWidth(imageRatioSequence, expectedRowCount) {
  var idealWidth = sum(imageRatioSequence) / expectedRowCount;
  var widestItem = Math.max.apply(null, imageRatioSequence);
  var galleryWidth = Math.max(idealWidth, widestItem);
  var layout = getLayoutDetails(imageRatioSequence, galleryWidth);

  while (layout.rowCount > expectedRowCount) {
    galleryWidth += layout.nextBreakpoint;

    layout = getLayoutDetails(imageRatioSequence, galleryWidth);
  }
  return galleryWidth;
}

// find the
function getLayoutDetails(imageRatioSequence, expectedWidth) {
  var startingLayout = {
    currentRowWidth: 0,
    rowCount: 1,
    // the largest possible step to the next breakpoint is the smallest image ratio
    nextBreakpoint: Math.min.apply(null, imageRatioSequence)
  };

  var finalLayout = imageRatioSequence.reduce(function (layout, itemWidth) {
    var rowWidth = layout.currentRowWidth + itemWidth;
    var currentRowsNextBreakpoint = undefined;

    if (rowWidth > expectedWidth) {
      currentRowsNextBreakpoint = rowWidth - expectedWidth;
      if (currentRowsNextBreakpoint < layout.nextBreakpoint) {
        layout.nextBreakpoint = currentRowsNextBreakpoint;
      }
      layout.rowCount += 1;
      layout.currentRowWidth = itemWidth;
    } else {
      layout.currentRowWidth = rowWidth;
    }

    return layout;
  }, startingLayout);
  return {
    rowCount: finalLayout.rowCount,
    nextBreakpoint: finalLayout.nextBreakpoint
  };
}

function sum(arr) {
  return arr.reduce(function (sum, el) {
    return sum + el;
  }, 0);
}
module.exports = exports['default'];

},{}]},{},[2]);
