const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

async function listarArchivos(client){
        // Listar archivos en el directorio raíz
        const list = await client.list();
        console.log("Archivos disponibles en el servidor:");
        console.log(list);

}


async function descargarPDF(client)
{
    await client.downloadTo("Cotizador_WS_V1.7.pdf", "Cotizador_WS_V1.7.pdf");
    console.log("Archivo descargado exitosamente.");

}

async function obtenerListaParametros(client)
{
    await client.cd("Parametros"); // Cambiar al directorio Parametros
    const parametrosList = await client.list();
    console.log("Archivos disponibles en el directorio 'Parametros':");
    console.log(parametrosList);

    return parametrosList;

}

function crearDirectorio()
{
    const localDir = path.join(__dirname, 'ParametrosDescargados');
    if (!fs.existsSync(localDir)) {
        fs.mkdirSync(localDir, { recursive: true });
        console.log(`Directorio creado: ${localDir}`);
    }

    return localDir;
}

async function descargarArchivosDirectorio(client,listaParametros,directorio)
{
     // Descargar cada archivo en el directorio "Parametros"
     for (const file of listaParametros) {
        if (file.type === 1) { // Solo descargar archivos, no directorios
            const localFilePath = path.join(directorio, file.name);
            await client.downloadTo(localFilePath, file.name);
            console.log(`Archivo ${file.name} descargado en ${localFilePath}`);
        }
    }
    
}

async function connectAndListFiles() {
    const client = new ftp.Client();
    client.ftp.verbose = true; // Habilitar logging detallado

    try {
        // Conectar al servidor FTP
        await client.access({
            host: 'wsatm-dev.atmseguros.com.ar', // host produccion
            user: 'TECYSEG',
            password: 'TECYSEG%24',
            secure: false, // conexiones sin cifrado
            port: 2111 //  puerto produccion correcto
        });



        console.log("Conectado al servidor FTP.");

        //await listarArchivos(client);
        //await descargarPDF(client);


        const listaParametros= await obtenerListaParametros(client);

        const directorio=crearDirectorio();

        await descargarArchivosDirectorio(client,listaParametros,directorio);

    } catch (error) {
        console.error("Error:", error);
    } finally 
    {
        client.close();
    }
}


connectAndListFiles();
