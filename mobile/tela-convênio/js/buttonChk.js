const checkbox = document.getElementById('chk1');
const button = document.getElementById('btnNext');

checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    button.removeAttribute('disabled');
    button.classList.add('enabled');
  } else {
    button.setAttribute('disabled', true);
    button.classList.remove('enabled');
  }
});

