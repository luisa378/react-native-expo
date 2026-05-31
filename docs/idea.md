# NoteFlow

## Problema que resuelve

NoteFlow centraliza tres formas habituales de captura personal: notas largas, listas de tareas e ideas rapidas. Evita que el usuario reparta informacion entre chats, capturas, documentos sueltos y apps distintas.

## Usuario objetivo

El usuario principal es una persona que estudia, trabaja en proyectos o necesita organizar informacion durante el dia. Usaria la app para guardar apuntes despues de clase, convertir pendientes en checklists y capturar ideas antes de que se pierdan.

## Funcionalidades principales

- Tres secciones principales: notas, tareas e ideas.
- Creacion de contenido desde un modal comun adaptado al tipo elegido.
- Validacion de formularios con mensajes de error claros.
- Listas de alto rendimiento con FlashList.
- Estado global con Zustand.
- Persistencia local con AsyncStorage.
- Detalle de cada elemento y eliminacion con confirmacion.
- Busqueda en tiempo real por seccion.
- Tema claro y oscuro usando el color del sistema.

## Funcionalidades opcionales

- Archivado en lugar de eliminacion definitiva.
- Edicion de contenido ya creado.
- Recordatorios y notificaciones.
- Sincronizacion entre dispositivos.
- Etiquetas globales y filtros avanzados.
- Exportacion de notas.

## Decisiones de diseno

- La primera pantalla es la app util, no una landing. NoteFlow se entiende mejor entrando directamente a las listas.
- Las tarjetas tienen estilos distintos por tipo: notas con extracto, tareas con progreso e ideas con chips y color.
- Se usa una paleta clara con acentos azul, verde, ambar y coral para separar estados sin depender de un solo color.
- Los radios se mantienen en 8 px o menos para que la interfaz parezca una herramienta de productividad, no una pagina promocional.
- La busqueda vive dentro de cada pestaña porque el usuario normalmente recuerda el tipo de contenido que esta buscando.
