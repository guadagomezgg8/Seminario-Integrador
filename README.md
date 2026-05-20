# Sistema de Gestión y Reserva de Canchas Deportivas

Sistema web desarrollado como MVP académico para la carrera de Ingeniería en Sistemas de Información.  
La aplicación permite la gestión de complejos deportivos y la reserva online de canchas mediante distintos roles de usuario.

---

# Tecnologías utilizadas

## Backend
- NestJS
- Node.js
- TypeScript
- TypeORM
- PostgreSQL
- JWT Authentication
- Postman

## Frontend
- React
- Vite
- Axios
- React Router
- Tailwind CSS

## Herramientas
- Git
- GitHub

---

# Funcionalidades principales

## Clientes
- Registro e inicio de sesión
- Autenticación mediante JWT
- Búsqueda de complejos deportivos
- Filtros por nombre y localidad
- Visualización de complejos y canchas
- Consulta de horarios disponibles
- Reserva de canchas
- Visualización de reservas personales
- Perfil de usuario

## Administradores
- Registro como administrador
- Gestión de complejos deportivos
- Registro y administración de canchas
- Gestión de disponibilidades
- Visualización de reservas pendientes
- Panel administrativo
- Generación de estadísticas e informes

---

# Características técnicas

## Backend
- Arquitectura multicapa
- API REST
- DTOs y validaciones
- Guards para autenticación y autorización
- Manejo de roles
- Relaciones complejas con TypeORM
- Persistencia relacional con PostgreSQL

## Frontend
- SPA (Single Page Application)
- Navegación dinámica con React Router
- Consumo de API REST
- Manejo de estados con Hooks
- Formularios dinámicos
- Renderizado dinámico de datos

---

# Arquitectura del sistema

## Backend
El backend fue desarrollado utilizando una arquitectura multicapa basada en:

- Controllers
- Services
- Repositories
- Entities
- DTOs
- Guards

## Frontend
El frontend fue estructurado mediante arquitectura basada en componentes:

- Pages
- Components
- API Services
- Routing

---

# Entidades principales

## Usuario
- Registro
- Login
- Roles

## Complejo
- Nombre
- Dirección
- Teléfono
- Localidad
- Rango horario
- Canchas

## Cancha
- Tipo
- Precio
- Disponibilidades
- Complejo asociado

## Reserva
- Fecha
- Hora inicio
- Hora fin
- Estado
- Cliente
- Cancha

## Disponibilidad
- Horarios disponibles por cancha

---

# Mi participación en el proyecto

## Backend
- Diseño de entidades y relaciones con TypeORM
- Implementación de autenticación JWT
- Desarrollo de endpoints REST
- Implementación de roles y guards
- Lógica de reservas y validación de disponibilidad
- Gestión automática de horarios
- Integración con PostgreSQL
- Validaciones mediante DTOs

## Frontend
- Integración frontend-backend mediante Axios
- Implementación de login y registro
- Integración de búsqueda y filtros
- Manejo de estados y renderizado dinámico
- Navegación entre pantallas

## Análisis y testing
- Participación en análisis funcional
- Diseño del sistema
- Modelado de datos
- Testing y validación de funcionalidades

---

# Problemas técnicos resueltos

- Manejo de autenticación y autorización con JWT
- Validación de roles mediante Guards
- Filtrado dinámico de complejos y canchas
- Manejo de relaciones anidadas con TypeORM
- Control de disponibilidad de reservas
- Persistencia y sincronización entre frontend y backend
- Corrección de errores de tipado en TypeScript
- Manejo de rutas dinámicas con React Router

---

# Posibles mejoras futuras

- Pagos online
- Notificaciones automáticas
- Estadísticas avanzadas
- Calendario interactivo
- Sistema de puntuación y reseñas
- Subida de imágenes
- Dashboard administrativo avanzado
- Dockerización completa
- Deploy en la nube

---

# Estado del proyecto

Proyecto académico desarrollado como MVP universitario.  
Actualmente el backend se encuentra mayormente implementado y funcional.

---
