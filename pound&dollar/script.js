
const dollarToPoundExchangeRate = 30;

function convertToDollars() {
  const poundsInput = document.getElementById("pounds");
  const dollarsInput = document.getElementById("dollars");

  const poundsValue = parseFloat(poundsInput.value);
  if (!isNaN(poundsValue)) {
    const dollarsValue = poundsValue / dollarToPoundExchangeRate;
    dollarsInput.value = dollarsValue.toFixed(2);
  }
}

function convertToPounds() {
  const dollarsInput = document.getElementById("dollars");
  const poundsInput = document.getElementById("pounds");

  const dollarsValue = parseFloat(dollarsInput.value);
  if (!isNaN(dollarsValue)) {
    const poundsValue = dollarsValue * dollarToPoundExchangeRate;
    poundsInput.value = poundsValue.toFixed(2);
  }
}

