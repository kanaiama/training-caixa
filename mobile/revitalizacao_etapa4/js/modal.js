document.addEventListener("DOMContentLoaded", function() {
  const abrirModal = document.getElementById("abrirModal");
  const abrirModal2 = document.getElementById("abrirModal2");
  const modal = document.querySelector("#jackiechan dialog");
  const modal2 = document.querySelector("#jackiechan2 dialog");
  const jackiechan = document.getElementById("jackiechan");
  const jackiechan2 = document.getElementById("jackiechan2");

  abrirModal.onclick = function () {
    modal.showModal();
    jackiechan.style.display = "block";
    jackiechan2.style.display = "none"; 
  };
  
  abrirModal2.onclick = function () {
    modal2.showModal();
    jackiechan.style.display = "none"; 
    jackiechan2.style.display = "block";
  };

  modal.querySelector("img").onclick = function () {
    modal.close();
    jackiechan.style.display = "none";
  };

  modal2.querySelector("img").onclick = function () {
    modal2.close();
    jackiechan2.style.display = "none";
  };
});