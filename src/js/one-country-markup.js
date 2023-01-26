export function createOneCountryMarkup(arrayCountry) {
    const markup = arrayCountry.map(country => {
        return  `
		<div class='country-card'>
			<p class='country-card__name'>
                <img src='${country.flags.svg}' class='country-flag'>
                <span class='country-name'><b>${country.name.official}</b></span>
            </p>
			<p><b>Capital:</b> ${makeArrayToString(country.capital)}</p>
			<p><b>Population:</b> ${country.population}</p>
			<p><b>Languages:</b> ${makeArrayToString(country.languages)}</p>
		</div>
		`;
    })
        .join('');
   
    return markup
}

function makeArrayToString(obj) {
  return Object.values(obj).join(', ');
}