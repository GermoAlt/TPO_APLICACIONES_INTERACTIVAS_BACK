<h1 align="center">
  <br>
    <img src="https://github.com/GermoAlt/TPO_APLICACIONES_INTERACTIVAS_FRONT/blob/prueba-readme/src/logo.svg?raw=true" alt="gourmetic" width="250">
</h1>


<p align="center">
  <a href="#introducción">Introducción</a> •
  <a href="#información-general">Información general</a> •
  <a href="#requisitos">Requisitos</a> •
  <a href="#instalación">Instalación</a> •
  <a href="#configuración">Configuración</a> •
  <a href="#mondoDB">MondoDB</a>
</p>

## Introducción
**Gourmetic** es una aplicación web responsive para la gestión de recetas. Se divide en una parte frontend y otra backend.
* Este README corresponde al backend, el correspondiente al frontend se puede encontrar [acá](https://github.com/GermoAlt/TPO_APLICACIONES_INTERACTIVAS_FRONT/blob/prueba-readme/README.md).

## Información general
* El backend de **Gourmetic** está desarrollado con API REST NodeJS.

## Requisitos

:bulb: Antes de comenzar, asegúrese de tener todo lo siguiente instalado:

- [ Node.js v14 o superior ](https://nodejs.org/en/download/)
- [ npm v7 o superior ](https://github.blog/2020-10-13-presenting-v7-0-0-of-the-npm-cli/)
- [ Git ](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git/)

## Instalación

Para clonar y ejecutar esta aplicación, necesitará [Git](https://git-scm.com) y [Node.js](https://nodejs.org/en/download/) (que viene con [npm](http://npmjs.com)) instalados en su computadora.

```bash
# Clone this repository
$ git clone https://github.com/GermoAlt/TPO_APLICACIONES_INTERACTIVAS_BACK.git
# Go into the repository
$ cd 
# Install dependencies
$ npm install
# Run the app
$ 
```

## Configuración

### Base de datos
Para la persistencia de datos se utiliza [MongoDB](https://www.mongodb.com/es) con integración de [Mongoose](https://mongoosejs.com/) para el modelado.
* La conexión de MongoDB se encuentra en la clase `main.js` y los datos de configuración en `env.config.js`:
```jsx
    "URI": "mongodb://",
    "HOST":"localhost",
    "PORTDB":27017,
    "DATABASE": "recetas",
```
### Cloudinary
Tiene integración con [Cloudinary](https://cloudinary.com/) para subir las imágenes que se cargan en las recetas. Se deberá contar con una cuenta.
* Los datos de configuración se encuentran en `env.config.js`:
```jsx
    "CLOUD_NAME": "Replace with Cloudinary Cloud Name",
    "API_KEY": "Replace with Cloudinary API Key",
    "API_SECRET": "Replace with Cloudinary Secret Key"
```

## MondoDB

grafico

##
