import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries'

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  listEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};



refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const country = e.target.value.trim();
    if (country === '') {
        refs.listEl.classList.add('hidden');
        refs.countryInfoEl.classList.add('hidden');
        return
    }
     
    fetchCountries(country)
        .then(data => {
            if (!data) {
                Notify.failure('Oops, there is no country with that name');
            }

            if (data.length === 1) {
                refs.listEl.classList.add('hidden');
                refs.countryInfoEl.classList.remove('hidden');

                refs.listEl.innerHTML === '';
                refs.countryInfoEl.innerHTML = createOneCountryMarkup(data);
            }
            else if (data.length > 1 && data.length <= 10) {
                refs.listEl.classList.remove('hidden');
                refs.countryInfoEl.classList.add('hidden');

                refs.countryInfoEl.innerHTML === '';
                refs.listEl.innerHTML = createFewCountriesMarkup(data)
            }
            else if (data.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name');
            }
        })
}

function createOneCountryMarkup(arrayCountry) {
    const markup = arrayCountry.map(country => {
        return  `
		<div class='country-card'>
			<p class='country-card__name'>
                <img src='${country.flags.svg}' class='country-flag'>
                <span class='country-name'><b>${country.name.official}</b></span>
            </p>
			<p><b>Capital:</b> ${country.capital}</p>
			<p><b>Population:</b> ${country.population}</p>
			<p><b>Languages:</b> ${makeCountryLanguagesString(country.languages)}</p>
		</div>
		`;
    })
        .join('');
   
    return markup
}

function createFewCountriesMarkup(arrayOfCountries) {
    const markup = arrayOfCountries
        .map(country => {
        return `
            <li class='country-preview'>
                <img src='${country.flags.svg}' class='country-flag'>
                <span class='country-name'>${country.name.official}</span>
            </li>
            `;
        })
        .join('');

    return markup;

}

function makeCountryLanguagesString(objLanguages) {
  return Object.values(objLanguages).join(', ');
}

console.log('hi')