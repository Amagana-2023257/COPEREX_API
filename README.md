# Laboratorio #3 - API de Gestión de Empresas en la Feria "Interfer"

## Descripción

Este proyecto consiste en el desarrollo de una API backend utilizando **Node.js**, **Express** y **MongoDB** para gestionar la incorporación de nuevas empresas y socios a la feria "**Interfer**" de la empresa **COPEREX**. La API permitirá a los administradores registrar, visualizar, editar y generar reportes de las empresas participantes.

## Requisitos

### Autenticación y Seguridad

- La API debe contar con un sistema de autenticación para administradores.
- Se utilizarán **JWT** (o sesiones) para gestionar la autenticación.
- Se aplicarán todas las medidas de seguridad vistas durante el bimestre.

### Registro de Empresas

Los administradores podrán registrar empresas proporcionando:

- **Nombre de la empresa**
- **Nivel de impacto:** (Alto, Medio, Bajo)
- **Años de trayectoria:** Se registra el año de fundación de la empresa.
- **Categoría empresarial:** Por ejemplo, Agricultura, Finanzas, Construcción, Distribución, Energía, Salud, Alimentos, Manufactura, Retail, Bebidas, Medios, Seguros, Telecomunicaciones, Diversos, Logística, Industrial, Construcción/Inmobiliaria, etc.

*(Se podrán añadir campos adicionales si es necesario.)*

### Visualización de Empresas

Los administradores podrán:

- Visualizar un listado completo de empresas registradas.
- Filtrar y ordenar la información por:
  - **Años de trayectoria:** Año de fundación.
  - **Categoría empresarial**
  - **Orden alfabético:** (A-Z, Z-A)
  - **Orden por nivel de impacto:** (de Bajo a Alto o de Alto a Bajo)
- Editar la información de las empresas (sin opción para eliminarlas).

### Generación de Reportes

El sistema debe generar un reporte en formato Excel con todos los datos de las empresas registradas, para facilitar el análisis y la toma de decisiones estratégicas.

## Tecnologías Utilizadas

- **Node.js:** Entorno de ejecución para JavaScript.
- **Express:** Framework para construir la API.
- **MongoDB:** Base de datos NoSQL para almacenar la información de las empresas.
- **JWT:** Para la autenticación de los administradores.
- **Mongoose:** ODM para interactuar con MongoDB de manera más sencilla.
- **ExcelJS:** Librería para generar los reportes en formato Excel.

## Instalación

### Clona este repositorio

```bash
git clone https://github.com/tu_usuario/laboratorio-3.git
```

## Obtener todas las empresas o generar reporte (PARAMS)

- **Ordenar:** key: "sort" 
- A-Z "name" 
- Z-A "-name" 
- Bajo-Alto "-impactLevel"
- Alto-Bajo "impactLevel"

- **filtrar:** key: "filter" 
- {"category":"NombreCategoria"}

- {"name":"NombreEmpresa"}

- {"impactLevel":"nivel_Alto,Medio,Bajo"}

## El reporte se obtiene en postman 

regresa un acrhivo en binario y se tiene que guardar la respuesta en file en postman al lado izquiero hay 3 puntos dar alli y darle a save response to file y se selecciona la ruta