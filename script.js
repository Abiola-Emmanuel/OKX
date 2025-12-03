AOS.init();

const menuOverlay = document.getElementById('menuOverlay');

function menuOpen() {
  menuOverlay.classList.add('open')
}
function closeMenu() {
  menuOverlay.classList.remove('open')
}

document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.accordion .item');

  if (!items.length) return;

  items.forEach(item => {
    const content = item.querySelector('.content-wrap');
    if (item.getAttribute('aria-expanded') === 'true') {
      content.style.maxHeight = content.scrollHeight + 'px';
      const btn = item.querySelector('.trigger');
      if (btn) btn.setAttribute('aria-expanded', 'true');
    }
  });

  items.forEach(item => {
    const btn = item.querySelector('.trigger');
    const content = item.querySelector('.content-wrap');
    if (!btn || !content) return;

    btn.addEventListener('click', () => {
      const isOpen = item.getAttribute('aria-expanded') === 'true';

      items.forEach(i => {
        i.setAttribute('aria-expanded', 'false');
        const b = i.querySelector('.trigger');
        const c = i.querySelector('.content-wrap');
        if (b) b.setAttribute('aria-expanded', 'false');
        if (c) c.style.maxHeight = null;
      });

      if (!isOpen) {
        item.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
});
