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
        const corPrioridade = tarefa.prioridade === 'alta' ? '#c0392b' : tarefa.prioridade === 'media' ? '#c7a24a' : '#8f98a3';
        ulPend.innerHTML += `
            <li style="display:flex; align-items:center; gap:12px; padding:14px 24px; border-bottom:1px solid var(--color-border);">
                <button onclick="completarTarefa(${tarefa.id})" style="width:20px; height:20px; border-radius:50%; border:2px solid var(--color-accent); background:transparent; cursor:pointer; flex-shrink:0; transition: background 0.2s;" onmouseover="this.style.background='var(--color-accent)'" onmouseout="this.style.background='transparent'"></button>
                <div style="flex:1; min-width:0;">
                    <p style="color:var(--color-text); font-size:0.9rem;">${tarefa.nome}</p>
                    <span style="color:var(--color-muted); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em;">${tarefa.categoria}</span>
                </div>
                <span style="width:8px; height:8px; border-radius:50%; background:${corPrioridade}; flex-shrink:0;"></span>
                <button onclick="deletarTarefa(${tarefa.id})" style="color:var(--color-muted); background:transparent; border:none; cursor:pointer; font-size:1rem; flex-shrink:0; opacity:0.5;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.5'">✕</button>
            </li>
        `;
    });

     let tarefasConcluidas = tarefas.filter(tarefa => tarefa.concluida === true);

     tarefasConcluidas.forEach(function(tarefa) {
        ulConc.innerHTML += `
            <li style="display:flex; align-items:center; gap:12px; padding:14px 24px; border-bottom:1px solid var(--color-border); opacity:0.5;">
                <button disabled style="width:20px; height:20px; border-radius:50%; border:2px solid var(--color-accent); background:var(--color-accent); cursor:default; flex-shrink:0; display:flex; align-items:center; justify-content:center; color:var(--color-bg); font-size:0.7rem;">✓</button>
                <div style="flex:1; min-width:0;">
                    <p style="color:var(--color-text); font-size:0.9rem; text-decoration:line-through;">${tarefa.nome}</p>
                    <span style="color:var(--color-muted); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em;">${tarefa.categoria}</span>
                </div>
                <button onclick="deletarTarefa(${tarefa.id})" style="color:var(--color-muted); background:transparent; border:none; cursor:pointer; font-size:1rem; flex-shrink:0; opacity:0.5;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.5'">✕</button>
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

function calcularProgressoDia() {
    const agora = new Date();

    const horas = agora.getHours();
    const minutos = agora.getMinutes();
    const segundos = agora.getSeconds();

    const segundosPassados = (horas * 3600) + (minutos * 60) + segundos;
    const totalSegundosDia = 86400;

    const porcentagem = (segundosPassados / totalSegundosDia) * 100;

    const segundosRestantes = totalSegundosDia - segundosPassados;
    const hRestantes = Math.floor(segundosRestantes / 3600);
    const mRestantes = Math.floor((segundosRestantes % 3600) / 60);
    const sRestantes = segundosRestantes % 60;

    const pad = (num) => String(num).padStart(2, '0');
    const relogioRegressivo = `${pad(hRestantes)}:${pad(mRestantes)}:${pad(sRestantes)}`;

    return {
        porcentagem: parseFloat(porcentagem.toFixed(1)),
        restante: relogioRegressivo
    };
}

function atualizarBarraNaTela() {
    const dados = calcularProgressoDia();
    const barra = document.getElementById("barra-dia");
    const textoTempo = document.getElementById("tempo-restante");

    if (barra) {
        barra.style.width = dados.porcentagem + "%";
    }

    if (textoTempo) {
        textoTempo.innerText = `${dados.restante}`;
    }
}

atualizarBarraNaTela();

setInterval(atualizarBarraNaTela, 1000);

