# Verificar Conexión Front-Back

## ¿Cómo saber si el front está invocando al back?

### 1. **Verificar en la Consola de la Aplicación**

Al iniciar la aplicación, deberías ver en la consola de Expo:

```
[API] BASE_URL configurada: http://localhost:3001/api
[API] EXPO_PUBLIC_API_URL: http://localhost:3001/api
🔧 Configuración de API
```

Esto confirma que la URL está correctamente cargada.

### 2. **Verificar Llamadas HTTP**

En la consola deberías ver mensajes como:

```
[API] GET http://localhost:3001/api/notes
[API] GET http://localhost:3001/api/notes - Status: 200
```

- **Si ves Status 200**: ✅ La API respondió correctamente
- **Si ves un error de conexión**: ❌ El back no está disponible o la URL es incorrecta
- **Si ves Status 4xx o 5xx**: ⚠️ Hay un error en el servidor

### 3. **Función de Debug en Consola**

Si estás usando Expo, puedes abrir la consola de tu dispositivo/emulador y ejecutar:

```javascript
// Ver configuración
__debugAPI.config()

// Probar conexión
__debugAPI.test()
```

### 4. **Herramientas de Red**

**En navegador web (si ejecutas `npm run web`):**
- Abre DevTools (F12)
- Ve a la pestaña **Network**
- Filtra por **Fetch/XHR**
- Deberías ver las llamadas a `/notes`

**En dispositivo Android/iOS:**
- Usa Expo DevTools
- Verifica los logs en tiempo real

### 5. **Verificar Manualmente**

Ejecuta este comando en tu terminal:

```bash
# Prueba local
curl http://localhost:3001/api/notes

# Prueba producción
curl https://react-native-expo-back.vercel.app/api/notes
```

## Checklist para Debugging

- [ ] ¿El back está ejecutándose? (`npm start` en el directorio del back)
- [ ] ¿La URL en `.env.local` es correcta?
- [ ] ¿Ves los logs `[API]` en la consola al iniciar?
- [ ] ¿El status HTTP es 200 o un error?
- [ ] ¿Hay errores de CORS en la consola?

## Posibles Problemas y Soluciones

### "Error al conectar con la API"
```
❌ Problema: El back no está disponible
✅ Solución: Asegúrate de que el back esté ejecutándose en http://localhost:3001
```

### "CORS error"
```
❌ Problema: El back no tiene CORS habilitado para el origen del front
✅ Solución: Verifica la configuración de CORS en el back
```

### "Error 404"
```
❌ Problema: La ruta no existe en el back
✅ Solución: Verifica que `/notes` esté implementada en el back
```

### "Error 500"
```
❌ Problema: Error en el servidor del back
✅ Solución: Revisa los logs del back para ver qué falló
```

## Variables de Entorno Actuales

**Local (`.env.local`):**
```
EXPO_PUBLIC_API_URL=http://localhost:3001/api
```

**Producción (`.env.production`):**
```
EXPO_PUBLIC_API_URL=https://react-native-expo-back.vercel.app/api
```

---

**Última revisión:** 4 de junio de 2026
