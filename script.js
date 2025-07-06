const treinos = [
  {
    dia: "✅ DIA 1 – Segunda (Academia – Inferiores + Glúteos)",
    tecnica: "Bi-set com carga + cadência controlada",
    objetivo: "Estímulo de glúteos, posterior e quadríceps",
    exercicios: [
      ["Agachamento livre", "4", "10-12", "Bi-set", "Com Cadeira extensora"],
      ["Cadeira extensora", "4", "15", "Bi-set", "Cadência 2:2"],
      ["Leg press 45°", "3", "12", "Bi-set", "Com avanço no smith"],
      ["Avanço no smith", "3", "10 cada perna", "Bi-set", "Atenção à postura"],
      ["Mesa flexora", "3", "12-15", "-", "Isolamento posterior"],
      ["Elevação de quadril com barra", "3", "12", "-", "Glúteo máximo"],
      ["Abdução sentada", "3", "20", "-", "Finalização de glúteo"]
    ]
  },

  {
    dia: "✅ DIA 2 – Terça (Casa – Full Body Funcional)",
    tecnica: "Circuito funcional com Bi-set",
    objetivo: "Manter estímulo metabólico no plantão",
    exercicios: [
      ["Agachamento + Desenvolvimento com garrafa", "3", "15", "Bi-set", "Pode usar mochila ou água como carga"],
      ["Flexão com joelhos + Remada com mochila", "3", "12", "Bi-set", "Força e coordenação"],
      ["Passada alternada + Prancha com toques", "3", "12 cada + 30s", "Bi-set", "Estabilização ativa"],
      ["Abdominal infra + Bicicleta no solo", "3", "20", "Bi-set", "Core completo"]
    ],
    cardio: "3 min de polichinelo, corrida no lugar e agachamento com salto (30s cada, 2 rodadas)"
  },

  {
    dia: "✅ DIA 3 – Quarta (Academia – Superiores + Core)",
    tecnica: "Bi-set + Isolamentos",
    objetivo: "Fortalecer braços, costas, ombros e abdômen",
    exercicios: [
      ["Puxada frente + Rosca direta", "3", "12", "Bi-set", "Costas + bíceps"],
      ["Desenvolvimento máquina + Elevação lateral", "3", "12 + 15", "Bi-set", "Ombros"],
      ["Tríceps pulley + Rosca martelo", "3", "12", "Bi-set", "Braços"],
      ["Remada baixa máquina", "3", "12", "-", "Controle da execução"],
      ["Prancha com joelhos no solo", "3", "30s", "-", "Estabilidade"],
      ["Abdominal no banco inclinado", "3", "20", "-", "Parte inferior ativa"]
    ]
  },

  {
    dia: "✅ DIA 4 – Quinta (Casa – Core + Cardio HIIT)",
    tecnica: "HIIT abdominal",
    objetivo: "Queima calórica + definição abdominal",
    exercicios: [
      ["Prancha com toques", "3", "30 seg", "Circuito", "Core + ombros"],
      ["Mountain climber", "3", "30 seg", "-", "Foco na respiração"],
      ["Bicicleta abdominal", "3", "20 reps", "-", "Movimento controlado"],
      ["Burpee sem salto", "3", "30 seg", "-", "Cardio intenso"],
      ["Abdominal infra com perna estendida", "3", "20", "-", "Abdômen inferior"]
    ],
    cardio: "Finalize com 2 min de corrida parada + polichinelo"
  },

  {
    dia: "✅ DIA 5 – Sexta (Academia – Inferiores + Abdômen)",
    tecnica: "Bi-set + pausa curta",
    objetivo: "Dar ênfase em glúteos e core para final da semana",
    exercicios: [
      ["Cadeira abdutora + Elevação pélvica máquina", "3", "20 + 15", "Bi-set", "Queima glúteo"],
      ["Leg press + Stiff com halteres", "3", "12 + 12", "Bi-set", "Posterior + quadríceps"],
      ["Avanço com step + Passada reversa", "3", "10 cada perna", "Bi-set", "Estabilidade"],
      ["Abdominal na polia alta", "3", "15", "-", "Resistência"],
      ["Prancha frontal + Abdominal canivete", "3", "30 seg + 20 reps", "Bi-set", "Finalização de core"]
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
