document.addEventListener("DOMContentLoaded", function() {
    const abrir = document.getElementById("abrirModal");
    const modal = document.querySelector("dialog");
    const jackiechan = document.getElementById("jackiechan");

    abrir.onclick = function () {
      modal.showModal();
      jackiechan.style.display = "block";

    };
  
    modal.querySelector("img").onclick = function () {
      modal.close();
      jackiechan.style.display = "none";
    };
  });
  