const senhaInput1 = document.getElementById('passwd1');
const senhaInput2 = document.getElementById('passwd2');
const senhaInput3 = document.getElementById('passwd3');
const senhaInput4 = document.getElementById('passwd4');
const senhaInput5 = document.getElementById('passwd5');
const senhaInput6 = document.getElementById('passwd6');

const button = document.getElementById('btnNext');


senhaInput1.addEventListener('input', function () {
  this.value = this.value.replace(/[^0-9]/g, '');
});

senhaInput2.addEventListener('input', function () {
  this.value = this.value.replace(/[^0-9]/g, '');
});

senhaInput3.addEventListener('input', function () {
  this.value = this.value.replace(/[^0-9]/g, '');
});

senhaInput4.addEventListener('input', function () {
  this.value = this.value.replace(/[^0-9]/g, '');
});

senhaInput5.addEventListener('input', function () {
  this.value = this.value.replace(/[^0-9]/g, '');
});

senhaInput6.addEventListener('input', function () {
  this.value = this.value.replace(/[^0-9]/g, '');
});

if(senhaInput1 == 0 && senhaInput2 == 0 && senhaInput3 == 0 && senhaInput4 == 0 && senhaInput5 == 0 && senhaInput6 == 0 ) {
     button.removeAttribute('disabled');
     button.classList.add('enabled');
  } else {
    button.setAttribute('disabled', true);
    button.classList.remove('enabled');
}