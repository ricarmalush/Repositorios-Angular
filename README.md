Descripción del Proyecto
Este repositorio contiene la aplicación frontend, desarrollada con Angular y TypeScript, que sirve como interfaz de usuario para el sistema de control de fichajes de empleados. La aplicación se comunica con el backend creado en .NET, el cual se encarga de la gestión de datos, la lógica de negocio y la persistencia de la información de fichajes.

Juntos, estos dos proyectos forman una solución completa y robusta que incluye las siguientes funcionalidades:

Registro de fichaje con geolocalización: Los empleados pueden registrar su entrada y salida, y la aplicación almacena la ubicación del fichaje para garantizar la exactitud.

Gestión de empleados: Una interfaz para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre la información de los empleados.

Manejo de tiempos y permisos: Gestión de horas trabajadas, vacaciones, días festivos y permisos de trabajo.

Tecnologías y Arquitectura
Framework: Angular

Lenguaje: TypeScript

Patrones de diseño: Sólida implementación de los Principios SOLID

Funcionalidades:

Geolocalización: Utilización de la API de geolocalización para registrar la ubicación en cada fichaje.

Autenticación: Comunicación segura con el backend para la autenticación y autorización de usuarios.

Pruebas: Inclusión de Test Unitarios para garantizar la calidad del código

Backend: Este frontend está diseñado para funcionar con un backend desarrollado en .NET, el cual se encuentra en un repositorio separado.
