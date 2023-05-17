// Obtener referencia a los elementos del formulario
const form = document.getElementById('ageCalculatorForm');
const calculateButton = document.getElementById('calculateButton');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const yearsInput = document.getElementById('years');
const monthsInput = document.getElementById('months');
const daysInput = document.getElementById('days');
const error = document.getElementById("errorMessage")
const error2 = document.getElementById("errorMessage2")
const error3 = document.getElementById("errorMessage3")
const alert = document.getElementById("alertMessage")

// Agregar evento de escucha al botón
calculateButton.addEventListener('click', calculateAge);

// Función para calcular la edad
function calculateAge(event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

  // evitar vacios en el form
  let dayEmpty = dayInput.value;
  let monthEmpty = monthInput.value;
  let yearEmpty = yearInput.value;
    if(dayEmpty === "" || monthEmpty === "" || yearEmpty === ""){
      event.preventDefault()
      error.style.display= 'block'
      error2.style.display= 'block'
      error3.style.display= 'block'
      alert.style.display = 'block'
    }else{
      error.style.display= 'none'
      error2.style.display= 'none'
      error3.style.display= 'none'
      alert.style.display = 'none'
    }

  // Obtener los valores de día, mes y año
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  // Obtener la fecha actual
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript son base 0
  const currentDay = currentDate.getDate();

  // Validar el día ingresado
  const isValidDay = validateDay(day, month, year);

  if (!isValidDay) {
    // Resaltar el borde en rojo si el día no es válido
    dayInput.style.borderColor = 'red';
    monthInput.style.borderColor = 'red';
    yearInput.style.borderColor = 'red';
    daysInput.value = '--';
    monthsInput.value = '--';
    yearsInput.value = '--';
    return; // Detener el cálculo de la edad si el día no es válido
  } else {
    // Restaurar el color de borde predeterminado si el día es válido
    dayInput.style.borderColor = '';
    monthInput.style.borderColor = '';
    yearInput.style.borderColor = '';
  }
  // validar year
  const isValidYear = validateYear()

  if(!isValidYear){
    dayInput.style.borderColor = 'red';
    monthInput.style.borderColor = 'red';
    yearInput.style.borderColor = 'red';
    daysInput.value = '--';
    monthsInput.value = '--';
    yearsInput.value = '--';
    return; // Detener el cálculo de la edad si el día no es válido
  } else {
    // Restaurar el color de borde predeterminado si el día es válido
    dayInput.style.borderColor = '';
    monthInput.style.borderColor = '';
    yearInput.style.borderColor = '';
  }

  // validar Mes

   const isValidMonth = validateMonths()

  if(!isValidMonth){
    dayInput.style.borderColor = 'red';
    monthInput.style.borderColor = 'red';
    yearInput.style.borderColor = 'red';
    daysInput.value = '--';
    monthsInput.value = '--';
    yearsInput.value = '--';
    return; // Detener el cálculo de la edad si el día no es válido
  } else {
    // Restaurar el color de borde predeterminado si el día es válido
    dayInput.style.borderColor = '';
    monthInput.style.borderColor = '';
    yearInput.style.borderColor = '';
  }
  // Calcular la edad
  let years = currentYear - year;
  let months = currentMonth - month;
  let days = currentDay - day;

  // Ajustar la edad si los meses o días son negativos
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months = 12 - Math.abs(months);
    if (days < 0) {
      const lastMonthDate = new Date(currentYear, currentMonth - 1, 0).getDate();
      days = lastMonthDate - Math.abs(days) + 1; // Sumar 1 para compensar el día extra
    }
  } else if (days < 0) {
    const lastMonthDate = new Date(currentYear, currentMonth - 1, 0).getDate();
    days = lastMonthDate - Math.abs(days) + 1; // Sumar 1 para compensar el día extra
  }
  


  // Mostrar la edad en los inputs correspondientes
  yearsInput.value = years <= 0 ? '--' : years;
  monthsInput.value = months 
  daysInput.value = days 
}

// mensaje de error
dayInput.addEventListener('input',function(){
  let value = parseInt(dayInput.value);
  if(isNaN(value) || value <= 0 || value > 31){
    error.style.display= 'block';
  }else{
    error.style.display = 'none'
  }
})

monthInput.addEventListener('input', function(){
  let value = parseInt(monthInput.value);
  if(isNaN(value) || value <= 0 || value > 12){
    error2.style.display = 'block'
  }else{
    error2.style.display = 'none'
  }
})

yearInput.addEventListener('input', function(){
  let value = parseInt(yearInput.value);
  if(isNaN(value) || value <= 0 || value > 3000){
    error3.style.display = 'block'
  }else{
    error3.style.display = 'none'
  }
})
// altert


// Función para validar el día ingresado en base al mes y año
function validateDay(day, month, year) {
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= lastDayOfMonth;
}
function validateYear(){
  const validYear = yearInput.value <= 2023 
  return validYear
}
function validateMonths(){
  const validMonth = monthInput.value <= 12
  return validMonth
}

