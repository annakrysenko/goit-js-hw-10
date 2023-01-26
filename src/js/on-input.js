import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries.js';

import { refs } from './DOM.js';
import { createFewCountriesMarkup } from './many-contries-murkup';
import { createOneCountryMarkup } from './one-country-markup';

export function onInput(e) {
    const country = e.target.value.trim();
    if (country === '') {
        refs.listEl.classList.add('hidden');
        refs.countryInfoEl.classList.add('hidden');
        refs.listEl.innerHTML = '';
        refs.countryInfoEl.innerHTML = '';
        return
    }
     
    fetchCountries(country)
        .then(data => {
            if (!data) {
                console.log(data)
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

