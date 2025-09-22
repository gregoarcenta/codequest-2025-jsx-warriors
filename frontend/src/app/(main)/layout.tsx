"use client";
import React, {useEffect} from 'react';

export default function Home() {
    useEffect(() => {
        // Definimos la URL de tu API usando la variable de entorno
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            console.error('La variable de entorno NEXT_PUBLIC_API_URL no está definida.');
            return;
        }

        // Hacemos la petición GET
        fetch(`${apiUrl}/api/posts/published`)
            .then(response => {
                // Verificamos que la respuesta sea exitosa
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue exitosa.');
                }
                return response.json();
            })
            .then(data => {
                // Mostramos los datos en la consola
                console.log('Datos de la API:', data);
            })
            .catch(error => {
                // Mostramos el error si la petición falla
                console.error('Hubo un problema con la petición:', error);
            });
    }, []);

    return (
        <div>
            <h1>Revisar la consola para ver los datos</h1>
        </div>
    );
}
