const menuOverlay = document.getElementById('menuOverlay');

function menuOpen() {
  menuOverlay && menuOverlay.classList.add('open');
}

function closeMenu() {
  menuOverlay && menuOverlay.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  const phoneOption = document.getElementById('phoneOption');
  const emailOption = document.getElementById('emailOption');
  const input = document.getElementById('userInput');
  const nextBtn = document.getElementById('nextBtn');

  function setMode(mode) {
    if (!input) return;
    if (mode === 'phone') {
      input.placeholder = 'Enter your phone';
      input.type = 'tel';
      input.inputMode = 'tel';
      phoneOption && phoneOption.classList.add('active');
      emailOption && emailOption.classList.remove('active');
      input.focus();
    } else {
      input.placeholder = 'Enter your email..';
      input.type = 'email';
      input.inputMode = 'email';
      emailOption && emailOption.classList.add('active');
      phoneOption && phoneOption.classList.remove('active');
      input.focus();
      updateNextButton();
    }
  }

  function updateNextButton() {
    if (input.value.trim() !== "") {
      nextBtn.disabled = false;
      nextBtn.classList.add('enabled');
    } else {
      nextBtn.disabled = true;
      nextBtn.classList.remove('enabled');
    }
  }

  input.addEventListener('input', updateNextButton);



  window.phone = () => setMode('phone');
  window.email = () => setMode('email');

  setMode('email');

  function next() {
    if (input.value.trim() === "") {
      alert("Please enter your email or phone number.");
    } else {
      window.location.href = "/dashboard/dashboard.html";
    }
  }

  nextBtn.addEventListener('click', next);

});
