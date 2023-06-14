const mustache = require('mustache')


var view = {
    title: 'Teste',
    calc: function() {
        return 4+2;
    }
}

var render = mustache.render("Olá, este é o titulo {{title}} e o valor é {{calc}}", view);

console.log(render);    