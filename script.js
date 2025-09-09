const treinos = [
  {
    dia: "DIA 1 – Peito + Tríceps",
    tecnica: "Bi-set + Drop-set",
    objetivo: "Força e resistência no peitoral e tríceps",
    exercicios: [
      ["Supino inclinado barra", "4", "8–10", "Bi-set", "Com crucifixo inclinado"],
      ["Crucifixo inclinado halteres", "4", "10–12", "Bi-set", "-"],
      ["Supino reto halteres", "3", "10–12", "-", "-"],
      ["Peck deck máquina", "3", "12–15", "Drop-set (última)", "-"],
      ["Tríceps testa barra", "4", "10–12", "-", "-"],
      ["Tríceps corda polia", "3", "12–15", "-", "-"],
      ["Flexão de braço", "3", "máx", "-", "Finalização"]
    ],
    cardio: "10 min bike leve"
  },
  {
    dia: "DIA 2 – Costas + Bíceps",
    tecnica: "Super-set + Rest-pause",
    objetivo: "Fortalecer dorsais e melhorar puxada",
    exercicios: [
      ["Puxada pronada frente", "4", "10–12", "Super-set", "Com remada unilateral"],
      ["Remada unilateral halteres", "4", "10–12", "Super-set", "-"],
      ["Remada curvada barra", "4", "8–10", "-", "-"],
      ["Puxada triângulo polia", "3", "10–12", "-", "-"],
      ["Rosca direta barra W", "4", "8–10", "Rest-pause", "-"],
      ["Rosca alternada supinação", "3", "10–12", "-", "-"],
      ["Rosca martelo banco inclinado", "3", "12–15", "-", "-"]
    ],
    cardio: "12 min transport"
  },
  {
    dia: "DIA 3 – Pernas (Glúteos + Quadríceps)",
    tecnica: "Pirâmide + Bi-set",
    objetivo: "Hipertrofia e modelagem de pernas",
    exercicios: [
      ["Agachamento Smith", "5", "12/10/8/6/6", "Pirâmide", "-"],
      ["Leg press horizontal", "4", "10–12", "Bi-set", "Com passada estática"],
      ["Passada estática Smith", "4", "12 cada perna", "Bi-set", "-"],
      ["Cadeira extensora", "3", "12–15", "-", "-"],
      ["Cadeira abdutora", "4", "15–20", "-", "-"],
      ["Panturrilha sentado", "5", "15–20", "-", "-"]
    ],
    cardio: "10 min escada"
  },
  {
    dia: "DIA 4 – Ombros + Core",
    tecnica: "Tri-set + Resistência",
    objetivo: "Definição de ombros e abdômen",
    exercicios: [
      ["Desenvolvimento militar barra", "4", "8–10", "Tri-set", "Com lateral e frontal"],
      ["Elevação lateral halteres", "4", "12–15", "Tri-set", "-"],
      ["Elevação frontal polia", "4", "12–15", "Tri-set", "-"],
      ["Elevação posterior peck deck", "3", "12–15", "-", "Deltoide posterior"],
      ["Prancha com elevação de perna", "3", "30s cada perna", "-", "-"],
      ["Abdominal na polia alta", "3", "15–20", "-", "-"],
      ["Abdominal bicicleta", "3", "30s", "-", "-"]
    ],
    cardio: "10 min corrida leve"
  },
  {
    dia: "DIA 5 – Pernas Posterior + HIIT",
    tecnica: "Bi-set + Drop-set",
    objetivo: "Ênfase em posteriores, glúteos e gasto calórico",
    exercicios: [
      ["Levantamento terra sumô", "4", "8–10", "-", "-"],
      ["Mesa flexora", "4", "10–12", "Bi-set", "Com glúteo máquina"],
      ["Glúteo máquina", "4", "12–15", "Bi-set", "-"],
      ["Hip thrust barra", "4", "12–15", "Drop-set (última)", "-"],
      ["Stiff halteres", "3", "10–12", "-", "-"],
      ["Avanço dinâmico halteres", "3", "12 cada perna", "-", "-"],
      ["Burpee", "3", "12", "-", "Final cardio"]
    ],
    cardio: "15–20 min HIIT esteira (30s corrida / 1min caminhada)"
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





