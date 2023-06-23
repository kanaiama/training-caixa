function editarPrazo(tipo) {
    var img_campo = document.getElementById("img_campo_" + tipo);
    var campoMes = document.getElementById("ipt_mes_" + tipo);

    if(img_campo.src.match("edit.png")) {
        img_campo.src = "img/ok.png";
        campoMes.disabled = false;
        campoMes.style.border = "1px solid green";
    } else {
        img_campo.src = "img/edit.png"
        campoMes.disabled = true;
        campoMes.style.border = "none";
    }
}