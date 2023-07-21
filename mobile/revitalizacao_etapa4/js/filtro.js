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
  } else {
    listaEstados.innerHTML = "<tr><td colspan='1' class='nenhumProcesso'>Nenhum estado encontrado!</td></tr>";
  }
}

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
