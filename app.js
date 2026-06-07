let conc = document.getElementById("conc");
let pend = document.getElementById("pend");
let bconc = document.getElementById("btn-conc");
let bpend = document.getElementById("btn-pend");
let arrowc = document.getElementById("arrow-conc");
let arrowp = document.getElementById("arrow-pend");


bpend.addEventListener("click", function() {
    pend.classList.toggle("hidden");
    arrowp.style.transform = arrowp.style.transform === "rotate(180deg)" ? "" : "rotate(180deg)";
    arrowp.style.transition = "transform 0.3s";
});

bconc.addEventListener("click", function() {
    conc.classList.toggle("hidden");
    arrowc.style.transform = arrowc.style.transform === "rotate(180deg)" ? "" : "rotate(180deg)";
    arrowc.style.transition = "transform 0.3s";
});

let tarefas = [];

function criarTarefa() {
    let task = document.getElementById("task").value;
    
    let novaTarefa = {
        id: Date.now(),
        nome: task,
        categoria: " ",
        prioridade: " ",
        concluida: false,
        criadaEm: Date.now(),
    }
    
    tarefas.push(novaTarefa);

    document.getElementById("task").value = "";

    renderTask();
}

let form = document.getElementById("form");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    criarTarefa();
});

function renderTask() {

    let ulPend = document.getElementById("ulPend");

    ulPend.innerHTML = "";

    tarefas.forEach(function(tarefa) {
        ulPend.innerHTML += `
            <li>${tarefa.nome}</li>
        `;
    });
};
