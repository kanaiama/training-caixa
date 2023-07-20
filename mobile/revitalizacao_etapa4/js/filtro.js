  // Obter referências aos elementos
  const inputPesquisa = document.getElementById('ipt_pesquisa');
  const buttonModal = document.querySelector('.button_modal');
  const listaEstados = document.querySelector('.lista_estados');

  // Obter todas as linhas de estados
  const estadoRows = document.querySelectorAll('.lista_estados tr');

  // Função para filtrar os estados com base na entrada do usuário
  function pesquisarProcesso() {
    const termoPesquisa = inputPesquisa.value.toLowerCase();

    estadoRows.forEach(row => {
      const nomeEstado = row.querySelector('td').textContent.toLowerCase();
      if (nomeEstado.includes(termoPesquisa)) {
        row.style.display = 'table-row';
      } else {
        row.style.display = 'none';
      }
    });
  }

  // Função para lidar com o clique na linha de estado
  function handleStateClick(event) {
    const estadoSelecionado = event.target.textContent;
    buttonModal.querySelector('span').textContent = estadoSelecionado;
    fecharDialog();
  }

  // Anexar ouvinte de evento ao elemento de entrada para filtragem
  inputPesquisa.addEventListener('keyup', pesquisarProcesso);

  // Anexar ouvintes de eventos de clique às linhas de estado
  estadoRows.forEach(row => {
    row.addEventListener('click', handleStateClick);
  });

  // Função para abrir/fechar o diálogo
  function abrirDialog() {
    document.getElementById('jackiechan').style.display = 'block';
  }

  function fecharDialog() {
    document.getElementById('jackiechan').style.display = 'none';
  }

  // Anexar ouvinte de evento para abrir/fechar o diálogo
  buttonModal.addEventListener('click', abrirDialog);
  document.querySelector('.modal_topo img').addEventListener('click', fecharDialog);
