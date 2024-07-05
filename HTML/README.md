#Hackathon Retail Challenge 2024. 

Nosotros somos el equipo 1, conformado por: Denise, Santiago, Cecilia, Luis, Emanuel y José. 

En este hackathon, vamos a construir una aplicación web dinámica y visualmente atractiva para analizar la segmentación de clientes. Presentaremos los resultados de la aplicación en una presentación y en un video. 

Las tecnologías que utilizaremos son: HTML, CSS, JavaScript, Git, GitHub, JSON, Chart.js, Node.js, Express.js y Django

Github del proyecto: https://github.com/HidenLacan/Hackatoners

<!--
# Hackaton Retail Challenge
¡Bienvenidos al Hackathon! En este evento, vamos a construir una aplicación web dinámica y visualmente atractiva para analizar la segmentación de clientes. Este tutorial te guiará paso a paso para crear una base sólida para tu proyecto. ¡Manos a la obra!

## Objetivo del Proyecto

El objetivo de este proyecto es desarrollar una aplicación web que permita cargar datos preprocesados de clientes, visualizar métricas RFM (Recencia, Frecuencia, Valor Monetario) y mostrar los resultados mediante gráficos interactivos utilizando Chart.js. Este proyecto servirá como punto de partida para que puedas personalizar y expandir según tus necesidades.

## Estructura del Proyecto

Aquí está la estructura de archivos que usaremos:

> Puedes descargar el archivo zip adjunto que tiene el código que usamos en este tutorial para que no tengas que crearlo manualmente.

```
/hackaton
    /css
        styles.css
    /js
        app.js
    /data
        rfmData.json
    index.html
```

- La carpeta `css` contiene los estilos de la aplicación.
- la carpeta `js` va a contener todos los scripts JS que tu aplicación va a necesitar para desplegar la información
- la carpeta `data` va a contener un archivo llamado `rfmData.json` el cual es el que provee los datos al JS para ser mostrados
- finalmente el archivo `index.html` que será nuestro archivo principal

> Notarás que en el archivo zip adjunto, dentro de cada archivo ya se encuentra un código de ejemplo. Si lo ejecutas verás que es ¡totalmente funcional! por lo que tendrán una base muy sólida para construir y personalizar el resto de la aplicación.

## Paso 1 Crear la Estructura del HTML

Crea un archivo index.html y añade la estructura básica del HTML:

```html<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Segmentación de Clientes</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <h1>Segmentación de Clientes</h1>
    </header>
    <main>
        <section id="upload-section">
            <h2>Cargar Datos</h2>
            <button id="loadDataButton">Cargar Datos</button>
        </section>
        <section id="charts-section">
            <h2>Visualización de Datos</h2>
            <canvas id="rfmChart"></canvas>
        </section>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
```

aquí estamos creando una estructura simple que tiene un botón el cual va a hacer el llamado a un script que va a ejecutar el código necesario dentro del archivo `app.js` para desplegar los gráficos.

## Paso 2: Estilizar la Página con CSS

Crea un archivo styles.css en la carpeta css y añade los estilos básicos:

```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
}

header {
    background-color: #4CAF50;
    color: white;
    padding: 1em;
    text-align: center;
}

main {
    padding: 1em;
    max-width: 800px;
    margin: auto;
}

section {
    margin-bottom: 2em;
}

h2 {
    color: #333;
}

button {
    display: block;
    margin: 1em 0;
    padding: 0.5em 1em;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

canvas {
    max-width: 100%;
}
```

agregamos unos estilos simples para que sea visualmente más atractivo.

## Paso 3: Crear el Archivo JSON con Datos RFM

Crea un archivo rfmData.json en la carpeta data con el siguiente contenido de ejemplo:

```json
[
    {
        "customerID": 1,
        "recency": 5,
        "frequency": 10,
        "monetary": 500
    },
    {
        "customerID": 2,
        "recency": 3,
        "frequency": 7,
        "monetary": 300
    },
    {
        "customerID": 3,
        "recency": 15,
        "frequency": 2,
        "monetary": 100
    }
]
```

Posiblemente la estructura del archivo varíe cuando el equipo de Data tenga le versión final, pero es un buen comienzo.

## Paso 4: Escribir el JavaScript para la Lógica de Visualización de Gráficos

Crea un archivo app.js en la carpeta js y añade el siguiente código:

```javascript
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
```

### Explicación del Código JavaScript:

#### Carga de Datos

**loadData:** Esta función se activa al hacer clic en el botón "Cargar Datos". Utiliza fetch para cargar el archivo JSON y pasar los datos a renderChart.
Visualización con Chart.js:

**renderChart**: Usa Chart.js para crear un gráfico de barras con las métricas RFM. Cada métrica (Recencia, Frecuencia, Valor Monetario) se representa como un dataset diferente. Se utilizan los datos del archivo JSON para poblar el gráfico.

## Personaliza tu Proyecto

### Cambia los Estilos CSS

Para personalizar los estilos de tu aplicación, simplemente modifica el archivo `styles.css`. ¡Deja volar tu creatividad! Cambia los colores, fuentes, márgenes, y cualquier otro aspecto visual para que se ajuste a tu diseño preferido.

### Ajusta la Estructura del HTML

Puedes modificar el archivo `index.html` para ajustar la estructura según tus necesidades. Agrega más secciones, cambia la disposición de los elementos, o incluye nuevos componentes HTML. ¡Hazlo tuyo!

### Personaliza los Gráficos

Para personalizar los gráficos, modifica la configuración en el archivo `app.js`. Verás que ya está un código de ejemplo en el que se realiza un gráfico de barras. Chart.js ofrece muchas opciones de personalización para cambiar colores, tipos de gráficos, leyendas, y más. Consulta la documentación de [Chart.js](https://www.chartjs.org/docs/latest/getting-started/) para obtener más detalles.

## Funcionalidad Adicional: Componente para Cargar Archivo

¡Lleva tu proyecto al siguiente nivel! Añade un componente para permitir a los usuarios cargar su propio archivo JSON en lugar de utilizar un archivo estático. Aquí te mostramos cómo hacerlo:

agrega este nuevo componente a tu html:

```html
<section id="upload-section">
    <h2>Cargar Datos</h2>
    <input type="file" id="fileInput" accept=".json">
    <button id="loadDataButton">Cargar Datos de Ejemplo</button>
</section>
```

agrega estas líneas de código al archivo `app.js`.

```javascript
document.getElementById('fileInput').addEventListener('change', handleFileUpload);
document.getElementById('loadDataButton').addEventListener('click', loadData);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = JSON.parse(e.target.result);
            renderChart(data);
        };
        reader.readAsText(file);
    }
}
```

Con ello podrás subir archivos y no tenerlos directamente en el proyecto. Está en tí hacer este paso extra, pero le da mucho más dinamismo a la aplicación.

## ¡A por ello!

Ahora es tu turno de llevarla al siguiente nivel. Personaliza, experimenta y, sobre todo, diviértete. Recuerda, la creatividad y la innovación son tus mejores herramientas. ¡Buena suerte y disfruta del Hackathon!