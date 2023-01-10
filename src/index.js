import './css/styles.css';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  inputSearch: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.county-info'),
};

refs.inputSearch.addEventListener(
  'input',
  debounce(onInputSearch, DEBOUNCE_DELAY)
);

function onInputSearch(e) {
  const name = e.target.value;
  console.log(e);
  const result = fetchCountries(name);
  result.then(country => {
    countryMarkup(country);
  });
  if (name === '') {
    refs.countryList.innerHTML = '';
  }
}

function countryMarkup(country) {
  const markup = country
    .map(elem => {
      return `<li style="list-style:none">
        <div style ="display:flex;gap:10px;align-items:center"><img src ="${
          elem.flags.svg
        }" alt ="${
        elem.name.common
      }" width="35px"><p style="font-size:25px;color:pink;margin:0">${
        elem.name.official
      }</p></div>
        <p>
          <b>Capital</b>: ${elem.capital}
        </p>
        <p>
          <b>Population</b>: ${elem.population}
        </p>
        <p>
          <b>Languages</b>: ${Object.values(elem.languages)}
        </p>
      </li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}
