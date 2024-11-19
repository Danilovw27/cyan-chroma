// Manejo del formulario y cálculo
document.getElementById("waterForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener valores
  const numPeople = parseInt(document.getElementById("numPeople").value) || 0;
  const dailyUsage = 150; // Consumo promedio diario por persona
  const laundry = parseInt(document.getElementById("laundry").value) || 0;
  const dishwasher = parseInt(document.getElementById("dishwasher").value) || 0;
  const kitchenWater = parseInt(document.getElementById("kitchenWater").value) || 0;
  const cleaningWater = parseInt(document.getElementById("cleaningWater").value) || 0;

  // Cálculo
  const personalWater = numPeople * dailyUsage * 7; // Consumo semanal
  const laundryWater = laundry * 70; // 70 L por carga
  const dishwasherWater = dishwasher * 12; // 12 L por ciclo
  const total = personalWater + laundryWater + dishwasherWater + (kitchenWater * 7) + cleaningWater;

  // Mostrar resultado en el modal
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  modalContent.innerHTML = `¡Tu consumo semanal de agua es de <span class="text-blue-600 font-bold">${total}</span> litros!`;

  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.add("opacity-100", "scale-100");
    modal.classList.remove("opacity-0", "scale-90");
  }, 50);
});

// Cerrar el modal
document.getElementById("closeModal").addEventListener("click", () => {
  const modal = document.getElementById("modal");

  modal.classList.add("opacity-0", "scale-90");
  modal.classList.remove("opacity-100", "scale-100");

  setTimeout(() => {
    modal.classList.add("hidden");
  }, 300);
});
