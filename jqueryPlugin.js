import perfectLayout from '.';

$.fn.perfectLayout = function(photos) {
  const node = this;
  const scrollBarSize = $('html').hasClass('touch') ? 0 : 15;
  const perfectRows = perfectLayout(photos, window.innerWidth - scrollBarSize, $(window).height());
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
