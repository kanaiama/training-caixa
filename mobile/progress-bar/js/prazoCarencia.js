function editarPrazo(tipo) {
    var img_campo = document.getElementById("img_campo_" + tipo);
    var campoMes = document.getElementById("ipt_mes_" + tipo);

    if (img_campo.src.match("edit.png")) {
        img_campo.src = "img/ok.png";
        campoMes.disabled = false;
        campoMes.style.border = "1px solid green";
    } else {
        img_campo.src = "img/edit.png"
        campoMes.disabled = true;
        campoMes.style.border = "none";
    }
}


const mesMin = document.querySelector("#ipt_mes_min");
const mesMax = document.querySelector("#ipt_mes_max");


mesMin.addEventListener("keypress", function (e) {
    // const keyCode = (e.keyCode ? e.keyCode : e.wich);

    if(!checkChar(e)) {
        e.preventDefault()
    }
    // if (keyCode > 64 && keyCode < 91 || keyCode == 48) {
    //     e.preventDefault();
    // }
});

mesMax.addEventListener("keypress", function (e) {
    // const keyCode = (e.keyCode ? e.keyCode : e.wich);

    if(!checkChar(e)) {
        e.preventDefault()
    }
    // if (keyCode > 64 && keyCode < 91 || keyCode == 48) {
    //     e.preventDefault();
    // }
});


function checkChar(e) {
    const char = String.fromCharCode(e.keyCode);
    const pattern = '[Z1-9]'

    if(char.match(pattern)) {
        return true;
    }
}