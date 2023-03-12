// eslint-disable-next-line no-unused-vars
import styles from './style.css';

function render() {
  const items = [
    'C',
    '√',
    '%',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '00',
    '0',
    '.',
    '=',
  ];
  const itemsDiv = document.querySelector('.calcs__items');
  items.map((item) => itemsDiv.insertAdjacentHTML(
    'beforeend',
    `<div class="calcs__item"><div class="calcs__item__elem">${item}</div></div>`,
  ));
}
render();
