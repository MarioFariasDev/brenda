const treinos = [
  {
    dia: "DIA 1 – Inferiores (Glúteos + Posterior)",
    tecnica: "Bi-set + Cadência",
    objetivo: "Foco em glúteos e posteriores com ativação total",
    exercicios: [
      ["Stiff com barra", "4", "10–12", "Bi-set", "Com mesa flexora"],
      ["Mesa flexora", "4", "12–15", "Bi-set", "Cadência 2:2"],
      ["Agachamento com halteres", "3", "10", "-", "Carga moderada"],
      ["Glúteo no cabo", "3", "15 cada perna", "-", "Movimento controlado"],
      ["Abdução máquina", "3", "20", "Rest-pause", "Última até falha"],
      ["Elevação pélvica com barra", "3", "12", "-", "Contração máxima"],
      ["Abdominal infra + prancha", "3", "20 + 30s", "Bi-set", "Core ativo"]
    ],
    cardio: "10 a 15 min esteira ou escada leve"
  },
  {
    dia: "DIA 2 – Superiores (Costas + Bíceps + Ombros)",
    tecnica: "Bi-set",
    objetivo: "Fortalecer membros superiores com estímulo metabólico",
    exercicios: [
      ["Puxada frente", "3", "12", "Bi-set", "Com remada curvada"],
      ["Remada curvada", "3", "12", "Bi-set", "Costas grossas"],
      ["Rosca direta barra", "3", "12", "-", "Bíceps cheio"],
      ["Rosca alternada", "3", "10 cada", "-", "Foco unilateral"],
      ["Elevação lateral + frontal", "3", "15 + 12", "Bi-set", "Ombros 3D"],
      ["Encolhimento com halteres", "3", "15", "-", "Trapézio"],
      ["Abdominal remador", "3", "20", "-", "Core superior"]
    ],
    cardio: "10 min escada ou transport"
  },
  {
    dia: "DIA 3 – Inferiores (Quadríceps + Core)",
    tecnica: "Bi-set + Cadência",
    objetivo: "Ênfase em quadríceps e core com foco técnico",
    exercicios: [
      ["Agachamento no smith", "4", "10–12", "Bi-set", "Com cadeira extensora"],
      ["Cadeira extensora", "4", "15", "Bi-set", "Pausa de 1s no topo"],
      ["Leg press 45°", "3", "12", "-", "Descida lenta"],
      ["Avanço com step", "3", "10 cada", "-", "Equilíbrio e ativação"],
      ["Abdutora sentada", "3", "20", "Rest-pause", "Glúteo médio"],
      ["Prancha com elevação de perna", "3", "30s", "-", "Core e glúteo"],
      ["Abdominal na polia alta", "3", "15", "-", "Abdômen força"]
    ],
    cardio: "15 min esteira leve ou escada"
  },
  {
    dia: "DIA 4 – Peito + Tríceps + Abdômen",
    tecnica: "Bi-set + Isolamentos",
    objetivo: "Fortalecer peitoral e braços com definição",
    exercicios: [
      ["Supino reto máquina", "3", "12", "Bi-set", "Com crucifixo reto"],
      ["Crucifixo reto com halteres", "3", "15", "Bi-set", "Alongamento controlado"],
      ["Tríceps pulley com corda", "3", "15", "-", "Definição de braço"],
      ["Tríceps testa barra W", "3", "12", "-", "Amplitude total"],
      ["Elevação lateral inclinada", "3", "15", "-", "Ombros posteriores"],
      ["Abdominal oblíquo com halter", "3", "20 cada lado", "-", "Cintura ativa"],
      ["Prancha frontal", "3", "30 seg", "-", "Core final"]
    ],
    cardio: "Bike ou esteira 15 min"
  },
  {
    dia: "DIA 5 – Glúteo + Full Body Metabólico",
    tecnica: "Bi-set + Funcional",
    objetivo: "Encerrar a semana com estímulo geral e glúteo",
    exercicios: [
      ["Cadeira abdutora", "3", "20", "Bi-set", "Com glúteo no cabo"],
      ["Glúteo no cabo", "3", "15", "Bi-set", "-"],
      ["Elevação pélvica unilateral", "3", "10 cada", "-", "Glúteo foco"],
      ["Agachamento com salto", "3", "15", "-", "Peso corporal"],
      ["Remada baixa", "3", "12", "Bi-set", "Com rosca martelo"],
      ["Rosca martelo", "3", "12", "Bi-set", "-"],
      ["Passada com halteres", "3", "10", "Bi-set", "Com desenvolvimento ombro"],
      ["Desenvolvimento ombro", "3", "12", "Bi-set", "-"],
      ["Abdominal bicicleta", "3", "30 reps", "-", "Core final"]
    ],
    cardio: "15 min escada ou escadaria"
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
