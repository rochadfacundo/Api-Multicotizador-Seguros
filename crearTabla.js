const fs = require('fs');
const readline = require('readline');

// Función para generar una tabla HTML
function generateHTMLTable(headers, rows) {
    let html = '<!DOCTYPE html><html><head><title>Tabla de Datos</title></head><body>';
    html += '<table border="1" cellspacing="0" cellpadding="5">';
    
    // Encabezados
    html += '<tr>';
    headers.forEach(header => {
        html += `<th>${header}</th>`;
    });
    html += '</tr>';
    
    // Filas
    rows.forEach(row => {
        html += '<tr>';
        row.forEach(value => {
            html += `<td>${value}</td>`;
        });
        html += '</tr>';
    });

    html += '</table></body></html>';
    return html;
}

async function processFile(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let isFirstLine = true;
    let headers = [];
    let rows = [];
    
    for await (const line of rl) {
        const columns = line.split(';');
        
        if (isFirstLine) {
            headers = columns;  // Almacenar encabezados
            isFirstLine = false;
        } else {
            rows.push(columns); // Almacenar filas de datos
        }
    }

    // Generar HTML y guardarlo en un archivo
    const htmlTable = generateHTMLTable(headers, rows);
    fs.writeFileSync('tabla_localidades.html', htmlTable);
    console.log("Tabla HTML generada en 'tabla_datos.html'");
}

// Ejecuta la función con la ruta del archivo
processFile('ParametrosDescargados/WS_AU_LOCALIDADES.txt');
