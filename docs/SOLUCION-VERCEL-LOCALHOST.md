# 🔧 Solución: Vercel Va a localhost:3001

## El Problema ❌
Cuando despliegas en Vercel, la aplicación intenta conectar a `http://localhost:3001/api` en lugar de `https://react-native-expo-back.vercel.app/api`.

## La Causa
Expo carga variables de entorno en este orden de prioridad:
1. `.env.local` ← ⚠️ **Esto ganaba y causaba el problema**
2. `.env.{NODE_ENV}`
3. `.env`

Cuando subías el código a GitHub, `.env.local` se subía y Vercel lo usaba.

## La Solución ✅

### Paso 1: Configurar Variables en Vercel

**EN LA CONSOLA DE VERCEL:**

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Haz clic en "Settings"
3. Ve a "Environment Variables"
4. Añade una nueva variable:
   - **Name**: `EXPO_PUBLIC_API_URL`
   - **Value**: `https://react-native-expo-back.vercel.app/api`
   - **Environments**: Selecciona "Production", "Preview", "Development"
5. Haz clic en "Save"

### Paso 2: Redeployed en Vercel

1. Ve a "Deployments"
2. Haz clic en el último deployment
3. Haz clic en "Redeploy" para forzar un nuevo build

### Paso 3: Verificar en el Navegador

1. Abre tu app en Vercel
2. Abre DevTools (F12)
3. Ve a "Console"
4. Deberías ver:
```
🔧 Configuración de API
BASE_URL: https://react-native-expo-back.vercel.app/api
EXPO_PUBLIC_API_URL: https://react-native-expo-back.vercel.app/api
Entorno: 🌐 PRODUCCIÓN (Vercel)
```

## Cambios Realizados en el Código

### ✅ `vercel.json`
```json
{
  "buildCommand": "npm run build:production",
  "outputDirectory": "dist"
}
```
Ahora especifica usar `build:production` para que Expo se entere de que es producción.

### ✅ `package.json`
```json
{
  "build:local": "expo export -p web",
  "build:production": "cross-env NODE_ENV=production expo export -p web"
}
```
Distingue entre build local y producción.

### ✅ `.gitignore`
```
.env.local
.env.*.local
```
Ahora `.env.local` no se sube a GitHub, evitando que Vercel la use.

### ✅ `utils/debugAPI.ts`
Mejorado para mostrar claramente si estás en local o producción:
```
💻 LOCAL (Desarrollo)  ← Cuando ejecutas npm start
🌐 PRODUCCIÓN (Vercel) ← Cuando está en Vercel
```

### ✅ `docs/DESPLEGAR-VERCEL.md`
Nueva guía completa para desplegar sin problemas.

## ¿Cómo Verificar que Está Funcionando?

### En Local
```bash
npm run start:local
# Deberías ver:
# 💻 LOCAL (Desarrollo)
# [API] GET http://localhost:3001/api/notes
```

### En Vercel
Abre tu app en Vercel y en Console deberías ver:
```
🌐 PRODUCCIÓN (Vercel)
[API] GET https://react-native-expo-back.vercel.app/api/notes - Status: 200
```

## Checklist Final

- [ ] ✅ He añadido `EXPO_PUBLIC_API_URL` en Vercel Settings
- [ ] ✅ He hecho Redeploy en Vercel
- [ ] ✅ Abro DevTools y veo la URL correcta
- [ ] ✅ Las llamadas HTTP van a Vercel (no localhost)
- [ ] ✅ Los datos se cargan correctamente

## 🚨 Si Sigue Sin Funcionar

1. **Abre DevTools → Console**
2. **Busca el mensaje de configuración de API**
3. **Si dice `http://localhost:3001`:**
   - Verzel no está usando las variables de entorno
   - Intenta agregar un fichero `.env` en la raíz con:
     ```
     EXPO_PUBLIC_API_URL=https://react-native-expo-back.vercel.app/api
     ```
   - Haz push a GitHub
   - Vercel hará redeploy automáticamente

---

**¿Necesitas ayuda? Mira `docs/DESPLEGAR-VERCEL.md` para más detalles.**
