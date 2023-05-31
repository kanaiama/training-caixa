define([ "statics-core/js/core/log",
    'statics-components/js/componentes/messageBox/messageBox',
    'messages!',
    'statics-core/js/core/mobileUtil',
    'statics-core/js/ranecc_v601/ranecc_v601',], function(log,Message, messages, mobileUtil) {
    var senhaConta = {
        dadosCriptografia: {},
        msg: new Message(),
        events : {
            "load" : "loadPage",
            "click #btnContinuar" : "gerarChave",
            "click #btnVoltar" : "voltar",
        },
        getFieldPassword: function(){
            var idPsw;
            if(!Password.prototype.isDV && !mobileUtil.isMobile()){
                idPsw = "#password";
            }else{
                idPsw = "#passworddv";
            }
            return $(idPsw);
        },
        loadPage: function () {
            console.log(this.op)
            this.isDeficienteVisual();
            new AjaxNB('/sinbc-pix/nb/criptografia-senhas/parametros-publicos').asJson().get(
                $.proxy(this.dadosPublico, this), $.proxy(this.falha, this));
            this.addEventos();
        },
        passwordValidado: function() {
            var psw = this.getFieldPassword().val();
            if(psw.trim() === "") {
                this.msg.showMessageError("", messages["validation.exists.password"], this.passwordTextName());
                //REGISTRAR ERROR
                $('#passErrorAcess').val('true');

                return false;
            } else if (psw.trim().length < 4 ) {
                this.msg.showMessageError("", messages["validation.lenght.password"], this.passwordTextName());
                //REGISTRAR ERROR
                $('#passErrorAcess').val('true');

                return false;
            }
            //Foi retirada daqui a validação de senha de acesso, pois é para validar apenas na criação

            return true;
        },
        passwordTextName : function() {
            if(!Password.prototype.isDV && !mobileUtil.isMobile()) {
                return 'password';
            } else {
                return 'passworddv';
            }
        },

        dadosPublico: function(dados) {
            this.dadosCriptografia = dados;
        },

        gerarChave: function() {

            if (this.passwordValidado()) {

                try {
                    var result = window.ecPin(this.getFieldPassword().val(), this.dadosCriptografia.pan, this.dadosCriptografia.dadosPublicos, this.dadosCriptografia.saltRequisicao);

                    dados = {
                        idAlgoritmo : result.algorithmId,
                        mac : result.hmac,
                        partVId : result.partVId,
                        criptograma : result.cryptogram,
                        pan: this.dadosCriptografia.pan,
                        x : result.x,
                        y: result.y
                    }
                    return dados;
                }catch (e) {
                   return e;
                }
            }
        },
        addEventos : function() {
            this.isDeficienteVisual();
            $("#passworddv").off().on('keydown', function(event){
                senhaConta.prototype.pressionadoEnter(event);
            });
            $('#password').off().on({
                cut: function(e) {
                    e.preventDefault();
                }, copy: function(e) {
                    e.preventDefault();
                }, paste: function(e) {
                    e.preventDefault();
                }, keydown: function(e){
                    senhaConta.prototype.fntNaoDeficiente(e);
                }
            });
            $("#btnConfirmar").off().on('click', function(event){
                senhaConta.prototype.gerarChave(event);
            });

            new AjaxNB('/sinbc-pix/nb/criptografia-senhas/parametros-publicos').asJson().get(
                $.proxy(this.dadosPublico, this), $.proxy(this.falha, this));

        },
        falha : function(data) {
            confirmaChave.prototype.postPage("/sinbc/nb/login/errorPageHandler", {
                view : data.view,
                urlReturn : data.urlReturn,
                tituloPaginaErro : data.tituloPaginaErro,
                mensagemPaginaErro : data.mensagemPaginaErro
            });

        },
        pressionadoEnter : function(e){
            if((e.which == 13 || e.keyCode == 13) && (senhaConta.prototype.isDV || mobileUtil.isMobile())){
                this.publish("/senha/validar", value);
            }
        },
        fntNaoDeficiente : function(e) {
            if(!mobileUtil.isMobile()) {
                if((e.which != 13 || e.keyCode != 13) && (e.which !== undefined)){
                    $('#password').val("");
                    $('#password').focus();
                    alert("Para sua maior segurança, é obrigatório utilizar o teclado virtual.");
                    e.preventDefault();
                }else{
                    return false;
                }
            }
        },
        getFieldPassword: function(){
            var idPsw;
            if(!confirmaChave.prototype.isDV && !mobileUtil.isMobile()){
                idPsw = "#password";
            }else{
                idPsw = "#passworddv";
            }
            return $(idPsw);
        },
        isDeficienteVisual: function() {
            new AjaxNB('/sinbc/nb/login/getValidAcessTablet').asJson().get(
                $.proxy(this.getValidAcessTabletResponse, this), $.proxy(this.erroGetValidAcessTablet, this));
        },
        getValidAcessTabletResponse : function(data){

            confirmaChave.prototype.isDV = data.isUserDeficVisual === 'true' ? true : false;
            confirmaChave.prototype.acessoTablet = data.acessoTablet === 'true' ? true : false;
            //confirmaChave.prototype.isOutorgado = $('#userOutorgado').val() === 'true' ? true : false;

            if( !confirmaChave.prototype.isDV ){
                if(mobileUtil.isMobile()){
                    $('#simDV').css("display","block");
                }else {
                    $('#contentTeclado').css("display","block");
                    $('#naoDV').css("display","block");
                }
            }else if( confirmaChave.prototype.isDV ) {
                $('#simDV').css("display","block");
            }

            if(!confirmaChave.prototype.isDV){
                $('#password').focus();
                $("body").attr("style", "");
            }else{
                var $campoPsw = this.getFieldPassword();
                $campoPsw.focus();
                $("body").attr("style", "");
            }

        },
        erroGetValidAcessTablet : function (data) {
            console.log(data);
        }
    };

    return senhaConta;
});
