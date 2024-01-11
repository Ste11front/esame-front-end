let data;

function displayCountries(subregion) {
    const countriesDiv = document.getElementById('countries');
    countriesDiv.innerHTML = ''; // Pulisci i paesi esistenti

    data
        .filter(country => !subregion || country.subregion === subregion) // Filtra i paesi per subregione
        .forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.classList.add('country');
            countryDiv.innerHTML = `
                <img src="${country.flags.png}" alt="${country.name.common} flag">
                <h2>${country.name.common}</h2>
                <div class="details">
                    <p>Capital: ${country.capital}</p>
                    <p>Language: ${Object.values(country.languages)[0]}</p>
                    <p>Area: ${country.area} km²</p>
                    <p>Population: ${country.population}</p>
                    <p>Subregion: ${country.subregion}</p>
                </div>
            `;
            countriesDiv.appendChild(countryDiv);
        });
}

fetch('https://restcountries.com/v3.1/region/europe')
    .then(response => response.json())
    .then(responseData => {
        data = responseData;

        // Aggiungi le opzioni di subregione al menu a discesa
        const subregions = [...new Set(data.map(country => country.subregion))]; // Ottieni tutte le subregioni uniche
        const filterSubregion = document.getElementById('filterSubregion');
        subregions.forEach(subregion => {
            const option = document.createElement('option');
            option.value = subregion;
            option.textContent = subregion;
            filterSubregion.appendChild(option);
        });

        displayCountries();
    })
    .catch(error => console.error('Error:', error));

document.getElementById('sortName').addEventListener('click', () => {
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    displayCountries();
});

document.getElementById('sortPopulation').addEventListener('click', () => {
    data.sort((a, b) => b.population - a.population);
    displayCountries();
});

document.getElementById('filterSubregion').addEventListener('change', event => {
    displayCountries(event.target.value);
});
