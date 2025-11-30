const menuOverlay = document.getElementById('menuOverlay');

function menuOpen() {
  menuOverlay && menuOverlay.classList.add('open');
}

function closeMenu() {
  menuOverlay && menuOverlay.classList.remove('open');
}

function createAccount() {
  window.location.href = "/dashboard/dashboard.html";
}