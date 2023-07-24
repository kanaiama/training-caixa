document.addEventListener("DOMContentLoaded", function () {
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
    ipt_pesquisa.value = ""
    pesquisarEstado();
  };
  
  modal2.querySelector("img").onclick = function () {
    modal2.close();
    jackiechan2.style.display = "none";
  };
});

//Inicio do Filtro de pesquisa

  const estados = [
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins"
  ];
  
  const municipios = [
    "Rio Branco", "Cruzeiro do Sul", "Tarauacá", "Sena Madureira", "Feijó",
    "Brasiléia", "Senador Guiomard", "Mâncio Lima", "Epitaciolândia", "Xapuri",
    "Marechal Thaumaturgo", "Porto Acre", "Plácido de Castro", "Rodrigue Alves",
    "Acrelândia", "Bujari", "Manoel Urbano", "Porto Walter", "Capixaba",
    "Jordão", "Assis Brasil", "Santa Rosa do Purus"
  ];


  let estadoSpan = document.getElementById("estado_escolhido");
  let tdEstados;
  let dialogEstado;

  function pesquisarEstado() {
    let input = ipt_pesquisa.value.toLowerCase();
    let listaEstados = document.querySelector(".lista_estados tbody");
    listaEstados.innerHTML = "";

    let estadosCorrespondentes = estados.filter(estado => estado.toLowerCase().includes(input));

    if (estadosCorrespondentes.length > 0) {
      let listaPlotada = "";

      for (const estado of estadosCorrespondentes) {
        listaPlotada += `
          <tr>
            <td class="x_estado">${estado}</td>
          </tr>
        `;
      }

      listaEstados.innerHTML = listaPlotada;

      tdEstados = document.getElementsByClassName("x_estado");
      dialogEstado = document.querySelector("#jackiechan dialog");

      for (const tdEstado of tdEstados) {
        tdEstado.onclick = function () {
          estadoSpan.textContent = this.textContent;
          dialogEstado.close(); 
          jackiechan.style.display = "none";
          ipt_pesquisa.value = "";
          pesquisarEstado();
        };
      }

    } else {
      listaEstados.innerHTML = "<tr><td colspan='1' class='nenhumProcesso'>Nenhum estado encontrado!</td></tr>";
    }
  }

  estadoSpan.onclick = function () {
    estadoSpan.textContent = "Ex: São Paulo";
    ipt_pesquisa.value = "";
    pesquisarEstado();
  };

  ipt_pesquisa.addEventListener("input", pesquisarEstado);



  function pesquisarMunicipio() {
    let input = ipt_pesquisaMunicipio.value.toLowerCase();
    let listaMunicipios = document.querySelector(".lista_municipios tbody");
    listaMunicipios.innerHTML = "";

    let municipiosCorrespondentes = municipios.filter(municipio => municipio.toLowerCase().includes(input));
    if (municipiosCorrespondentes.length > 0) {
      let listaPlotada = "";

      for (const municipio of municipiosCorrespondentes) {
        listaPlotada += `
                    <tr>
                        <td class="x_municipio">${municipio}</td>
                    </tr>
                `;
      }

      listaMunicipios.innerHTML = listaPlotada;
    } else {
      listaMunicipios.innerHTML = "<tr><td colspan='1' class='nenhumProcesso'>Nenhum municipio encontrado!</td></tr>";
    }
  }

  ipt_pesquisaMunicipio.addEventListener("input", pesquisarMunicipio);


