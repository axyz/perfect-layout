(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.perfectLayout = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = perfectLayout;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libBSTLinearPartitionJs = require('./lib/BSTLinearPartition.js');

var _libBSTLinearPartitionJs2 = _interopRequireDefault(_libBSTLinearPartitionJs);

function perfectLayout(photos, screenWidth, screenHeight, opts) {
  opts = opts || {};
  opts.margin = opts.hasOwnProperty('margin') ? opts.margin : 0;

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
      var partitions = (0, _libBSTLinearPartitionJs2['default'])(weights, rows);

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
  var idealHeight = parseInt(screenHeight / 2, 10);
  var totalWidth = photos.reduce(function (sum, img) {
    return sum + img.ratio * idealHeight;
  }, 0);
  return Math.round(totalWidth / screenWidth);
}
module.exports = exports['default'];

},{"./lib/BSTLinearPartition.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = BSTLinearPartition;

function BSTLinearPartition(seq, k) {
  if (seq.length <= 1) return [seq];
  if (k >= seq.length) return seq.map(function (el) {
    return [el];
  });

  var limit = threshold(seq, k);
  var current = 0;

  return seq.reduce(function (res, el) {
    if (sum(res[current]) + el > limit) current++;
    res[current].push(el);
    return res;
    // waiting for more elegant solutions (Array.fill) to work correctly
  }, new Array(k).join().split(',').map(function () {
    return [];
  }));
}

// find the perfect limit that we should not pass when adding elements
// to a single partition.
function threshold(seq, k) {
  var bottom = max(seq);
  var top = sum(seq);

  while (bottom < top) {
    var mid = bottom + (top - bottom) / 2;

    if (requiredElements(seq, mid) <= k) {
      top = mid;
    } else {
      bottom = mid + 1;
    }
  }
  return bottom;
}

// find how many elements from [seq] we cann group together stating below
// [limit] by adding their weights
function requiredElements(seq, limit) {
  return seq.reduce(function (res, el) {
    res.tot += el;
    if (res.tot > limit) {
      res.tot = el;
      res.n++;
    }
    return res;
  }, { tot: 0, n: 1 }).n;
}

function sum(arr) {
  return arr.reduce(function (sum, el) {
    return sum + el;
  }, 0);
}

function max(arr) {
  return arr.reduce(function (max, el) {
    return el > max ? el : max;
  }, 0);
}
module.exports = exports['default'];

},{}]},{},[1])(1)
});