# Laboratorio #3 - API de Gestión de Empresas en la Feria "Interfer"
Descripción
Este proyecto consiste en el desarrollo de una API backend utilizando Node.js, Express y MongoDB para gestionar la incorporación de nuevas empresas y socios a la feria "Interfer" de la empresa COPEREX. La API permitirá a los administradores registrar, visualizar, editar y generar reportes de las empresas participantes.

# Requisitos
## Autenticación y Seguridad:

La API debe tener un sistema de autenticación para administradores.
JWT o sesiones deben ser utilizadas para gestionar la autenticación.
Se debe aplicar todas las medidas de seguridad vistas durante el bimestre.
Registro de Empresas:
Los administradores podrán registrar empresas proporcionando:

# Nivel de impacto
Años de trayectoria
Categoría empresarial
(Campos adicionales pueden ser añadidos si es necesario)
Visualización de Empresas:
Los administradores podrán:

Visualizar un listado completo de empresas registradas.
Filtrar y ordenar la información por:
Años de trayectoria
Categoría empresarial
Orden alfabético (A-Z, Z-A)
Editar la información de las empresas (sin opción para eliminarlas).
Generación de Reportes:

El sistema debe generar un reporte en formato Excel con todos los datos de las empresas registradas, para facilitar el análisis y la toma de decisiones estratégicas.
Tecnologías Utilizadas
Node.js: Entorno de ejecución para JavaScript.
Express: Framework para construir la API.
MongoDB: Base de datos NoSQL para almacenar la información de las empresas.
JWT: Para la autenticación de los administradores.
Mongoose: ODM para interactuar con MongoDB de manera más sencilla.
ExcelJS: Librería para generar los reportes en formato Excel.
Instalación

# Clona este repositorio:

## bash
Copiar
```bash
git clone https://github.com/tu_usuario/laboratorio-3.git
```
# Accede a la carpeta del proyecto:

## bash
Copiar
```bash
cd laboratorio-3
```

# Instala las dependencias:
## bash
Copiar
```bash
npm i
```
# Configura las variables de entorno en un archivo .env:

## env
Copiar
```bash
DB_URI=mongodb://localhost:27017/interfer
JWT_SECRET=tu_secreto_aqui
```
# Endpoints
1. POST /login
Descripción: Autenticación del administrador.
Requiere: Credenciales del administrador.
Respuesta: Token JWT.
2. POST /register
Descripción: Registrar una nueva empresa.
Requiere: Datos de la empresa (nombre, nivel de impacto, años de trayectoria, categoría).
Respuesta: Datos de la empresa registrada.
3. GET /companies
Descripción: Obtener el listado de todas las empresas registradas.
Requiere: Token JWT válido.
Respuesta: Lista de empresas.
4. GET /companies/:id
Descripción: Obtener los detalles de una empresa específica.
Requiere: Token JWT válido y el ID de la empresa.
Respuesta: Datos de la empresa solicitada.
5. PUT /companies/:id
Descripción: Editar la información de una empresa.
Requiere: Token JWT válido y el ID de la empresa.
Respuesta: Datos actualizados de la empresa.
6. GET /report
Descripción: Generar un reporte en formato Excel con la información de todas las empresas.
Requiere: Token JWT válido.
Respuesta: Archivo Excel descargable.
Seguridad
La autenticación se gestiona mediante JWT.
Se recomienda utilizar HTTPS en producción.
Validación de datos y medidas de seguridad de base de datos implementadas.
Ejecución
Para ejecutar la API en tu entorno local, usa el siguiente comando:

bash
Copiar
npm start
La API estará disponible en el puerto 3000 por defecto.

# Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, por favor sigue estos pasos:

Realiza un fork de este repositorio.
Crea una rama para tu característica (git checkout -b feature/nueva-caracteristica).
Realiza tus cambios y haz commit de ellos (git commit -am 'Añadir nueva característica').
Haz push a tu rama (git push origin feature/nueva-caracteristica).
Abre un pull request.
Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.