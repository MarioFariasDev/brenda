const treinos = [
  {
    dia: "DIA 1 – Peito + Tríceps",
    tecnica: "Bi-set + Cadência controlada",
    objetivo: "Força e definição de peitoral e tríceps",
    exercicios: [
      ["Supino reto barra", "4", "8–10", "Bi-set", "Com crucifixo reto"],
      ["Crucifixo reto halteres", "4", "10–12", "Bi-set", "-"],
      ["Supino inclinado halteres", "3", "8–10", "-", "-"],
      ["Crossover polia alta", "3", "12–15", "-", "-"],
      ["Tríceps corda polia", "4", "10–12", "Bi-set", "Com tríceps francês"],
      ["Tríceps francês halteres", "4", "10–12", "Bi-set", "-"],
      ["Mergulho no banco", "3", "12–15", "-", "-"]
    ],
    cardio: "10–15 min esteira leve"
  },
  {
    dia: "DIA 2 – Costas + Bíceps",
    tecnica: "Drop-set (última) + Rest-pause",
    objetivo: "Espessura e força de dorsais e bíceps",
    exercicios: [
      ["Puxada alta frente", "4", "10–12", "Drop-set (última)", "-"],
      ["Remada curvada barra", "4", "8–10", "-", "Costas grossas"],
      ["Remada baixa cabo", "3", "10–12", "-", "-"],
      ["Pull-over na polia", "3", "12–15", "-", "-"],
      ["Rosca direta barra", "4", "8–10", "Rest-pause (última)", "-"],
      ["Rosca alternada halteres", "3", "10–12", "-", "-"],
      ["Rosca martelo corda", "3", "12–15", "-", "-"]
    ],
    cardio: "10 min transport ou escada"
  },
  {
    dia: "DIA 3 – Pernas Completo",
    tecnica: "Pirâmide + Bi-set",
    objetivo: "Hipertrofia de quadríceps, posteriores e glúteos",
    exercicios: [
      ["Agachamento livre", "5", "12/10/8/6/6", "Pirâmide crescente", "-"],
      ["Leg press 45°", "4", "10–12", "Bi-set", "Com cadeira extensora"],
      ["Cadeira extensora", "4", "12–15", "Bi-set", "-"],
      ["Mesa flexora", "4", "10–12", "-", "-"],
      ["Stiff halteres", "4", "8–10", "-", "-"],
      ["Elevação pélvica barra", "4", "10–12", "-", "Contração máxima no topo"],
      ["Panturrilha em pé máquina", "5", "15–20", "-", "-"]
    ],
    cardio: "12–15 min bike leve"
  },
  {
    dia: "DIA 4 – Ombros + Core",
    tecnica: "Tri-set + Resistência",
    objetivo: "Estabilidade, definição e fortalecimento do core",
    exercicios: [
      ["Desenvolvimento halteres", "4", "8–10", "Tri-set", "Com elevação lateral e frontal"],
      ["Elevação lateral halteres", "4", "12–15", "Tri-set", "-"],
      ["Elevação frontal halteres/barra", "4", "12–15", "Tri-set", "-"],
      ["Encolhimento barra/halteres", "4", "12–15", "-", "Trapézio"],
      ["Prancha isométrica", "3", "60s", "-", "-"],
      ["Abdominal infra no banco", "3", "15–20", "-", "-"],
      ["Abdominal oblíquo no cabo", "3", "12–15", "-", "-"]
    ],
    cardio: "10–12 min caminhada inclinada"
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



