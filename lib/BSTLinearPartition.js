export default function BSTLinearPartition(seq, k) {
  if (seq.length <= 1) return [seq];
  if (k >= seq.length) return seq.map(el => [el]);

  const limit = threshold(seq, k);
  let current = 0;

  return seq.reduce((res, el) => {
    if (sum(res[current]) + el > limit) current++;
    res[current].push(el);
    return res;
    // waiting for more elegant solutions (Array.fill) to work correctly
  }, new Array(k).join().split(',').map(() => []));
}

// find the perfect limit that we should not pass when adding elements
// to a single partition.
function threshold(seq, k) {
  let bottom = max(seq);
  let top = sum(seq);

  while (bottom < top) {
    const mid = bottom + ( top - bottom) / 2;

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
  return seq.reduce((res, el) => {
    res.tot += el;
    if (res.tot > limit) {
      res.tot = el;
      res.n++;
    }
    return res;
  }, {tot: 0, n: 1}).n;
}

function sum(arr) {
  return arr.reduce((sum, el) => sum + el, 0);
}

function max(arr) {
  return arr.reduce((max, el) => el > max ? el : max, 0);
}
