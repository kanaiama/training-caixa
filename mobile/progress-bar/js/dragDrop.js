// const bola = document.querySelector(".bola");
// const checks = document.querySelectorAll(".checkpoint");

// console.log(checks, bola);

// bola.addEventListener("dragstart", dragStart);

// checks.forEach(box => {
//     box.addEventListener('dragover', dragOver);
//     box.addEventListener('drop', dropEvent);
//     box.addEventListener('dragleave', dragLeave);
// }) 

// function dragStart(e) {
//     e.dataTransfer.setData('text/plan', e.target.innerText);
//     console.log(this);
//     setTimeout(() => {
//         this.className = 'invisble';
//     }, 0)
// }

// function dragOver(e) {
//     e.preventDefault();
//     console.log("Dragging over");

//     this.className += ' enter';
// }

// function dropEvent(e) {
//     e.preventDefault();
//     console.log("Dropping");

//     const el = document.createElement('p');
//     el.className = "bola";
//     el.innerText = e.dataTransfer.getData('text');

//     this.appendChild(el); 
// }

// function dragLeave(e) {
//     e.preventDefault();
    
//     this.className = 'checkpoint';
// }