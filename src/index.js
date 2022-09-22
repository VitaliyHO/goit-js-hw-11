import './css/styles.css';
import { fetchCountries } from './JS/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryDesc = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

Notiflix.Notify.init({position: 'center-top'});

input.addEventListener('input', debounce((event) => {
    if(!event.target.value){
        countryDesc.innerHTML = '';
        return countryList.innerHTML = '';
    };
    fetchCountries(event.target.value)
        .then(countries => {
            if(countries.length > 10){
                return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }else if(countries.length <= 10 && countries.length > 1){
                countryDesc.innerHTML = '';
                return countriesListMarkup(countries);
            }else if(countries.length === 1){
                countryList.innerHTML = '';
                return countryMarkup(countries);
            }
            })
        .catch(error => {
                countryDesc.innerHTML = '';
                countryList.innerHTML = '';
                console.log(error);
                return Notiflix.Notify.failure("Oops, there is no country with that name");
        });
}, DEBOUNCE_DELAY));

function countryMarkup(countries) {
    const markup = countries.map(country => {
        return `
        <img src="${country.flags.svg}" alt="flag" width="30">
        <h1 class="title">${country.name}</h1>
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Languages:</b> ${country.languages.map(language=> language.name)}</p>`;
    }
    ).join('');
    countryDesc.innerHTML = markup;
};

function countriesListMarkup(countries) {
    const markup = countries.map(country => {
        return `
        <li class="country-item">
        <img src="${country.flags.svg}" alt="flag" width="30">
        <p>${country.name}</p>
        </li>`
    }).join('');
    countryList.innerHTML = markup;
}