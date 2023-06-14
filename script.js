
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');


const emptyDayInput = document.querySelector('.errorMsgForDay');
const emptyMonthInput = document.querySelector('.errorMsgForMonth');
const emptyYearInput = document.querySelector('.errorMsgForYear');

const daylabel = document.getElementById('dayLabel')
const monthlabel = document.getElementById('monthLabel')
const yearlabel = document.getElementById('yearLabel')


const dayRegex = /^(0?[1-9]|[1-2]\d|3[01])$/;
const monthRegex = /^(0?[1-9]|1[0-2])$/;
const yearRegex = /^(19|20)\d{2}$/;


let dayValue = '';
let monthValue = '';
let yearValue = '';


const clickBtn = document.querySelector('#btn');
clickBtn.addEventListener('click', e => {
  checkEmptyField();
  e.preventDefault();
  validateInput();
})

dayInput.addEventListener('input', getDayValue);
monthInput.addEventListener('input', getMonthValue);
yearInput.addEventListener('input', getYearValue);


function getDayValue() {
  const getInputDayValue = dayInput.value;
  if (!dayRegex.test(getInputDayValue)) {
    emptyDayInput.innerHTML = "Must be a valid day";
    daylabel.style.color = "red"
  } else {
    dayValue = getInputDayValue;
    emptyDayInput.innerHTML = "";
    daylabel.style.color = ""
  }
}

function getMonthValue() {
  const getInputMonthValue = monthInput.value;
  if (!monthRegex.test(getInputMonthValue)) {
    emptyMonthInput.innerHTML = "Must be a valid month";
    monthlabel.style.color = "red"
  } else {
    monthValue = getInputMonthValue;
    emptyMonthInput.innerHTML = "";
    monthlabel.style.color = ""
  }
}


function getYearValue() {
  const getInputYearValue = yearInput.value;
  if (!yearRegex.test(getInputYearValue)) {
    emptyYearInput.innerHTML = "Must be in the past";
    yearlabel.style.color = "red"
  } else {
    yearValue = getInputYearValue;
    emptyYearInput.innerHTML = "";
    yearlabel.style.color = ""
  }
}

function checkEmptyField() {

  if (dayInput.value == '') {
    emptyDayInput.innerHTML = "This field is required";
    daylabel.style.color = "red";
  } else {
    emptyDayInput.innerHTML = "";
    daylabel.style.color = "";
  }
  if (monthInput.value == '') {
    emptyMonthInput.innerHTML = "This field is required";
    monthlabel.style.color = "red";
  } else {
    emptyMonthInput.innerHTML = "";
    monthlabel.style.color = "";
  }
  if (yearInput.value == '') {
    emptyYearInput.innerHTML = "This field is required";
    yearlabel.style.color = "red";
  } else {
    emptyYearInput.innerHTML = "";
    yearlabel.style.color = "";
  }
}



function validateInput() {



  let parseDayValue = parseInt(dayInput.value, 10);
  let parseMonthValue = parseInt(monthInput.value, 10);
  let parseYearValue = parseInt(yearInput.value, 10);
  console.log(parseYearValue);
  console.log(parseMonthValue);
  console.log(parseDayValue)


  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const total_Number_Of_Years = document.querySelector('.total_Number_Of_Years');
  const total_Number_Of_Month = document.querySelector('.total_Number_Of_Months');
  const total_Number_Of_Days = document.querySelector('.total_Number_Of_Days');

  let days_In_Months_Of_Year = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let ageInYear ;
  let ageInMonth ;
  let ageInDay ;


  if (currentYear < parseYearValue) {
    emptyYearInput.innerHTML = "This field is required";
    yearlabel.style.color = "red";
    ageInDay= "— — ";
    ageInMonth="— —";
    ageInYear="— —";
  }
  else if (currentYear > parseYearValue || currentYear === parseYearValue) {
    if (parseMonthValue < 0 || parseMonthValue > 12) {
      emptyMonthInput.innerHTML = "This field is required";
      monthlabel.style.color = "red";
      ageInDay= "— — ";
      ageInMonth="— —";
      ageInYear="— —";
    } else {
      const lastDayOfMonth = new Date(parseYearValue, parseMonthValue, 0).getDate();
      if (parseDayValue < 1 || parseDayValue > lastDayOfMonth) {
        emptyDayInput.innerHTML = "This field is required";
        daylabel.style.color = "red";
        ageInDay= "— — ";
        ageInMonth="— —";
        ageInYear="— —";
      } else {
         ageInYear = currentYear - parseYearValue;
         ageInMonth = currentMonth - parseMonthValue;
         ageInDay = currentDay - parseDayValue;

         /* if block if currentYear greater than parseYear */
        if(currentYear>parseYearValue&&currentMonth>parseMonthValue&&currentDay<parseDayValue){

          ageInMonth--
          ageInDay = days_In_Months_Of_Year[currentMonth - 1] + ageInDay;

         }
         else if(currentYear>parseYearValue&&currentMonth<parseMonthValue&&currentDay>parseDayValue){
          ageInMonth=12+ageInMonth;
          ageInYear--;
         }else if(currentYear>parseYearValue&&currentMonth<parseMonthValue&&currentDay<parseDayValue){
          ageInYear--
          ageInMonth=12+ageInMonth;
          ageInMonth--
          ageInDay = days_In_Months_Of_Year[currentMonth - 1] + ageInDay;
         }else if(currentYear>parseYearValue&&currentMonth===parseMonthValue&&currentDay<parseDayValue){
          ageInMonth=11;
          ageInDay = days_In_Months_Of_Year[currentMonth - 1] + ageInDay;
         }

         /* if block if currentYear equal than parseYear */

         if(currentYear===parseYearValue&&currentMonth>parseMonthValue&&currentDay<parseDayValue){

          ageInDay = days_In_Months_Of_Year[currentMonth - 1] + ageInDay;
          ageInMonth--
         }
         else if(currentYear===parseYearValue&&currentMonth<parseMonthValue&&currentDay>parseDayValue){
          emptyMonthInput.innerHTML = "Must be in the past month";
          monthlabel.style.color = "red";
          ageInDay= "— — ";
          ageInMonth="— —";
          ageInYear="— —"; 
          
         }else if(currentYear===parseYearValue&&currentMonth<parseMonthValue&&currentDay<parseDayValue){
          emptyDayInput.innerHTML = "Must be in the valid day";
          daylabel.style.color = "red";
          monthlabel.style.color = "red";
          yearlabel.style.color = "red";
          ageInDay= "— — ";
          ageInMonth="— —";
          ageInYear="— —"; 
          
         }else if(currentYear===parseYearValue&&currentMonth===parseMonthValue&&currentDay<parseDayValue){
          
          emptyDayInput.innerHTML = "Must be in the valid day";
          daylabel.style.color = "red";
          monthlabel.style.color = "red";
          yearlabel.style.color = "red";
          ageInDay= "— — ";
          ageInMonth="— —";
          ageInYear="— —"; 
         }

          total_Number_Of_Years.innerHTML = ageInYear;
          total_Number_Of_Month.innerHTML = ageInMonth;
          total_Number_Of_Days.innerHTML = ageInDay;
    }
      }

  } 
} /* end of function */






