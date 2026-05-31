# React Native y arquitectura de NoteFlow

## React Native frente a una app web

React Native no renderiza HTML dentro de un WebView. Los componentes como `View`, `Text` o `Pressable` se traducen a vistas nativas del sistema operativo. Por eso la app se comporta como una aplicacion movil real y no como una pagina web incrustada.

## Hilos de ejecucion

La logica React corre en el hilo de JavaScript y la interfaz se renderiza en el hilo nativo de UI. Si el hilo de JavaScript se bloquea con calculos pesados, la interfaz puede dejar de responder. En NoteFlow se mantiene la logica de renderizado simple y se usa FlashList para listas largas.

## Metro bundler

Metro es el empaquetador que transforma TypeScript y JavaScript para que Expo y React Native puedan cargar la app durante desarrollo. Tambien resuelve imports, assets y recarga la app cuando cambia el codigo.

## Expo Go y Development Build

Expo Go es suficiente para probar una app con APIs compatibles con Expo. En proyectos reales con modulos nativos personalizados conviene usar Development Build, porque genera un binario propio con las dependencias nativas exactas del proyecto.

## Sistema de diseno

Se eligio React Native Paper como libreria UI porque ofrece componentes accesibles, tema claro/oscuro y una integracion sencilla con Expo. Gluestack UI es muy flexible y cercana a Tailwind, pero para esta primera version Paper permite avanzar mas rapido sin crear tantos componentes base.

Los tokens visuales viven en `constants/theme.ts`: paleta, espaciado, radios y temas Paper. La app usa `useColorScheme` para respetar el modo claro u oscuro del dispositivo.

## Navegacion

Expo Router define las rutas con archivos:

- Tabs: `app/(tabs)/_layout.tsx`.
- Listados: `notas`, `checklists` e `ideas`.
- Detalle: rutas dinamicas `[id].tsx`.
- Modal: `app/nueva-nota.tsx`.

Las pestañas separan areas de trabajo frecuentes. El stack permite entrar al detalle y volver. El modal se usa para crear contenido porque es una tarea breve que debe sentirse temporal.

## Modelado de datos

Los tipos principales estan en `types/index.ts`: `Note`, `ChecklistNote`, `IdeaNote` y la union `AnyNote`. Cada tipo tiene un campo `type`, que actua como discriminante para aplicar type guards de forma segura.

Las fechas se guardan como cadenas ISO. Es mas fiable para persistencia JSON con AsyncStorage y evita problemas al rehidratar objetos `Date`.

## Gestion de estado

Zustand se usa porque no requiere providers anidados y permite seleccionar partes concretas del estado. Esto reduce renders innecesarios frente a un contexto global amplio.

El store vive en `store/notesStore.ts` y contiene datos, acciones de creacion, eliminacion, busqueda por id y alternancia de tareas completadas.

## Persistencia

AsyncStorage guarda el estado en el dispositivo mediante `persist` y `createJSONStorage`. Durante la rehidratacion, `hasHydrated` permite mostrar un estado de carga y evita que la interfaz asuma datos antes de leer el almacenamiento local.

AsyncStorage no cifra datos y no esta pensado para informacion sensible. NoteFlow lo usa para productividad personal de bajo riesgo.

## Rendimiento en listas

FlashList recicla elementos de forma mas agresiva que FlatList. En la version instalada, FlashList 2 mide y gestiona el layout sin la propiedad historica `estimatedItemSize`, asi que `ContentList` se centra en encapsular `data`, `keyExtractor` y `renderItem` para mantener el patron consistente en las tres pestañas.

## Formularios y validacion

El modal `app/nueva-nota.tsx` adapta los campos al tipo de contenido. Zod valida titulo, contenido, tareas y etiquetas antes de guardar. Los errores se muestran debajo del campo afectado.

## Pulido de UX

Se usa feedback tactil al guardar, completar checklists y eliminar contenido. La eliminacion pide confirmacion mediante `Alert.alert` para evitar perdidas accidentales.
