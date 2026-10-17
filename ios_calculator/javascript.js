document.addEventListener("DOMContentLoaded", () => {
  const displayText = document.getElementById("display-text");
  
  let currentInput = "0";
  let previousInput = "";
  let operation = null;
  let resetScreen = false;

  // Update the screen display
  function updateDisplay() {
    displayText.textContent = currentInput;
  }

  // Handle number button clicks (0-9)
  function appendNumber(number) {
    if (currentInput === "0" || resetScreen) {
      currentInput = number;
      resetScreen = false;
    } else {
      currentInput += number;
    }
    updateDisplay();
  }

  // Handle decimal point
  function appendDecimal() {
    if (resetScreen) {
      currentInput = "0.";
      resetScreen = false;
      updateDisplay();
      return;
    }
    if (!currentInput.includes(".")) {
      currentInput += ".";
      updateDisplay();
    }
  }

  // Handle operators (+, -, X, /)
  function chooseOperation(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
  }

  // Perform calculation
  function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "X":
        result = prev * current;
        break;
      case "/":
        result = current === 0 ? "Error" : prev / current;
        break;
      default:
        return;
    }

    currentInput = result.toString();
    operation = null;
    previousInput = "";
    resetScreen = true;
    updateDisplay();
  }

  // Clear everything (AC)
  function clearAll() {
    currentInput = "0";
    previousInput = "";
    operation = null;
    updateDisplay();
  }

  // Toggle positive/negative (+/-)
  function toggleSign() {
    if (currentInput !== "0") {
      currentInput = currentInput.startsWith("-") 
        ? currentInput.slice(1) 
        : "-" + currentInput;
      updateDisplay();
    }
  }

  // Percentage (%)
  function percentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
  }

  // Event Listeners for Number Buttons
  for (let i = 0; i <= 9; i++) {
    const btn = document.getElementById(`num${i}`.replace('num0', 'num')); // handles num0 or general num IDs
    // Alternatively, attach using query selectors if IDs match your HTML:
  }

  // Robust query selection based on your button IDs:
  document.querySelectorAll(".button-wrapper button").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.id;
      const text = button.textContent;

      if (!isNaN(text)) {
        appendNumber(text);
      } else if (id === "decimal") {
        appendDecimal();
      } else if (id === "plus" || id === "minus" || id === "multiply" || id === "divide") {
        chooseOperation(text);
      } else if (id === "equals") {
        calculate();
      } else if (id === "ac") {
        clearAll();
      } else if (id === "plys-minus") {
        toggleSign();
      } else if (id === "percent") {
        percentage();
      }
    });
  });
});