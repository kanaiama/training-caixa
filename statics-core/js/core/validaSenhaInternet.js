define([], function() {
  return {
    ValidaSenhaInternet: function(senha, charlimit) {
      var numerosIda;
      var letrasMaiusculasIda;
      var letrasMinusculasIda;
      var sequencial;
      var numCaracteresIguais;
      // Carrega as variaveis de ida e volta
      numerosIda = '0123456789';
      letrasMaiusculasIda = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      letrasMinusculasIda = letrasMaiusculasIda.toLowerCase();
      sequencial =
          numerosIda + '||' + letrasMaiusculasIda + '||' + letrasMinusculasIda;
      window.status = '';

      //Verifica a quantidade de caracteres se informado
      if (charlimit == undefined)
      {
        charlimit = 6
      }

      if (
          charlimit !== undefined &&
          charlimit !== null &&
          senha.length < Number(charlimit)
      ) {
        alert('A senha deve possuir entre 6 e 8 caracteres!');
        return false;
      }

      // Verificando a inclusao de caracteres especiais...
      for (var i = 0; i < senha.length; i++) {
        if (
            sequencial.indexOf(senha.charAt(i)) == -1 ||
            senha.charAt(i) == '|'
        ) {
          alert('A senha n\u00E3o pode possuir caracteres especiais ou acentua\u00E7\u00E3o.');
          return false;
        }
      }

      for (i = 0; i < senha.length; i++) {
        var c = senha.charAt(i);
        if (i + 2 < senha.length) {
          // Verificando se tem 3 caracteres iguais sequenciais...
          if (c == senha.charAt(i + 1) && c == senha.charAt(i + 2)) {
            alert('A senha n\u00E3o pode possuir 3 caracteres iguais sequenciais!');
            return false;
          }

          // Verificando se tem numeros ou letras sequenciais...
          if (sequencial.indexOf(senha.substring(i, i + 3)) != -1) {
            alert('A senha n\u00E3o pode possuir n\u00FAmeros ou letras sequenciais!');
            return false;
          }
        }
        // Verificando se tem 3 caracteres iguais alternados...
        numCaracteresIguais = 0;
        for (var j = 0; j < senha.length; j++) {
          if (c == senha.charAt(j)) {
            numCaracteresIguais++;
          }
          if (numCaracteresIguais > 2) {
            alert('A senha n\u00E3o pode possuir 3 caracteres iguais alternados!');
            return false;
          }
        }
        // Verificando os alternados...
        var indiceAnterior = -1;
        var indicePosterior = -1;
        var indiceAtual = sequencial.indexOf(c);
        if (i > 0 && indiceAtual != 0) {
          indiceAnterior = senha.indexOf(sequencial.charAt(indiceAtual - 1));
        }
        if (indiceAtual != 121) {
          indicePosterior = senha.indexOf(sequencial.charAt(indiceAtual + 1));
        }
        // Verificando se os indices anteriores e posteriores sao diferentes de -1 e i maior que zero
        if (indiceAnterior > -1 && indicePosterior > -1 && i > 0) {
          // Verificando numeros ou letras sequenciais alternados. ex: a1b4c7, a1n2m3, a3c2g1, 1c3ba5...
          if (
              (indiceAnterior < i && i < indicePosterior) ||
              (indiceAnterior > i && i > indicePosterior)
          ) {
            alert(
                'A senha n\u00E3o pode possuir n\u00FAmeros ou letras sequenciais alternados!'
            );
            return false;
          }
        }
      }
      return true;
    },

    IsNumber: function(Numero) {
      if (Numero == '') {
        return false;
      }
      for (var i = 0; i < Numero.length; i++) {
        if (Numero.charAt(i) < '0' || Numero.charAt(i) > '9') {
          return false;
        }
      }
      return true;
    },

    IsString: function(valor) {
      var alfa = false;
      var numerico = false;
      if (valor == '') {
        return false;
      }
      for (var i = 0; i < valor.length; i++) {
        if (valor.charAt(i) < '0' || valor.charAt(i) > '9') {
          alfa = true;
        } else {
          numerico = true;
        }
      }
      if (alfa && numerico) {
        return false;
      } else {
        return true;
      }
    }
  };
});
