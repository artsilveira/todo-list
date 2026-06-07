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

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

renderTask();

function criarTarefa() {
    let task = document.getElementById("task").value;
    let categ = document.getElementById("categoria").value;
    let prior = document.getElementById("prioridade").value;
    
    let novaTarefa = {
        id: Date.now(),
        nome: task,
        categoria: categ,
        prioridade: prior,
        concluida: false,
        criadaEm: Date.now(),
    }
    
    tarefas.push(novaTarefa);

    document.getElementById("task").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("prioridade").value = "";

    renderTask();
    salvarTarefas();
}

let form = document.getElementById("form");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    criarTarefa();
});

function renderTask() {

    let ulPend = document.getElementById("ulPend");
    let ulConc = document.getElementById("ulConc");
    ulPend.innerHTML = "";
    ulConc.innerHTML = "";

    let tarefasPendentes = tarefas.filter(tarefa => tarefa.concluida === false);

    tarefasPendentes.forEach(function(tarefa) {
        ulPend.innerHTML += `
            <li>
                <button onclick="completarTarefa(${tarefa.id})">○</button>
                ${tarefa.nome} - ${tarefa.categoria} - ${tarefa.prioridade}
                <button onclick="deletarTarefa(${tarefa.id})" style="color: red; margin-left: 10px;">❌</button>
            </li>
        `;
    });

     let tarefasConcluidas = tarefas.filter(tarefa => tarefa.concluida === true);

     tarefasConcluidas.forEach(function(tarefa) {
        ulConc.innerHTML += `
            <li>
                <button disabled style="text-decoration: line-through; opacity: 0.6;">✓</button>
                <span style="text-decoration: line-through; opacity: 0.6;">
                    ${tarefa.nome} - ${tarefa.categoria} - ${tarefa.prioridade}
                </span>
                <button onclick="deletarTarefa(${tarefa.id})" style="color: red; margin-left: 10px;">❌</button>
            </li>
        `;
    });

};

function completarTarefa(id) {
    let tarefaEncontrada = tarefas.find(tarefa => tarefa.id === id);

     if (tarefaEncontrada) {
        tarefaEncontrada.concluida = true;
        renderTask();
        salvarTarefas();
    }

}

function salvarTarefas() {

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function deletarTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    renderTask();
    salvarTarefas();
}