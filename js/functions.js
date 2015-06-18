var angle = 0;

interact('.resize-drag')
  .gesturable({
    onmove: function (event) {
      var arrow = document.getElementById('arrow');

      angle += event.da;

      arrow.style.webkitTransform =
      arrow.style.transform =
        'rotate(' + angle + 'deg)';

      //document.getElementById('angle-info').textContent =
        //angle.toFixed(2) + '°';
    }
  })
  .draggable({
    onmove: window.dragMoveListener
  })
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    var clon = document.getElementById('clon'),
        x = (parseFloat(clon.getAttribute('data-x')) || 0),
        y = (parseFloat(clon.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';
    clon.style.width  = event.rect.width + 'px';
    clon.style.height = event.rect.height + 'px';


    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    clon.style.webkitTransform = clon.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    clon.setAttribute('data-x', x);
    clon.setAttribute('data-y', y);
    //target.textContent = event.rect.width + '×' + event.rect.height;
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

   var clon = document.getElementById('clon'),
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(clon.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(clon.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    clon.style.webkitTransform =
    clon.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    clon.setAttribute('data-x', x);
    clon.setAttribute('data-y', y);
  }

  // this is used later in the resizing demo
  window.dragMoveListener = dragMoveListener;