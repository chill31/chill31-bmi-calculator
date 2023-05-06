/**
 * 
 * @param {Array[Number]} height 
 * @param {Number} weight 
 * @returns 
 */

// the height parameter takes in height as [feet, inches]
function calculateBMI(height, weight) {

  const heightAsMeters = (height[0] * 0.3048) + (height[1] * 0.0254);
  const bmi = weight / (heightAsMeters * heightAsMeters);

  return parseFloat(bmi.toFixed(1));

}

function convertMetersToFeetAndInches(meters) {
  const feet = Math.floor(meters * 3.28084);
  const inches = Math.round((meters * 3.28084 - feet) * 12);
  return [feet, inches];
}

function convertDecimalFeetToFeetAndInches(decimalFeet) {
  const feet = Math.floor(decimalFeet);
  const inches = Math.round((decimalFeet - feet) * 12);
  if (inches === 12) {
    return [feet + 1, 0]; // if inches equals 12, add 1 to feet and set inches to 0
  } else {
    return [feet, inches];
  }
}

function convertPoundsToKgs(pounds) {
  const kgs = pounds * 0.45359237;
  return kgs;
}

const allInputs = document.querySelectorAll("input");
allInputs.forEach((input) => {

  input.addEventListener("keypress", (e) => {
    const firstDotIndex = e.target.value.indexOf(".");
    const hasOnePeriod = firstDotIndex !== -1 && e.target.value.indexOf(".", firstDotIndex + 1) === -1;

    if (hasOnePeriod && e.key === '.') {
      e.preventDefault(); // if it already has one decimal point, the next period (".") should be ignored.
    } else {

      if (e.key === '.') {
        // continue the process as decimals can be entered.
      } else {
        if (/\d/.test(Number(e.key)) === false) {
          e.preventDefault();
        }
      }

    }
  });

});

const calculateBtn = document.querySelector(".btn__calculate");
const calculateItem = document.querySelector(".calculator__score");
const scoreSpan = document.querySelector(".calculator__score .item__score");

const heightInput = document.querySelector(".input__height");
const weightInput = document.querySelector(".input__weight");

const heightTypeSelectors = document.querySelectorAll(".types__height");
const weightTypeSelectors = document.querySelectorAll(".types__weight");

let currentHeightUnit = 'm'; // 'm', 'f'
let currentWeightUnit = 'k'; // 'k', 'p'

heightTypeSelectors.forEach((selector) => {

  selector.addEventListener("click", () => {
    heightTypeSelectors.forEach(s => s.classList.remove("type__active"));
    selector.classList.add("type__active");
    currentHeightUnit = selector.classList[2].replace("type__", "");;
  });

});

weightTypeSelectors.forEach((selector) => {

  selector.addEventListener("click", () => {
    weightTypeSelectors.forEach(s => s.classList.remove("type__active"));
    selector.classList.add("type__active");
    currentWeightUnit = selector.classList[2].replace("type__", "");
  });

});

calculateBtn.addEventListener("click", () => {

  let height = heightInput.value;
  let weight = weightInput.value;
  
  if (!heightInput.value) height = "0";
  if (!weightInput.value) weight = "0";
  
  if (height.endsWith(".")) {
    height += "0";
  }
  if (weight.endsWith(".")) {
    weight += "0";
  }
  
  height = Number(height);
  weight = Number(weight);

  // if height is in metres
  if (currentHeightUnit === 'm') {
    let score;
    const feetInches = convertMetersToFeetAndInches(height);

    // if weight is in kg
    if (currentWeightUnit === 'k') {
      score = calculateBMI(feetInches, weight);
    }
    // if weight is in pounds (lbs)
    if(currentWeightUnit === 'p') {
      const kgs = convertPoundsToKgs(weight);
      score = calculateBMI(feetInches, kgs);
    }
    
    scoreSpan.textContent = score;
    calculateItem.classList.add("visible");

  }

  // if height is in feet (inches)
  if(currentHeightUnit === 'f') {
    let score;
    const feetInches = convertDecimalFeetToFeetAndInches(height);

    // if weight is in kg
    if(currentWeightUnit === 'k') {
      score = calculateBMI(feetInches, weight);
    }
    // if weight is in pounds (lbs)
    if(currentWeightUnit === 'p') {
      const kgs = convertPoundsToKgs(weight);
      score = calculateBMI(feetInches, kgs);
    }

    scoreSpan.textContent = score;
    calculateItem.classList.add("visible");
  }

});