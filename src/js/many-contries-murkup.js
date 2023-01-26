export function createFewCountriesMarkup(arrayOfCountries) {
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