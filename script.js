 const treinos = [
  {
    dia: "DIA 1 – PEITO + TRÍCEPS",
    tecnica: "Bi-set + Cadência controlada (3s descida)",
    objetivo: "Força e definição de peitoral e tríceps",
    exercicios: [
      { nome: "Supino reto barra", series: "4x8-10", tecnica: "Bi-set com Crucifixo reto halteres" },
      { nome: "Crucifixo reto halteres", series: "4x10-12", tecnica: "Bi-set" },
      { nome: "Supino inclinado halteres", series: "3x8-10", tecnica: "" },
      { nome: "Crossover polia alta", series: "3x12-15", tecnica: "" },
      { nome: "Tríceps corda polia", series: "4x10-12", tecnica: "Bi-set com Tríceps francês halteres" },
      { nome: "Tríceps francês halteres", series: "4x10-12", tecnica: "Bi-set" },
      { nome: "Mergulho banco", series: "3x12-15", tecnica: "" }
    ]
  },
  {
    dia: "DIA 2 – COSTAS + BÍCEPS",
    tecnica: "Drop-set no final + Rest-pause",
    objetivo: "Espessura e força de dorsais e bíceps",
    exercicios: [
      { nome: "Puxada alta frente barra", series: "4x10-12", tecnica: "Drop-set na última série" },
      { nome: "Remada curvada barra", series: "4x8-10", tecnica: "" },
      { nome: "Remada baixa cabo", series: "3x10-12", tecnica: "" },
      { nome: "Pull-over polia", series: "3x12-15", tecnica: "" },
      { nome: "Rosca direta barra", series: "4x8-10", tecnica: "Rest-pause na última série" },
      { nome: "Rosca alternada halteres", series: "3x10-12", tecnica: "" },
      { nome: "Rosca martelo corda", series: "3x12-15", tecnica: "" }
    ]
  },
  {
    dia: "DIA 3 – PERNAS COMPLETO",
    tecnica: "Pirâmide crescente + Bi-set",
    objetivo: "Força e hipertrofia de quadríceps, posteriores e glúteos",
    exercicios: [
      { nome: "Agachamento livre", series: "5x12-10-8-6-6", tecnica: "Pirâmide crescente" },
      { nome: "Leg press 45°", series: "4x10-12", tecnica: "Bi-set com Cadeira extensora" },
      { nome: "Cadeira extensora", series: "4x12-15", tecnica: "Bi-set" },
      { nome: "Mesa flexora", series: "4x10-12", tecnica: "" },
      { nome: "Stiff halteres", series: "4x8-10", tecnica: "" },
      { nome: "Elevação pélvica barra", series: "4x10-12", tecnica: "" },
      { nome: "Panturrilha em pé máquina", series: "5x15-20", tecnica: "" }
    ]
  },
  {
    dia: "DIA 4 – OMBROS + CORE",
    tecnica: "Tri-set + Resistência",
    objetivo: "Estabilidade, definição e fortalecimento do core",
    exercicios: [
      { nome: "Desenvolvimento halteres", series: "4x8-10", tecnica: "Tri-set com Elevação lateral e Elevação frontal" },
      { nome: "Elevação lateral halteres", series: "4x12-15", tecnica: "Tri-set" },
      { nome: "Elevação frontal barra/halteres", series: "4x12-15", tecnica: "Tri-set" },
      { nome: "Encolhimento barra", series: "4x12-15", tecnica: "" },
      { nome: "Prancha isométrica", series: "3x1min", tecnica: "" },
      { nome: "Abdominal infra banco", series: "3x15-20", tecnica: "" },
      { nome: "Abdominal oblíquo no cabo", series: "3x12-15", tecnica: "" }
    ]
  }
];




const treinoContainer = document.getElementById("treinoContainer");
const progresso = JSON.parse(localStorage.getItem("progresso") || "{}");

treinos.forEach((treino, i) => {
    const card = document.createElement("div");
    card.className = "card";

    let html = `
    <h2>${treino.dia}</h2>
    <p><strong>Técnica:</strong> ${treino.tecnica}</p>
    <p><strong>Objetivo:</strong> ${treino.objetivo}</p>
    <table class="exercise-table">
      <thead>
        <tr>
          <th>✔</th>
          <th>Exercício</th>
          <th>Séries</th>
          <th>Reps</th>
          <th>Técnica</th>
          <th>Obs</th>
          <th>Descanso</th>
        </tr>
      </thead>
      <tbody>
  `;

    treino.exercicios.forEach((ex, j) => {
        const key = `d${i}_e${j}`;
        const checked = progresso[key]?.feito ? "checked" : "";
        const doneClass = progresso[key]?.feito ? "done" : "";

        html += `
      <tr class="exercise-row ${doneClass}" data-key="${key}">
        <td><input type="checkbox" ${checked}></td>
        <td>${ex[0]}</td>
        <td>${ex[1]}</td>
        <td>${ex[2]}</td>
        <td>${ex[3]}</td>
        <td>${ex[4]}</td>
        <td>
          <button class="timer-btn" onclick="iniciarTimer(this)">⏱️</button>
          <span class="timer-display">00:00</span>
        </td>
      </tr>
    `;
    });

    html += `</tbody></table>`;
    if (treino.cardio) html += `<p><strong>Cardio:</strong> ${treino.cardio}</p>`;
    card.innerHTML = html;
    treinoContainer.appendChild(card);
});

document.querySelectorAll(".exercise-row input[type='checkbox']").forEach(input => {
    input.addEventListener("change", function () {
        const row = this.closest(".exercise-row");
        const key = row.dataset.key;
        const feito = this.checked;
        row.classList.toggle("done", feito);
        progresso[key] = { feito };
        localStorage.setItem("progresso", JSON.stringify(progresso));
    });
});

function iniciarTimer(btn) {
    const span = btn.nextElementSibling;
    let tempo = 60;
    span.textContent = formatar(tempo);
    btn.disabled = true;

    const intervalo = setInterval(() => {
        tempo--;
        span.textContent = formatar(tempo);
        if (tempo <= 0) {
            clearInterval(intervalo);
            btn.disabled = false;
            span.textContent = "✔️";
        }
    }, 1000);
}

function formatar(s) {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
}

const feedback = document.getElementById("feedback");
const feedbackSalvo = localStorage.getItem("feedbackGlobal");
if (feedbackSalvo) feedback.value = feedbackSalvo;

document.getElementById("salvarFeedback").addEventListener("click", () => {
    localStorage.setItem("feedbackGlobal", feedback.value);
    alert("Feedback salvo com sucesso!");
});

document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});


