import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import fetchCountries from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listBlockEl = document.querySelector('.country-list');
const infoBlockEl = document.querySelector('.country-info');

const inputHandler = debounce(({ target: { value } }) => {
  value = value.trim();
  clearMarkup();

  if (!value) return;

  fetchCountries(value)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      renderMarkup(data);
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });
}, DEBOUNCE_DELAY);

inputEl.addEventListener('input', inputHandler);

const clearMarkup = () => {
  infoBlockEl.innerHTML = '';
  listBlockEl.innerHTML = '';
};

const renderMarkup = data => {
  if (data.length === 1) {
    infoBlockEl.insertAdjacentHTML('afterbegin', createInfoMarkup(data));
  } else {
    listBlockEl.insertAdjacentHTML('afterbegin', createListMarkup(data));
  }
};

const createListMarkup = data => {
  return data
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `<li><img src="${svg}" alt="${official}" width="30" height="20">${official}</li>`
    )
    .join('');
};

const createInfoMarkup = data => {
  return data.map(
    ({ name: { official }, capital, population, flags: { svg }, languages }) =>
      `<h1><img src="${svg}" alt="${official}" width="30" height="20">${official}</h1>
      <p><strong>Capital:</strong> ${capital}</p>
      <p><strong>Population:</strong> ${population}</p>
      <p><strong>Languages:</strong> ${Object.values(languages)}</p>`
  );
};
