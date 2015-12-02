import BreakpointPartition from './lib/BreakpointPartition.js';

export default function perfectLayout(photos, screenWidth, screenHeight, opts) {
  opts = opts || {};
  opts.margin = opts.margin || 0;

  const rows = _perfectRowsNumber(photos, screenWidth, screenHeight);
  const idealHeight = parseInt(screenHeight / 2, 10);

  if (rows < 1) {
    return photos.map(img => {
      return {
        data: img.data,
        src: img.src,
        width: parseInt(idealHeight * img.ratio) - (opts.margin * 2),
        height: idealHeight
      };
    });
  } else {
    const weights = photos.map(img => parseInt(img.ratio * 100, 10));
    const partitions = BreakpointPartition(weights, rows);

    let current = 0;

    return partitions.map(row => {
      const summedRatios = row.reduce((sum, el, i) => sum + photos[current + i].ratio, 0);

      return row.map(() => {
        const img = photos[current++];

        return {
          data: img.data,
          src: img.src,
          width: parseInt((screenWidth / summedRatios) * img.ratio, 10) - (opts.margin * 2),
          height: parseInt(screenWidth / summedRatios, 10)
        };
      });
    });
  }
}

function _perfectRowsNumber(photos, screenWidth, screenHeight) {
  const idealHeight = parseInt(screenHeight / 2);
  const totalWidth = photos.reduce((sum, img) => sum + img.ratio * idealHeight, 0);
  return Math.round(totalWidth / screenWidth);
}
