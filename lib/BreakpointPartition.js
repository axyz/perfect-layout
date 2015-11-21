export default function BreakpointPartition(imageRatioSequence, expectedRowCount) {
  if (imageRatioSequence.length <= 1) return [imageRatioSequence];
  if (expectedRowCount >= imageRatioSequence.length) return imageRatioSequence.map(item => [item]);

  const layoutWidth = findLayoutWidth(imageRatioSequence, expectedRowCount);
  let currentRow = 0;

  return imageRatioSequence.reduce((rows, imageRatio) => {
    if (sum(rows[currentRow]) + imageRatio > layoutWidth) currentRow++;
    rows[currentRow].push(imageRatio);
    return rows;
    // waiting for more elegant solutions (Array.fill) to work correctly
  }, new Array(expectedRowCount).join().split(',').map(() => []));
}

// starting at the ideal width, expand to the next breakpoint until we find
// a width that produces the expected number of rows
function findLayoutWidth(imageRatioSequence, expectedRowCount) {
  let idealWidth = sum(imageRatioSequence) / expectedRowCount
  let widestItem = max(imageRatioSequence);
  let galleryWidth = max([idealWidth, widestItem]);
  let layout = getLayoutDetails(imageRatioSequence, layoutWidth);

  while (layout.rowCount > rowCount) {
    layoutWidth += layout.nextBreakpoint

    layout = getLayoutDetails(imageRatioSequence, layoutWidth);
  }
  return layoutWidth;
}

// find the
function getLayoutDetails(imageRatioSequence, expectedWidth) {
  const startingLayout = {
    currentRowWidth: 0,
    rowCount: 1,
    // the largest possible step to the next breakpoint is the smallest image ratio
    nextBreakpoint: Math.min.apply(null, imageRatioSequence)
  }
  const finalLayout = imageRatioSequence.reduce((layout, itemWidth) => {
    const rowWidth = layout.currentRowWidth + itemWidth;
    let nextBreakpoint;
    if (rowWidth > expectedWidth) {
      nextBreakpointForCurrentRow = layout.currentRowWidth - expectedWidth;
      if (nextBreakpointForCurrentRow < layout.nextBreakpoint) {
        layout.nextBreakpoint = nextBreakpointForCurrentRow;
      }
      layout.rowCount += 1;
      layout.currentRowWidth = itemWidth;
    }
    return layout;
  }, startingLayout);
  return { rowCount: layout.rowCount, nextBreakpoint: layout.nextBreakpoint }
}

function sum(arr) {
  return arr.reduce((sum, el) => sum + el, 0);
}

function max(arr) {
  return arr.reduce((max, el) => el > max ? el : max, 0);
}
