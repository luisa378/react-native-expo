# Decisiones de diseno de NoteFlow

## Pantallas

- `Notas`: captura informacion larga con titulo, fecha y extracto.
- `Tareas`: muestra progreso de checklist para que el usuario vea avance sin abrir el detalle.
- `Ideas`: usa chips y color de fondo para diferenciar capturas rapidas.
- `Nuevo contenido`: modal unico con control segmentado para evitar tres formularios separados.
- `Detalle`: pantalla simple con contenido completo y accion de eliminacion.

## Interaccion

- El boton `Nuevo` esta en cada pestaña para reducir desplazamientos.
- La busqueda filtra en tiempo real y no modifica el estado persistido.
- Las tareas se completan desde el detalle para evitar toques accidentales en la lista.

## Visual

- Interfaz de herramienta: jerarquia clara, cards discretas y sin elementos decorativos pesados.
- Paleta con varios acentos para distinguir tipos y estados.
- Componentes Paper para mantener consistencia entre Android, iOS y web.
