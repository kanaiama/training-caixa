// scale = function(btn, barra, title) {
//     this.btn = document.getElementById(btn);
//     this.barra = document.getElementById(barra);
//     this.title = document.getElementById(title);
//     this.step = this.barra.getElementsByTagName("DIV")[0];
//     this.init();
// }

// scale.prototype = {
//     init:function() {
//         var f = this, g= document, b = window, m = Math;

//         f.btn.onmousedown = function (e) {
//             var x = (e||b.Event).clientX;
//             var l = this.offsetLeft;
//             var max = f.barra.offsetWidth = this.offsetWidth;

//             g.onmousemove= function(e) {
//                 var thisX = (e||b.Event).clientX;
//                 var to = m.min(max, m.max(-2, l + (thisX-x)));
//                 f.btn.style.left = to + 'px';
//                 f.ondrag(m.round(m.max(0,to/max)*100), to);
//                 b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
//             };
//             g.onmouseup = new Function('this.nmusemve=null');
//         };
//     },
//     ondrag: function(pos,x) {
//         this.step.style.width= Math.max(0,x) +'px';
//         this.title.innerHTML = pos+'%';
//     }
// }

// new scale ('btn', 'barra', 'title');