document.getElementById('loadDataButton').addEventListener('click', loadData);

function loadData() {
    fetch('data/rfmData.json')
        .then(response => response.json())
        .then(data => renderChart(data))
        .catch(error => console.error('Error al cargar los datos:', error));
}

function renderChart(rfmData) {
    const ctx = document.getElementById('rfmChart').getContext('2d');
    const labels = rfmData.map(customer => `Cliente ${customer.customerID}`);
    const recencyData = rfmData.map(customer => customer.recency);
    const frequencyData = rfmData.map(customer => customer.frequency);
    const monetaryData = rfmData.map(customer => customer.monetary);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Recency',
                    data: recencyData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Frequency',
                    data: frequencyData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Monetary',
                    data: monetaryData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
