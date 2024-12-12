document.getElementById("waterForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener valores del formulario
  const numPeople = parseInt(document.getElementById("numPeople").value) || 0;
  const laundry = parseInt(document.getElementById("laundry").value) || 0;
  const cleaningWater = parseInt(document.getElementById("cleaningWater").value) || 0;
  const flushesPerPerson = parseInt(document.getElementById("flushesPerPerson").value) || 0;
  const carWash = parseInt(document.getElementById("carWash").value) || 0;

  // Cálculo dinámico del tiempo de ducha
  let totalShowerWater = 0;
  const showerFields = document.querySelectorAll('.shower-time');
  showerFields.forEach((field) => {
    const showerTime = parseInt(field.value) || 0;
    totalShowerWater += showerTime * 10 * 7; // 10 litros/minuto * 7 días
  });

  // Cálculos adicionales
  const laundryWater = laundry * 70; // 70 litros por carga
  const cleaningWeeklyWater = cleaningWater; // Limpieza semanal ingresada
  const toiletWater = numPeople * flushesPerPerson * 10 * 7; // 10 litros por descarga * 7 días
  const carWashWater = carWash * 150 / 4; // 150 litros por lavado 

  // Cálculo total semanal y mensual
  const totalWeeklyWater =
    totalShowerWater + laundryWater + cleaningWeeklyWater + toiletWater + carWashWater;
  const totalMonthlyWater = (totalWeeklyWater * 4).toFixed(2);

  // Clasificación personalizada según el número de personas
  const low = 800 * numPeople; 
  const high = 1100 * numPeople; 

  let classification = "";
  let recommendation = "";
  if (totalWeeklyWater < low) {
    classification = "Consumo bajo";
    recommendation = "Estás ahorrando agua. ¡Sigue así!";
  } else if (totalWeeklyWater <= high) {
    classification = "Consumo promedio";
    recommendation = "Estás en el rango promedio. Podrías reducir un poco más si es posible.";
  } else {
    classification = "Consumo alto";
    recommendation = "Intenta optimizar tus hábitos para ahorrar más agua.";
  }

  // Mostrar resultados en el modal
  document.getElementById("modalContent").innerHTML = `
    <h3 class="text-xl font-bold text-center">${classification}</h3>
    <p class="text-lg mt-4">Tu consumo mensual estimado es de <strong>${totalMonthlyWater} litros</strong>.</p>
    <p class="text-lg mt-4">Tu consumo semanal estimado es de <strong>${totalWeeklyWater.toFixed(
      2
    )} litros</strong>.</p>
    <p class="mt-2">${recommendation}</p>
    <p class="mt-4">
      <strong>Detalles:</strong><br>
      Personas: ${numPeople} (Duchas: ${totalShowerWater} litros)<br>
      Lavadora: ${laundry} cargas (${laundryWater} litros)<br>
      Limpieza: ${cleaningWeeklyWater} litros/semana<br>
      Inodoro: ${toiletWater} litros/semana<br>
      Lavado de vehículos: ${carWashWater.toFixed(2)} litros/semana<br>
    </p>
  `;
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("modal").classList.add("opacity-100", "scale-100");
});

// Generar campos dinámicos para duchas
document.getElementById("numPeople").addEventListener("input", function () {
  const numPeople = parseInt(this.value) || 0;
  const showerContainer = document.getElementById("showerTimes");
  showerContainer.innerHTML = ""; // Limpiar campos anteriores

  for (let i = 1; i <= numPeople; i++) {
    const field = document.createElement("div");
    field.className = "mt-2";
    field.innerHTML = `
      <label class="block text-sm font-medium text-gray-700">Tiempo de ducha (minutos) - Persona ${i}:</label>
      <input type="number" class="shower-time mt-1 p-2 block w-full border rounded-lg" min="0" placeholder="Ej. 10" />
    `;
    showerContainer.appendChild(field);
  }
});

// Cerrar modal
document.getElementById("closeModal").addEventListener("click", function () {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  modal.classList.remove("opacity-100", "scale-100");
});

// Depuración
document.getElementById("calculateButton").addEventListener("click", function () {
  console.log("Botón 'Calcular' clickeado");
});
