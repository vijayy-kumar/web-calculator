// ===========================
//   Calculator State
// ===========================
let current     = '0';
let previous    = '';
let operator    = null;
let shouldReset = false;

// DOM Elements
const resultEl = document.getElementById('result');
const exprEl   = document.getElementById('expression');

// ===========================
//   Update Display
// ===========================
function updateDisplay() {
  resultEl.textContent = current;
}

// ===========================
//   Number Input
// ===========================
function input(val) {
  if (shouldReset) {
    current = val;
    shouldReset = false;
  } else {
    if (current === '0' && val !== '.') {
      current = val;
    } else if (current.length < 12) {
      current += val;
    }
  }
  updateDisplay();
}

// ===========================
//   Decimal Point
// ===========================
function inputDot() {
  if (shouldReset) {
    current = '0.';
    shouldReset = false;
    updateDisplay();
    return;
  }
  if (!current.includes('.')) {
    current += '.';
  }
  updateDisplay();
}

// ===========================
//   Set Operator
// ===========================
function setOp(op) {
  if (operator && !shouldReset) {
    calculate(true);
  }
  previous    = current;
  operator    = op;
  shouldReset = true;
  exprEl.textContent = previous + ' ' + op;
}

// ===========================
//   Calculate Result
// ===========================
function calculate(chain = false) {
  if (!operator || !previous) return;

  const a = parseFloat(previous);
  const b = parseFloat(current);
  let res;

  switch (operator) {
    case '+': res = a + b; break;
    case '−': res = a - b; break;
    case '×': res = a * b; break;
    case '÷': res = b !== 0 ? a / b : 'Error'; break;
    default:  return;
  }

  if (!chain) {
    exprEl.textContent = previous + ' ' + operator + ' ' + current + ' =';
  }

  current     = res === 'Error' ? 'Error' : parseFloat(res.toFixed(10)).toString();
  operator    = null;
  previous    = '';
  shouldReset = true;

  updateDisplay();
}

// ===========================
//   Clear All (AC)
// ===========================
function clearAll() {
  current     = '0';
  previous    = '';
  operator    = null;
  shouldReset = false;
  exprEl.textContent = '';
  updateDisplay();
}

// ===========================
//   Toggle Sign (+/-)
// ===========================
function toggleSign() {
  if (current !== '0' && current !== 'Error') {
    current = (parseFloat(current) * -1).toString();
    updateDisplay();
  }
}

// ===========================
//   Percentage (%)
// ===========================
function percent() {
  if (current !== 'Error') {
    current = (parseFloat(current) / 100).toString();
    updateDisplay();
  }
}

// ===========================
//   Keyboard Support
// ===========================
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    input(e.key);
  } else if (e.key === '.') {
    inputDot();
  } else if (e.key === '+') {
    setOp('+');
  } else if (e.key === '-') {
    setOp('−');
  } else if (e.key === '*') {
    setOp('×');
  } else if (e.key === '/') {
    e.preventDefault();
    setOp('÷');
  } else if (e.key === 'Enter' || e.key === '=') {
    calculate();
  } else if (e.key === 'Escape') {
    clearAll();
  } else if (e.key === '%') {
    percent();
  } else if (e.key === 'Backspace') {
    if (current.length > 1 && current !== 'Error') {
      current = current.slice(0, -1);
    } else {
      current = '0';
    }
    updateDisplay();
  }
});

// theme changing

const themes = [
  "theme-l",
  "theme-ayanokoji",
  "theme-kira"
];

let currentTheme = 0;

const body = document.body;
const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {

  body.classList.remove(themes[currentTheme]);

  currentTheme = (currentTheme + 1) % themes.length;

  body.classList.add(themes[currentTheme]);

});