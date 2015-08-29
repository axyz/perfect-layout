import greedyLinearPartition from './lib/greedyLinearPartition.js';

export default function _perfectLayout(photos, screenWidth, screenHeight) {
  const rows = _perfectRowsNumber(photos, screenWidth, screenHeight);
  const idealHeight = parseInt(screenHeight / 2, 10);

  if (rows < 1) {
    return photos.map(img => {
      return {
        data: img.data,
        src: img.src,
        width: parseInt(idealHeight * img.ratio),
        height: idealHeight
      };
    });
  } else {
    const weights = photos.map(img => parseInt(img.ratio * 100, 10));
    const partitions = greedyLinearPartition(weights, rows);

    var current = 0;

    return partitions.map(row => {
      const summedRatios = row.reduce((sum, el, i) => sum += photos[current+i].ratio, 0);

      return row.map(el => {
        const img = photos[current++];

        return {
          data: img.data,
          src: img.src,
          width: parseInt((screenWidth / summedRatios) * img.ratio, 10),
          height: parseInt(screenWidth / summedRatios, 10)
        };
      });
    });
  }
};

function _perfectRowsNumber(photos, screenWidth, screenHeight) {
  const idealHeight = parseInt(screenHeight / 2, 10);
  const totalWidth = photos.reduce((sum, img) => sum + img.ratio * idealHeight, 0);
  return Math.round(totalWidth / screenWidth);
}
