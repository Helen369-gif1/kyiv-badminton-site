// Відеогалерея: відео вмикається по натисканню, одночасно грає лише одне.
// Без JavaScript лишаються звичайні кнопки відтворення браузера.
(function () {
  var items = document.querySelectorAll('.reel__item');
  if (!items.length) return;
  var videos = [];

  items.forEach(function (item) {
    var v = item.querySelector('video');
    var btn = item.querySelector('.reel__play');
    videos.push(v);
    v.removeAttribute('controls');

    btn.addEventListener('click', function () { v.play(); });

    v.addEventListener('play', function () {
      videos.forEach(function (other) { if (other !== v) other.pause(); });
      v.setAttribute('controls', '');
      item.classList.add('is-playing');
    });
    // На паузі (своїй чи через інше відео) знову показуємо кнопку «відтворити»
    v.addEventListener('pause', reset);
    v.addEventListener('ended', function () { v.currentTime = 0; reset(); });

    function reset() {
      v.removeAttribute('controls');
      item.classList.remove('is-playing');
    }
  });
})();
