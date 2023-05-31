<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="pt-br">
    <head> 
        <title>Termos da transa&ccedil;&atilde;o eletr&ocirc;nica</title>
        <meta charset="utf-8">
        <meta name="author" content="mailto:cpmbraxis@cpmbraxis.com">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,requiresActiveX=true" >
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="format-detection" content="telephone=no">
        <!-- CSS -->
        <link rel="stylesheet" media="all" href="/statics-core/css/elements.css">
        <link rel="stylesheet" media="all" href="/statics-core/css/reset.css">
        <link rel="stylesheet" href="/statics-core/bootstrap/css/bootstrap.css">
        <link rel="stylesheet" media="all" href="/statics-core/css/login.css">
        <link rel="stylesheet" href="/statics-core/css/principal.css">
        <link rel="stylesheet" media="all" href="" class="contrastePF">
        
        <style type="text/css">
		body{
			margin:20px 40px;
		}
        .logo-caixa-contrato{
        	padding:25px 0;
        }
        
        .tituloPagina {font-weight: bold;
            font-size: 20px;
            color: #0059be;
            margin-bottom: 10px;
            padding-bottom: 10px;
        }
        
        </style>
        <script>
        window.print();
        </script>
        
    </head>
    <body>
    
        <p><img src='data:image/jpeg;base64,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'class="logo-caixa-contrato"  style="width: 140px" alt=""/></p>
       	        
        <h3 class="tituloPagina m-t-10">Termos da transa&ccedil;&atilde;o eletr&ocirc;nica</h3>
        
        <p><b><span >&nbsp;</span></b></p>
        
        <p>CL&Aacute;USULA 1&ordf; - DAS DEFINI&Ccedil;&Otilde;ES </p>
        
        <p>Para efeito deste contrato considera-se como: </p>
        
        <p>I              - Senha de Transa&ccedil;&atilde;o, a senha de 6 a 8
        d&iacute;gitos num&eacute;ricos, que permite realizar movimenta&ccedil;&otilde;es financeiras que geram
        d&eacute;bito na conta e contratar produtos e servi&ccedil;os por meio dos canais de acesso
        remoto disponibilizados pela CAIXA, nas modalidades: </p>
        
        <p>                - Simples: Para contas de Pessoa F&iacute;sica
        individuais ou conjuntas solid&aacute;rias e contas de Pessoa Jur&iacute;dica com um &uacute;nico
        representante; </p>
        
        <p>                - M&uacute;ltipla: Para contas conjuntas n&atilde;o
        solid&aacute;rias de Pessoa F&iacute;sica e contas de Pessoa Jur&iacute;dica com mais de um
        representante. </p>
        
        <p>&nbsp;</p>
        
        <p>II - CLIENTE, o titular ou procurador do Cliente Pessoa
        F&iacute;sica ou o Representante do Cliente Pessoa Jur&iacute;dica com poderes para cadastrar
        e administrar senhas e movimentar conta em todos os canais de acesso
        disponibilizados pela CAIXA. </p>
        
        <p>&nbsp;</p>
        
        <p>CL&Aacute;USULA 2&ordf; - DO OBJETO </p>
        
        <p>                O presente contrato tem por finalidade
        disponibilizar ao CLIENTE Senha de Transa&ccedil;&atilde;o que o possibilite realizar, de
        forma remota, transa&ccedil;&otilde;es banc&aacute;rias atrav&eacute;s de canais de acesso disponibilizados
        pela CAIXA. </p>
        
        <p>                Par&aacute;grafo 1&ordm; - O acesso remoto aos servi&ccedil;os
        da CAIXA se dar&aacute; de forma automatizada, a pedido do cliente, atrav&eacute;s do Internet
        CAIXA ou telefonia celular digital, bem como de outros canais que vierem a ser
        implementados. </p>
        
        <p>                Par&aacute;grafo 2&ordm; - A Senha de Transa&ccedil;&atilde;o em
        quest&atilde;o autorizar&aacute; e legitimar&aacute; a realiza&ccedil;&atilde;o pelo CLIENTE, exclusivamente nos
        limites e condi&ccedil;&otilde;es estabelecidas para cada canal de acesso. </p>
        
        <p>&nbsp;</p>
        
        <p>CL&Aacute;USULA 3&ordf; - DA OPERACIONALIZA&Ccedil;ÃO </p>
        
        <p>                Para a utiliza&ccedil;&atilde;o da Senha de Transa&ccedil;&atilde;o &eacute;
        necess&aacute;ria e suficiente a concord&acirc;ncia com as cl&aacute;usulas deste instrumento. </p>
        
        <p>                Par&aacute;grafo 1&ordm; - O CLIENTE poder&aacute; entrar em
        contato com a Ag&ecirc;ncia da CAIXA onde mant&eacute;m sua conta para cadastrar a sua
        Senha de Transa&ccedil;&atilde;o. </p>
        
        <p>                I - No ato do cadastramento a CAIXA
        fornecer&aacute; ao CLIENTE uma senha provis&oacute;ria, sem car&aacute;ter autorizador de
        transa&ccedil;&otilde;es banc&aacute;rias, que possibilitar&aacute; ao CLIENTE efetuar o cadastramento, no seu
        primeiro acesso, da sua Senha de Transa&ccedil;&atilde;o definitiva. </p>
        
        <p>                II - Esta Senha de Transa&ccedil;&atilde;o, cadastrada
        pelo pr&oacute;prio CLIENTE, ser&aacute; somente de seu conhecimento, uma vez que os sistemas
        de processamento de dados da CAIXA efetuar&atilde;o a criptografia (codifica&ccedil;&atilde;o) desta
        senha para guarda em seu banco de dados. </p>
        
        <p>                Par&aacute;grafo 2&ordm; - O CLIENTE poder&aacute; cadastrar
        pelo Internet Banking sua senha de transa&ccedil;&atilde;o simples, caso possua cart&atilde;o com
        CHIP da conta.</p>
        
        <p>                I-             No ato do cadastramento, o
        CLIENTE informar&aacute; a senha definitiva desejada. Esta senha ficar&aacute; bloqueada at&eacute;
        que seja efetuado desbloqueio em um terminal de autoatendimento da CAIXA,
        mediante cart&atilde;o com CHIP da conta.</p>
        
        <p>                II-           Ap&oacute;s o desbloqueio, esta senha
        possuir&aacute; car&aacute;ter autorizador de transa&ccedil;&otilde;es banc&aacute;rias.</p>
        
        <p>                III-          Esta Senha de Transa&ccedil;&atilde;o,
        cadastrada pelo pr&oacute;prio CLIENTE, ser&aacute; somente de seu conhecimento, uma vez que
        os sistemas de processamento de dados da CAIXA efetuar&atilde;o a criptografia
        (codifica&ccedil;&atilde;o) desta senha para guarda em seu banco de dados. </p>
        
        <p>                Par&aacute;grafo 3&ordm; - A Senha de Transa&ccedil;&atilde;o &eacute; a
        chave que permite e legitima a autoriza&ccedil;&atilde;o de movimenta&ccedil;&otilde;es financeiras
        correspondentes ao(s) servi&ccedil;o(s) solicitado(s). </p>
        
        <p>                Par&aacute;grafo 4&ordm; - A Senha de Transa&ccedil;&atilde;o &eacute; de
        responsabilidade exclusiva do CLIENTE, raz&atilde;o pela qual a CAIXA n&atilde;o se
        responsabiliza pelo seu uso indevido, cabendo ao CLIENTE a guarda e o sigilo
        dessa e, havendo qualquer irregularidade na sua utiliza&ccedil;&atilde;o, dever&aacute; ser
        comunicada &agrave; Ag&ecirc;ncia onde o CLIENTE mant&eacute;m sua conta e, se for o caso,
        solicitada, de imediato, a sua suspens&atilde;o. </p>
        
        <p>                Par&aacute;grafo 5&ordm; - Sendo conta de Pessoa
        Jur&iacute;dica, o CLIENTE fica respons&aacute;vel por atualizar os dados junto &agrave; Ger&ecirc;ncia,
        diante de qualquer altera&ccedil;&atilde;o em seu quadro de diretores ou pessoas autorizadas
        a acessar a conta da empresa, n&atilde;o sendo respons&aacute;vel a CAIXA por eventuais
        problemas advindos da falta de comunica&ccedil;&atilde;o formal e tempestiva. </p>
        
        <p>                Par&aacute;grafo 6&ordm; - No caso de delega&ccedil;&atilde;o do uso
        da Senha de Transa&ccedil;&atilde;o a prepostos, o CLIENTE ser&aacute; respons&aacute;vel pelas
        transa&ccedil;&otilde;es realizadas. </p>
        
        <p>                Par&aacute;grafo 7&ordm; - A CAIXA poder&aacute;, a qualquer
        tempo, proceder ao bloqueio ou cancelamento preventivo da Assinatura
        Eletr&ocirc;nica, desde que constatado, atrav&eacute;s dos seus sistemas de seguran&ccedil;a ou
        outros meios, o risco de fraude. </p>
        
        <p>                Par&aacute;grafo 8&ordm; - As movimenta&ccedil;&otilde;es banc&aacute;rias ser&atilde;o
        efetivadas na forma dos contratos espec&iacute;ficos de cada opera&ccedil;&atilde;o e/ou canal de
        acesso utilizado pelo CLIENTE. </p>
        
        <p>                Par&aacute;grafo 9&ordm; - Na utiliza&ccedil;&atilde;o da Assinatura
        Eletr&ocirc;nica, cada movimenta&ccedil;&atilde;o financeira acatada pela CAIXA gerar&aacute; um
        comprovante de efetiva&ccedil;&atilde;o da opera&ccedil;&atilde;o - c&oacute;digo da opera&ccedil;&atilde;o - que corresponder&aacute;
        &agrave; confirma&ccedil;&atilde;o da transa&ccedil;&atilde;o e dever&aacute; ser impresso, caso o canal de acesso
        utilizado possibilite a impress&atilde;o, ou ter o C&oacute;digo da Opera&ccedil;&atilde;o anotado e
        guardado pelo CLIENTE, pois o C&oacute;digo da Opera&ccedil;&atilde;o gerado &eacute; a autentica&ccedil;&atilde;o do
        comprovante da efetiva&ccedil;&atilde;o do lan&ccedil;amento na conta do CLIENTE. </p>
        
        <p>                Par&aacute;grafo 10&ordm; - Ap&oacute;s a confirma&ccedil;&atilde;o da
        transa&ccedil;&atilde;o pelo CLIENTE, a possibilidade de cancelamento da movimenta&ccedil;&atilde;o
        financeira se dar&aacute; conforme as caracter&iacute;sticas dos servi&ccedil;os e informa&ccedil;&otilde;es
        dispon&iacute;veis em cada opera&ccedil;&atilde;o e/ou canal de acesso utilizado. </p>
        
        <p>                Par&aacute;grafo 11&ordm; - A CAIXA fica autorizada, de
        modo irrevog&aacute;vel e irretrat&aacute;vel, a efetivar o(s) lan&ccedil;amento(s) na conta do
        CLIENTE e respectivos registros cont&aacute;beis das transa&ccedil;&otilde;es efetuadas por meio dos
        canais de acesso disponibilizados pela CAIXA. </p>
        
        <p>&nbsp;</p>
        
        <p>CL&Aacute;USULA 4&ordf; - DAS OBRIGA&Ccedil;&Otilde;ES DA CAIXA </p>
        
        <p>                A CAIXA se obriga a: </p>
        
        <p>                I - Prestar as informa&ccedil;&otilde;es necess&aacute;rias ao
        CLIENTE sobre a instala&ccedil;&atilde;o e o funcionamento dos aplicativos disponibilizados; </p>
        
        <p>                II - Processar as transa&ccedil;&otilde;es corretamente
        comandadas pelo CLIENTE, autorizadas pelo uso da Senha de Transa&ccedil;&atilde;o; </p>
        
        <p>                III - Efetuar a verifica&ccedil;&atilde;o da consist&ecirc;ncia
        dos dados relativos a pagamentos e transfer&ecirc;ncias, desde que contidos na
        formata&ccedil;&atilde;o dos conv&ecirc;nios respectivos, tais como c&aacute;lculo de d&iacute;gitos
        verificadores, c&oacute;digos de pagamentos e exig&ecirc;ncia de preenchimento de campos
        obrigat&oacute;rios; </p>
        
        <p>                IV - Realizar as transa&ccedil;&otilde;es agendadas para
        efetiva&ccedil;&atilde;o futura na data informada pelo CLIENTE ou na data exigida pela
        legisla&ccedil;&atilde;o, caso a data informada recaia em dia n&atilde;o &uacute;til, condicionado &agrave;
        disponibilidade de saldo na conta do cliente; </p>
        
        <p>                V - Efetuar o bloqueio preventivo da
        Senha de Transa&ccedil;&atilde;o, caso constate possibilidade real de fraude; </p>
        
        <p>                VI - Implementar requisitos de seguran&ccedil;a que
        possibilitem, na medida da tecnologia dispon&iacute;vel, a inviolabilidade da rotina
        de pagamentos e transfer&ecirc;ncias. Par&aacute;grafo &uacute;nico - Caso ocorram
        indisponibilidades do servi&ccedil;o regido por este contrato, inclusive aquelas que
        n&atilde;o tenham sido previamente informadas, a CAIXA n&atilde;o se responsabiliza por
        nenhum compromisso assumido pelo cliente perante terceiros, na medida em que o
        Internet Banking CAIXA &eacute; apenas um dos v&aacute;rios canais de auto-atendimento postos
        &agrave; disposi&ccedil;&atilde;o pela CAIXA ao CLIENTE. </p>
        
        <p>&nbsp;</p>
        
        <p>CL&Aacute;USULA 5&ordf; - DAS OBRIGA&Ccedil;&Otilde;ES DO CLIENTE </p>
        
        <p>                O CLIENTE se obriga a: </p>
        
        <p>                I - Utilizar corretamente os servi&ccedil;os e
        canais de acesso disponibilizados pela CAIXA; </p>
        
        <p>                II - Guardar sigilo da sua Assinatura
        Eletr&ocirc;nica, solicitando ou providenciando sua(s) troca(s) sempre que julgar
        necess&aacute;rio ou quando a CAIXA assim o determinar; </p>
        
        <p>                III - Sendo conta de Pessoa Jur&iacute;dica, manter
        o conhecimento da Senha de Transa&ccedil;&atilde;o restrita aos seus leg&iacute;timos
        representantes e prepostos, solicitando ou providenciando sua(s) troca(s)
        sempre que julgar necess&aacute;rio ou quando a CAIXA assim o determinar; </p>
        
        <p>                IV - Comunicar &agrave; Caixa, tempestivamente, a
        mudan&ccedil;a de endere&ccedil;o ou telefone, inclusive de &quot;e-mail&quot; e telefone
        celular, para utilizar os canais que dependam desses dados para acesso aos
        produtos e servi&ccedil;os oferecidos pela CAIXA; </p>
        
        <p>                V - Tratar todos os dados relativos &agrave; sua
        conta com a prote&ccedil;&atilde;o e o zelo necess&aacute;rios, mantendo-os atualizados e
        comprometendo-se a dar adequada utiliza&ccedil;&atilde;o &agrave;s informa&ccedil;&otilde;es disponibilizadas pela
        CAIXA, desobrigando-a de qualquer responsabilidade pela utiliza&ccedil;&atilde;o indevida por
        terceiros; </p>
        
        <p>                VI - Informar com exatid&atilde;o datas de
        vencimentos, valores e benefici&aacute;rios de cr&eacute;ditos; </p>
        
        <p>                VII - Assumir todos os lan&ccedil;amentos efetuados
        em sua conta mediante a utiliza&ccedil;&atilde;o da sua Senha de Transa&ccedil;&atilde;o; </p>
        
        <p>                VIII - Comunicar &agrave; Ag&ecirc;ncia detentora de sua
        conta qualquer diverg&ecirc;ncia apurada na utiliza&ccedil;&atilde;o de servi&ccedil;os, produtos ou
        canais de acesso disponibilizados pela CAIXA; </p>
        
        <p>                IX - Utilizar a op&ccedil;&atilde;o pr&oacute;pria na realiza&ccedil;&atilde;o
        de cada pagamento. </p>
        
        <p>&nbsp;</p>
        
        <p>CL&Aacute;USULA 6&ordf; - DO PRAZO DE DURA&Ccedil;ÃO </p>
        
        <p>                As disposi&ccedil;&otilde;es deste contrato vigorar&atilde;o por
        prazo indeterminado, a partir da ades&atilde;o do CLIENTE. </p>
        
        <p>                Par&aacute;grafo &uacute;nico - A dura&ccedil;&atilde;o do Contrato est&aacute;
        condicionada &agrave; exist&ecirc;ncia da conta do CLIENTE. </p>
        
        <p>&nbsp;</p>
        
        <p>CL&Aacute;USULA 7&ordf; - DAS DISPOSI&Ccedil;&Otilde;ES GERAIS </p>
        
        <p>                O presente contrato integra as Normas de
        Abertura de Conta Corrente, Abertura de Cr&eacute;dito, Aplica&ccedil;&otilde;es Financeiras,
        Poupan&ccedil;a, demais investimentos e servi&ccedil;os banc&aacute;rios e os contratos espec&iacute;ficos
        dos canais de acesso disponibilizados pela CAIXA, os quais s&atilde;o regidos por
        contratos espec&iacute;ficos entre o CLIENTE e a CAIXA e/ou suas Subsidi&aacute;rias. </p>
        
        <p>&nbsp;</p>
        
        <p>CL&Aacute;USULA 8&ordf; - DA RESCISÃO DO CONTRATO </p>
        
        <p>                Ser&aacute; facultada &agrave;s partes a rescis&atilde;o do
        Contrato, a qualquer tempo, mediante comunica&ccedil;&atilde;o formal. </p>
        
        <p>                Par&aacute;grafo 1&ordm; - Constituir&aacute; causa de rescis&atilde;o
        do presente contrato, independentemente de aviso ou interpela&ccedil;&atilde;o, judicial ou
        extrajudicial, respondendo a parte que der causa &agrave; rescis&atilde;o, pelos preju&iacute;zos
        causados &agrave; outra: </p>
        
        <p>                I - O descumprimento das cl&aacute;usulas
        contratuais; </p>
        
        <p>                II - A pr&aacute;tica dolosa de qualquer a&ccedil;&atilde;o ou
        deliberada omiss&atilde;o do CLIENTE. </p>
        
        <p>                Par&aacute;grafo 2&ordm; - O CLIENTE fica respons&aacute;vel
        pelos d&eacute;bitos remanescentes e derivados, a qualquer t&iacute;tulo, do presente
        contrato, em fun&ccedil;&atilde;o da rescis&atilde;o, na forma descrita no Caput desta cl&aacute;usula. </p>
        
        <p>&nbsp;</p>
        
        <p>CL&Aacute;USULA 9&ordf; - DO FORO </p>
        
        <p>                Para dirimir quaisquer quest&otilde;es decorrentes
        deste instrumento, o qual encontra-se devidamente registrado no- 2&ordm; Of&iacute;cio de
        Registro de T&iacute;tulos e Documentos da Cidade de Bras&iacute;lia/DF, sob n&ordm;. 0001188261,
        as partes elegem, com privil&eacute;gio sobre qualquer outro, o foro da Se&ccedil;&atilde;o
        Judici&aacute;ria da Justi&ccedil;a Federal em que o CLIENTE possuir conta na CAIXA.</p>
    </body>
</html>