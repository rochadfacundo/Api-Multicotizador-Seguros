const ftp = require('basic-ftp');

async function connectAndListFiles() {
    const client = new ftp.Client();
    client.ftp.verbose = true; // Habilitar logging detallado

    try {
        // Conectar al servidor FTP
        await client.access({
            host: 'wsatm-dev.atmseguros.com.ar',
            user: 'TECYSEG',
            password: 'TECYSEG%24', // Asegúrate de que la contraseña sea correcta
            secure: false, // Asegúrate de que esté en false para conexiones sin cifrado
            port: 2111 // Asegúrate de que el puerto sea correcto
        });

        console.log("Conectado al servidor FTP.");

        // Listar archivos en el directorio raíz
        const list = await client.list();
        console.log("Archivos disponibles en el servidor:");
        console.log(list);

    } catch (error) {
        console.error("Error al conectar o listar archivos:", error);
    } finally {
        client.close(); // Cerrar la conexión
    }
}

// Ejecuta la función
connectAndListFiles();
