const screen = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');
let expression = '';

function updateScreen(value) {
  screen.value = value;
}

function clearCalculator() {
  expression = '';
  updateScreen('');
}

function deleteLastEntry() {
  expression = expression.slice(0, -1);
  updateScreen(expression);
}

function appendValue(value) {
  if (expression.length >= 30) return;
  const lastChar = expression.slice(-1);

  if (value === '.' && lastChar === '.') return;
  if (['+', '-', '×', '÷'].includes(value) && ['+', '-', '×', '÷'].includes(lastChar)) {
    expression = expression.slice(0, -1) + value;
  } else {
    expression += value;
  }

  updateScreen(expression);
}

function calculateResult() {
  if (!expression) return;

  const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');
  try {
    const result = Function(`"use strict"; return (${sanitized})`)();
    updateScreen(result);
    expression = String(result);
  } catch (error) {
    updateScreen('Error');
    expression = '';
  }
}

keys.addEventListener('click', event => {
  const target = event.target;
  if (!target.matches('button')) return;

  const action = target.dataset.action;
  const value = target.dataset.value;

  if (action === 'clear') {
    clearCalculator();
    return;
  }

  if (action === 'delete') {
    deleteLastEntry();
    return;
  }

  if (action === 'calculate') {
    calculateResult();
    return;
  }

  if (value) {
    appendValue(value);
  }
});
