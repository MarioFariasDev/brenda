  const treinos = [
  {
    dia: "DIA 1 – Full Body (Glúteo + Posterior + Superior)",
    tecnica: "Bi-set + Isometria",
    objetivo: "Trabalhar grandes grupos musculares com foco em glúteos e força geral",
    exercicios: [
      ["Stiff com halteres + Cadeira flexora", "3", "12 + 12", "Bi-set e cadência lenta"],
      ["Puxada frente + Remada curvada", "3", "12 + 12", "Bi-set costas"],
      ["Elevação pélvica com barra", "4", "12", "Isometria 15s no final"],
      ["Desenvolvimento halteres + Elevação lateral", "3", "12 + 15", "Bi-set ombro"],
      ["Prancha frontal", "3", "40s", "Core ativo"]
    ]
  },
  {
    dia: "DIA 2 – Full Body (Quadríceps + Glúteo + Core)",
    tecnica: "Pirâmide + Rest-pause",
    objetivo: "Dar estímulo completo para inferiores e core",
    exercicios: [
      ["Agachamento guiado", "4", "15/12/10/8", "Carga crescente"],
      ["Cadeira extensora", "3", "15", "3s na contração"],
      ["Afundo no Smith", "3", "12 cada perna", "Controle total"],
      ["Glúteo no cabo", "3", "15 cada", "Pausa de 1s no topo"],
      ["Abdominal infra", "3", "20", "Core reto"]
    ]
  },
  {
    dia: "DIA 3 – Full Body Metabólico",
    tecnica: "Circuito + Drop-set",
    objetivo: "Gasto calórico alto e manutenção da força",
    exercicios: [
      ["Agachamento com salto", "3", "15", "Explosão"],
      ["Flexão de braço", "3", "12", "Controle"],
      ["Remada baixa + Rosca martelo", "3", "12 + 12", "Bi-set upper"],
      ["Cadeira abdutora", "3", "15 + 10 + 10", "Drop-set glúteo"],
      ["Mountain climber", "3", "30s", "Core + cardio"]
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

