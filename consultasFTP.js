const ftp = require('basic-ftp');

async function connectAndListFiles() {
    const client = new ftp.Client();
    client.ftp.verbose = true; // Habilitar logging detallado

    try {
        // Conectar al servidor FTP
        await client.access({
            host: 'wsatm.atmseguros.com.ar', // host produccion
            user: 'TECYSEG',
            password: 'TECYSEG%24',
            secure: false, // conexiones sin cifrado
            port: 2113 //  puerto produccion correcto
        });

        console.log("Conectado al servidor FTP.");

        // Listar archivos en el directorio raíz
        const list = await client.list();
        console.log("Archivos disponibles en el servidor:");
        console.log(list);

    } catch (error) {
        console.error("Error al conectar o listar archivos:", error);
    } finally 
    {
        client.close();
    }
}


connectAndListFiles();
