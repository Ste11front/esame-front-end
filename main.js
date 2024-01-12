// Dichiarazione della variabile utilizzata per memorizzare i dati dei paesi recuperati dall’API
let data;

// Funzione per visualizzare i paesi
function displayCountries(subregion) { // Funzione chiamata displayCountries che prende un parametro, subregion, e visualizza i paesi corrispondenti a quella subregion
    const countriesDiv = document.getElementById('countries'); // Recupera l’elemento HTML con l’ID ‘countries’ e lo assegna alla variabile countriesDiv
    countriesDiv.innerHTML = ''; // Pulisce il contenuto dell’elemento countriesDiv, rimuovendo tutti i paesi esistenti, per assicurare non vengano aggiunti ulteriormente durante il sort o il filter

    // Filtra e visualizza i paesi per subregion
    data
        .filter(country => !subregion || country.subregion === subregion) // Filtra l’array data per subregion. Se subregion è vuoto (cioè non è stato specificato), tutti i paesi vengono inclusi
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

// Recupera i dati dei paesi dall’API
fetch('https://restcountries.com/v3.1/region/europe')
    .then(response => response.json())
    .then(responseData => {
        data = responseData;

        // Aggiunge le opzioni di subregion al menù a discesa
        const subregions = [...new Set(data.map(country => country.subregion))]; // Ottiene tutte le subregion uniche
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
    data.sort((a, b) => a.name.common.localeCompare(b.name.common)); // Ordina i paesi per nome
    displayCountries();
});

document.getElementById('sortPopulation').addEventListener('click', () => {
    data.sort((a, b) => b.population - a.population); // Ordina i paesi per popolazione
    displayCountries();
});

document.getElementById('filterSubregion').addEventListener('change', event => {
    displayCountries(event.target.value); // Filtra i paesi per subregion
});