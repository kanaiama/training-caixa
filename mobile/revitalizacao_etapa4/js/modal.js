document.addEventListener("DOMContentLoaded", function() {
    const abrir = document.getElementById("abrirModal");
    const modal = document.querySelector("dialog");
  
    abrir.onclick = function () {
      modal.show();
    };
  
    modal.querySelector("img").onclick = function () {
      modal.close();
    };
  });
  