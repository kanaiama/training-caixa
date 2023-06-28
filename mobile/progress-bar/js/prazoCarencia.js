function editarPrazo(tipo) {
    let img_campo = document.getElementById("img_campo_" + tipo);
    let campoMes = document.getElementById("ipt_mes_" + tipo);
    let progresso = document.getElementById("slider-range-min");

    // Atualiza a imagem, o campo e a barra de progresso
    if (img_campo.src.match("ok.png")) {
        img_campo.src = "img/edit.png";
        campoMes.disabled = true;
        campoMes.style.border = "none";

        progresso.style.pointerEvents = "auto";
        progresso.style.opacity = 1;
    } else {
        img_campo.src = "img/ok.png";
        campoMes.disabled = false;
        campoMes.style.border = "1px solid green";

        progresso.style.pointerEvents = "none";
        progresso.style.opacity = 0.5;
    }

    let min = parseInt(document.getElementById('ipt_mes_min').value);
    let max = parseInt(document.getElementById('ipt_mes_max').value);

    // Validação para garantir que o valor mínimo não seja maior que o valor máximo
    if (min > max) {
        alert('O valor mínimo não pode ser maior que o valor máximo.');
        min = 1; // Substitui o valor mínimo por 1 
        document.getElementById("ipt_mes_min").value = min; // Atualiza o valor exibido no campo
    }

    // Validação para garantir que o campo mínimo ou máximo não esteja vazio
    if (tipo === 'min' && document.getElementById('ipt_mes_min').value === '') {
        alert('O campo mínimo não pode ficar vazio.');
        min = 1; // Define um valor mínimo padrão
        campoMes.value = 1; // Atualiza o valor exibido no campo
    }

    if (tipo === 'max' && document.getElementById('ipt_mes_max').value === '') {
        alert('O campo máximo não pode ficar vazio.');
        max = min + 1; // Define um valor máximo padrão
        document.getElementById("ipt_mes_max").value = max;
    }
}



let form = document.querySelector("#min-max")
let mesMin = document.querySelector("#ipt_mes_min");
let mesMax = document.querySelector("#ipt_mes_max");    
let warning = document.querySelector('#text-alert');



// Funções para bloquear uso de caracteres especiais, letras na input
// e limitando quantidade de caracteres
mesMin.addEventListener("keypress", function (e) {
    // const keyCode = (e.keyCode ? e.keyCode : e.wich);

    if (!checkChar(e)) {
        e.preventDefault()
    }

    if (!mesMin.value.length < 3) {
        mesMin.value = mesMin.value.substring(0, 1);
    }

});

mesMax.addEventListener("keypress", function (e) {

    if (!checkChar(e)) {
        e.preventDefault()
    }

    if (!mesMax.value.length < 3) {
        mesMax.value = mesMax.value.substring(0, 1);
    }
});


function checkChar(e) {
    //Convertendo ascii para a propria tecla
    const char = String.fromCharCode(e.keyCode);
    const pattern = '[Z0-9]'

    if (char.match(pattern)) {
        return true;
    }
}