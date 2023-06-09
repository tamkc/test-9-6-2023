function isEven(number) {
    return number % 2 === 0;
}

function fetchCurrencyData() {
    const apiURL = 'https://api.apilayer.com/fixer/latest';
    const apiKey = '9sOx2d1gWYZrKY0uD4hCbOMIQzLcL4KQ';

    fetch(apiURL, {
        headers: {
            'apikey': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            const currencyData = data.rates;
            const updatedCurrencyData = {};

            // Add 10.0002 to each currency value
            for (const currency in currencyData) {
                updatedCurrencyData[currency] = currencyData[currency] + 10.0002;
            }

            displayCurrencyTable(currencyData, updatedCurrencyData);
        })
        .catch(error => {
            console.error('Error fetching currency data:', error);
        });
}

function displayCurrencyTable(originalData, updatedData) {
    const tableBody = document.querySelector('#currency-table tbody');

    for (const currency in originalData) {
        const row = document.createElement('tr');

        const currencyCell = document.createElement('td');
        currencyCell.textContent = currency;
        row.appendChild(currencyCell);

        const originalValueCell = document.createElement('td');
        originalValueCell.textContent = originalData[currency];
        if (isEven(originalData[currency]) || currency === 'HKD') {
            originalValueCell.classList.add('even');
        }
        row.appendChild(originalValueCell);

        const updatedValueCell = document.createElement('td');
        updatedValueCell.textContent = updatedData[currency];
        if (isEven(updatedData[currency]) || currency === 'HKD') {
            updatedValueCell.classList.add('even');
        }
        row.appendChild(updatedValueCell);

        tableBody.appendChild(row);
    }
}

fetchCurrencyData();
