# Configuración de Entornos - Local y Producción

## Variables de Entorno

El proyecto utiliza variables de entorno para cambiar la URL del API según el entorno de ejecución.

### Archivos de Configuración

- `.env.local` - Configuración para desarrollo local
  - `EXPO_PUBLIC_API_URL=http://localhost:3001/api`

- `.env.production` - Configuración para producción
  - `EXPO_PUBLIC_API_URL=https://react-native-expo-back.vercel.app/api`

- `.env` - Variables compartidas entre entornos (opcional)

## Cómo Ejecutar

### Local (Desarrollo)
```bash
npm run start:local
# o simplemente
npm start
```

Usa la configuración de `.env.local` y conecta a `http://localhost:3001/api`

### Producción
```bash
npm run start:production
```

Usa la configuración de `.env.production` y conecta a `https://react-native-expo-back.vercel.app/api`

### Build para Producción
```bash
npm run build:production
```

## Información Técnica

- Las variables de entorno se cargan automáticamente desde el archivo `.env*` apropiado
- En `lib/api.ts`, la URL base se obtiene de `process.env.EXPO_PUBLIC_API_URL`
- El prefijo `EXPO_PUBLIC_` es necesario en Expo para que las variables sean públicas
- `cross-env` se utiliza para garantizar compatibilidad con Windows PowerShell

## Verificar la Configuración

En cualquier momento, puedes verificar qué URL se está usando:
```bash
npm run typecheck
```

O inspeccionando en la consola de tu aplicación el valor de `process.env.EXPO_PUBLIC_API_URL`
