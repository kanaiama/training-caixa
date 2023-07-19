function openModal(id) {

    console.log(id);

    modal.style.display = "block";

    if (id == 'modal_estadoCivil') {

        // Lista do modal

        lista_estadoResidencia.style.display = 'block';

        lista_municipioCidade.style.display = 'none';




        // titulos

        tituloModal_estado.style.display = 'block';

        tituloModal_municipio.style.display = 'none';

    }

    if (id == 'modal_uniao_estavel') {

        // Lista do modal

        lista_municipioCidade.style.display = 'block';

        lista_estadoResidencia.style.display = 'none';





        // titulos

        tituloModal_estado.style.display = 'none';

        tituloModal_municipio.style.display = 'block';

    }




}




// ==== Sections/opções ===




function escolhaEstadoResidencia(id) {

    var escolhaid = id.innerHTML;

    var pegarTexto = document.getElementById(id).innerText;

    texto_estado_residencia.innerHTML = `${pegarTexto}`;

    texto_estado_residencia.style.color = '#0077DB';

    modal.style.display = "none";




    var pegarEstado = document.getElementById('texto_estado_residencia').innerHTML;




    if (pegarEstado != 'Ex: São Paulo') {

        estadoResidencia_escolhido = true;

        console.log(estadoResidencia_escolhido);

        proximo()

    }




    console.log(pegarTexto);




    if (pegarTexto != 'Ex: São Paulo') {




        municipio_cidade.style.display = 'block';




    }




    proximo()




}





function escolhaMunicipioCidade(id) {

    var escolhaid = id.innerHTML;

    var pegarTexto = document.getElementById(id).innerText;

    texto_municipio_cidade.innerHTML = `${pegarTexto}`;

    texto_municipio_cidade.style.color = '#0077DB';

    modal.style.display = "none";




    var pegarMunicipioCidade = document.getElementById('texto_municipio_cidade').innerHTML;




    if (pegarMunicipioCidade != 'Ex: Campinas') {

        municipioCidade_escolhido = true;

        console.log(municipioCidade_escolhido);

        proximo()

    }




}




const estadosList = document.getElementById('lista_estadoResidencia');

const buscaInput = document.getElementById('buscar_estado');




function filtrarEstados() {

    const termoBusca = buscaInput.value.toLowerCase();

    const estados = estadosList.getElementsByTagName('li');




    for (let i = 0; i < estados.length; i++) {

        const estado = estados[i];

        const nomeEstado = estado.textContent.toLowerCase();




        if (nomeEstado.indexOf(termoBusca) > -1) {

            estado.style.display = 'block';

        } else {

            estado.style.display = 'none';

        }

    }

}