





async function sendSoapRequest() {
    try {
        const response = await axios.post(url, xmlRequest, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Ocp-Apim-Subscription-Key':'5a51821ce0134a54ad1f46c3f5736f0b'
            }
        });
        
        console.log("Respuesta completa del servidor:", response.data);


    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

// Ejecuta la función
sendSoapRequest();
