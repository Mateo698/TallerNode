# Configuración del Proyecto Node.js

¡Bienvenido al proyecto! Antes de comenzar, es necesario configurar algunas variables de entorno para asegurarnos de que todo funcione correctamente. Sigue los pasos a continuación para configurar tu entorno de desarrollo.

## Pasos de Configuración

1. **Crea un archivo `.env` en la raíz del proyecto.**

   ```plaintext
   touch .env
   ```

2. **Edita el archivo `.env` con las siguientes variables:**

   ```plaintext
   PORT=3000  # Puedes cambiar el número de puerto según tus preferencias
   MONGO_URI=tu_url_de_conexion_a_MongoDB
   JWT_SECRET=una_clave_secreta_para_la_generacion_de_JWT
   ```

   Asegúrate de reemplazar `tu_url_de_conexion_a_MongoDB` con la URL real de tu base de datos MongoDB y `una_clave_secreta_para_la_generacion_de_JWT` con una clave segura para la generación de tokens JWT.

## Descripción de las Variables

- **PORT:** El número de puerto en el que el servidor estará escuchando. Puedes cambiarlo según tus necesidades, pero asegúrate de que no entre en conflicto con otros servicios que se ejecuten en tu máquina.

- **MONGO_URI:** La URL de conexión a tu base de datos MongoDB. Asegúrate de tener una base de datos MongoDB configurada y lista para usar. Puedes obtener la URL de conexión desde el panel de administración de MongoDB Atlas u otro proveedor de servicios de MongoDB.

- **JWT_SECRET:** Una clave secreta utilizada para firmar y verificar los tokens JWT (JSON Web Tokens) utilizados en la autenticación. Asegúrate de que sea una cadena segura y única.

## Ejemplo de Archivo `.env`

```plaintext
PORT=3000
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre_de_la_base_de_datos
JWT_SECRET=mi_clave_secreta_para_jwt
```

¡Listo! Con estas configuraciones el proyecto de Node.js debería estar listo para funcionar. Asegúrate de no compartir el archivo `.env` ni sus valores de variables de entorno, ya que contiene información sensible. Para correr el proyecto usa `npm run dev`
