# TuCasa.click CRM — avance 0.1

## Qué incluye
- Panel general del CRM.
- Vista de leads con búsqueda y filtro por estado.
- Formulario para agregar leads de demostración.
- Vistas preliminares de oportunidades, actividades y asesores internos/externos.
- Diagrama visual del flujo propuesto `Formulario web → LEAD_RECIBIDO → LEAD`.
- Borrador SQL inicial en `schema.sql`.

## Cómo abrirlo hoy
1. Descomprimí el archivo ZIP.
2. Abrí `index.html` en Firefox o Chromium.
3. No requiere instalación ni servidor para ver el prototipo.

## Importante
Este avance es un **prototipo de interfaz**. Los registros agregados y los cambios de estado se mantienen solamente en la memoria de la página y se pierden al recargar. Los datos que aparecen son ficticios. Todavía no existe conexión con Java, NetBeans ni SQL.

## Cómo llevarlo a Java / NetBeans
La interfaz puede conservarse como HTML/CSS/JavaScript. Para convertirla en una aplicación web Java, una opción es usar Jakarta Servlets/JSP (según la versión del servidor) y JDBC para acceder a MySQL/MariaDB:
- `GET /api/leads`: listar leads.
- `POST /api/leads`: registrar un lead.
- `PATCH /api/leads/{id}/estado`: cambiar el estado.
- `GET /api/actividades`: consultar actividades.

Los endpoints son una propuesta, no están implementados en este prototipo.

## Reglas de integración a acordar con Gaia
- Campos que se reciben: nombre, teléfono, email, mensaje, propiedad, país, plataforma y anuncio de origen.
- Cómo se identifica de forma única un `LEAD_RECIBIDO`.
- Quién crea el registro en `LEAD` y cómo se devuelve/guarda el ID.
- Cómo se evita duplicar un lead cuando se reintenta enviar una consulta.
- Qué entidades compartidas y claves se usarán en la BD universal.

## SQL
`schema.sql` es un borrador conceptual para revisión. **No lo ejecutes directamente sobre la base de datos universal** hasta acordar nombres, claves foráneas, tablas compartidas y reglas con el equipo.
