const axios = require('axios');

// URL del servicio SOAP de desarrollo
const url = 'https://wsatm-dev.atmseguros.com.ar/index.php/soap';


const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses en JS empiezan desde 0
const year = today.getFullYear();

const xmlRequest = `
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <AUTOS_Cotizar xmlns="http://tempuri.org/">
<auto>
    <usuario>
        <usa>TECYSEG</usa>
        <pass>TECYSEG%24</pass>
        <fecha>02102024</fecha>
        <vendedor>0956109561</vendedor>
        <origen>WS</origen>
        <plan>01</plan>
        <contacto_tecnico>jperez@atmseguros.com.ar</contacto_tecnico>
        <contacto_comercial>plopez@atmseguros.com.ar</contacto_comercial>
    </usuario>
     <asegurado>
        <persona>F</persona>
        <iva>CF</iva>
        <cupondscto>MOTO10</cupondscto>
        <bonificacion>10</bonificacion>
    </asegurado>
    <bien>
        <marca>374</marca>
        <modelo>16728</modelo>
        <cod_infoauto>9900131</cod_infoauto>
        <anofab>2016</anofab>
        <cerokm>N</cerokm>
        <suma>14970,00</suma>
        <uso>4263</uso>
        <tipo_uso>1</tipo_uso>
        <codpostal>1007</codpostal>
        <sub_cp>1</sub_cp>
        <ajuste>20</ajuste>
        <rastreo>N</rastreo>
        <alarma>1</alarma>
        <seccion>4</seccion>
        <gnc>1</gnc>
        <accesorios>
            <accesorio>
                <codigo>1</codigo>
                <valor>2000</valor>
            </accesorio>
        </accesorios>
    </bien>
</auto>
    </AUTOS_Cotizar>
  </soap:Body>
</soap:Envelope>
`;


async function sendSoapRequest() {
    try {
        const response = await axios.post(url, xmlRequest, {
            headers: {
                'Content-Type': 'text/xml',
              
            }
        });
        
        console.log("Respuesta completa del servidor:", response.data);
        console.log("Headers de respuesta:", response.headers);
    }catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

// Ejecuta la función
sendSoapRequest();
