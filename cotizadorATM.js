const axios = require('axios');

// URL del servicio SOAP de desarrollo
const url = 'https://wsatm-dev.atmseguros.com.ar/index.php/soap';

const xmlRequest = `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">
   <soap:Header/>
   <soap:Body>
      <tem:AUTOS_Cotizar>
         <tem:doc_in>
                <auto>
        <usuario>
          <usa>TECYSEG</usa>
          <pass>TECYSEG%24</pass>
          <vendedor>0956109561</vendedor>
          <fecha>05102024</fecha>
          <origen>WS</origen>
          <contacto_tecnico>jperez@atmseguros.com.ar</contacto_tecnico>
          <contacto_comercial>plopez@atmseguros.com.ar</contacto_comercial>
        </usuario>
        <asegurado>
          <persona>F</persona>
          <iva>CF</iva>
        </asegurado>
        <bien>
          <marca>32</marca>
           <modelo>342</modelo>
          <cod_infoauto>36956</cod_infoauto>
          <anofab>2001</anofab>
           <tipo_uso>1</tipo_uso>
          <uso>1414</uso>
          <codpostal>1824</codpostal>
          <ajuste>20</ajuste>
          <alarma>0</alarma>
          <seccion>3</seccion>
        </bien>
      </auto>
         </tem:doc_in>
      </tem:AUTOS_Cotizar>
   </soap:Body>
</soap:Envelope>`;

async function sendSoapRequest() {
    try {
        const response = await axios.post(url, xmlRequest, {
            headers: {
                'Content-Type': 'text/xml',
            }
        });
        
        console.log("Respuesta completa del servidor:", response.data);


    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

// Ejecuta la función
sendSoapRequest();
