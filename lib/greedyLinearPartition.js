export default function greedyLinearPartition(seq, k) {
  return seq
    .sort((a, b) => b - a)
    .reduce((res, el) => {
      res[smallerArrayIndex(res)].push(el);
      return res;
      // waiting for more elegant solutions (Array.fill) to work correctly
    }, new Array(k).join().split(',').map(i => []));
}

function sum(arr) {
  return arr.reduce((sum, el) => sum + el, 0);
}

function smallerArrayIndex(list) {
  return list.reduce((i, array, index) => sum(array) < sum(list[i]) ? index : i, 0);
}
