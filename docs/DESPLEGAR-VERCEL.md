# Guía: Desplegar en Vercel

## 🚀 Pasos para Desplegar

### 1. **Conectar Repositorio en Vercel**
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta
3. Haz clic en "Add New" → "Project"
4. Selecciona tu repositorio de GitHub
5. Haz clic en "Import"

### 2. **Configurar Variables de Entorno en Vercel**

Este es el paso **CRÍTICO** para que funcione correctamente.

**En la página de configuración del proyecto en Vercel:**

1. Ve a "Settings" → "Environment Variables"
2. Añade esta variable:

| Nombre | Valor |
|--------|-------|
| `EXPO_PUBLIC_API_URL` | `https://react-native-expo-back.vercel.app/api` |

> **Importante:** Asegúrate de que esté disponible en todos los entornos (Production, Preview, Development)

### 3. **Configuración de Build**

El archivo `vercel.json` ya está configurado para:
- Usar el comando `npm run build:production`
- Usar la carpeta `dist` como output
- Reescribir todas las rutas a `index.html` (necesario para SPA)

### 4. **Desplegamiento**

1. El despliegue se iniciará automáticamente
2. Espera a que compile y termine (3-5 minutos)
3. Verifica que no hay errores en los logs

## 🔍 Verificar después de Desplegar

### Paso 1: Abrir la Aplicación
- Tu app estará disponible en una URL como: `https://noteflow-xxxxx.vercel.app`

### Paso 2: Abrir DevTools (F12)
- Ve a "Console"
- Deberías ver:
```
[API] BASE_URL configurada: https://react-native-expo-back.vercel.app/api
[API] GET https://react-native-expo-back.vercel.app/api/notes - Status: 200
```

### Paso 3: Verificar en la Pestaña Network
- Busca llamadas a `https://react-native-expo-back.vercel.app/api/notes`
- Deben tener status **200** (no 404 o error de conexión)

## ❌ Si Sigue Yendo a localhost:3001

### Síntomas
```
[API] BASE_URL configurada: http://localhost:3001/api
[API] GET http://localhost:3001/api/notes - Status: 0 (Error)
```

### Causas Comunes

**1. Variable de Entorno no Configurada**
- Solución: Ve a Vercel Settings → Environment Variables
- Agrega `EXPO_PUBLIC_API_URL=https://react-native-expo-back.vercel.app/api`

**2. `.env.local` sigue siendo usado**
- Solución: Vercel ignora `.env.local` automáticamente en build
- Pero si hay problemas, puedes eliminar `.env.local` del repositorio

**3. Cache de Vercel**
- Solución: Ve a Settings → General → Redeploy
- Haz clic en "Redeploy" para forzar un nuevo build

## 📝 Comparación de Entornos

### Local (Desarrollo)
```
npm run start:local
→ Usa .env.local
→ EXPO_PUBLIC_API_URL=http://localhost:3001/api
```

### Vercel (Producción)
```
Después de push a main/master
→ Usa variables de Vercel
→ EXPO_PUBLIC_API_URL=https://react-native-expo-back.vercel.app/api
```

## 🚨 Troubleshooting

| Problema | Causa | Solución |
|----------|-------|----------|
| CORS error | El back no acepta solicitudes de Vercel | Configura CORS en el back con `https://your-vercel-app.vercel.app` |
| 404 en `/api/notes` | Ruta no existe en el back | Verifica que el back tiene `/api/notes` implementado |
| Timeout | El back está lento o no responde | Revisa si el back está en línea |
| Datos vacíos | El back conecta pero no hay datos | Crea datos de prueba en el back |

## 📚 Referencias Útiles

- [Documentación de Vercel - Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Documentación de Expo - Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [CORS en Vercel](https://vercel.com/docs/concepts/solutions/cors)

---

**Última actualización:** 4 de junio de 2026
