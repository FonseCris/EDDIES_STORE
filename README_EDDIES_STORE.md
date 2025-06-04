# Documentación del Proyecto: EDDIES_STORE

## GitHub

### Requisitos mínimos para la instalación

- Node.js (versión 18 o superior)
- NPM (viene incluido con Node.js)
- MongoDB (local o Atlas)
- Git (opcional)
- Visual Studio Code u otro editor de código
- Navegador web moderno

### Paso a paso de la instalación

1. Clonar el repositorio:
   git clone https://github.com/tu-usuario/EDDIES_STORE.git
   cd EDDIES_STORE

2. Instalar las dependencias del backend:
   cd backend
   npm install

3. Crear el archivo `.env` en la carpeta backend con:
   PORT=5000
   MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/eddies_store

4. Ejecutar el servidor:
   npm start

5. Abrir el archivo `index.html` del frontend en el navegador o desplegarlo.

### Tipo de licencia

Licencia MIT: permite uso, modificación y distribución del código con fines personales o comerciales, manteniendo los créditos originales.

## Planeación de implantación

### Protocolo de transmisión de datos

- HTTP/HTTPS: comunicación cliente-servidor
- REST API: para gestión de productos, usuarios, órdenes
- JSON: formato de intercambio de datos
- Protocolo MongoDB: conexión entre backend y base de datos

### Características de los navegadores

Compatible con:
- Google Chrome ✅
- Mozilla Firefox ✅
- Microsoft Edge ✅
- Safari ✅
- Opera ✅
- Navegadores móviles ✅

Requiere soporte para: HTML5, CSS3, JavaScript ES6, Fetch API, Local Storage.

