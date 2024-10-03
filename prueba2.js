const soap = require('soap');

const url = 'https://wsatm-dev.atmseguros.com.ar/index.php/soap?wsdl'; // URL WSDL para desarrollo

soap.createClient(url, { wsdl_options: { strictSSL: false } }, (err, client) => {
    if (err) {
        console.error('Error al crear el cliente SOAP:', err);
        return;
    }

    const requestArgs = {
        auto: {
            usuario: {
                usa: 'TECYSEG',
                pass: 'TECYSEG$',
                fecha: '02102024', // Cambia a la fecha actual o la requerida
                vendedor: '0956109561',
                origen: 'WS',
                plan: '01',
                contacto_tecnico: 'jperez@atmseguros.com.ar',
                contacto_comercial: 'plopez@atmseguros.com.ar',
            },
            asegurado: {
                persona: '1', // Código de tipo de persona
                iva: '1',    // Código de condición de IVA
                cupondscto: 'MOTO10',
                bonificacion: '10',
            },
            bien: {
                marca: '2',       // Código de marca
                modelo: '2',    // Código de modelo
                anofab: '2016',
                cerokm: 'N',
                suma: '14970,00',
                uso: '4263',
                tipo_uso: '1',
                codpostal: '1007',
                sub_cp: '1',
                ajuste: '20',
                rastreo: 'N',
                alarma: '1',
                seccion: '4',
                gnc: '1',
                accesorios: {
                    accesorio: {
                        codigo: '1',
                        valor: '2000',
                    },
                },
            },
        },
    };
    

    client.AUTOS_Cotizar(requestArgs, (err, result) => {
        if (err) {
            console.error('Error al invocar el método:', err);
        } else {
            console.log('Resultado de la cotización:', result);
            if (Object.keys(result).length === 0) {
                console.log('No se obtuvo respuesta válida. Verifica los parámetros enviados.');
            }
        }
    });
});
