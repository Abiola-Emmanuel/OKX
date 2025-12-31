AOS.init();

const menuOverlay = document.getElementById('menuOverlay');
const moreText = document.getElementById('more-text');
const showMoreBtn = document.getElementById('showMoreBtn');
const mainStreamMoreText = document.getElementById('mainStreamMore');
const mainStreamBtn = document.getElementById('mainstreamBtn');

function menuOpen() {
  menuOverlay.classList.add('open')
}
function closeMenu() {
  menuOverlay.classList.remove('open')
}

function showMore() {
  moreText.classList.add('show-more')
  showMoreBtn.style.display = 'none';
}

function mainStreamMore() {
  mainStreamMoreText.classList.add('show')
  mainStreamBtn.style.display = 'none';
}