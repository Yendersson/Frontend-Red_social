
export function handleFileSelect(file) {
    console.log("UTIL", file);
    if (file) {
        
        const reader = new FileReader();
        let jsonData = {
            archivo: {
                nombre: null,
                tipo: null,
                contenido: null
            },
            otrosDatos: 'valor',
        };

        reader.onload = function (e) {
            const base64Content = e.target.result.split(',')[1]; // Extrae el contenido base64   

            jsonData.archivo = {
                nombre: file.name,
                tipo: file.type,
                contenido: base64Content,
            };
        }

        reader.readAsDataURL(file);
        return jsonData;
    }
    return null
}

