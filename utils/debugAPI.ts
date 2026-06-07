/**
 * Utilidad para verificar la configuración de la API
 * Úsala en la consola o en tu app para debugging
 */

export function debugAPIConfig() {
  const baseURL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001/api";
  const isProduction = baseURL.includes("vercel.app");
  const isLocal = baseURL.includes("localhost");

  const config = {
    "BASE_URL": baseURL,
    "EXPO_PUBLIC_API_URL": process.env.EXPO_PUBLIC_API_URL,
    "Entorno": isProduction ? "🌐 PRODUCCIÓN (Vercel)" : isLocal ? "💻 LOCAL (Desarrollo)" : "❓ DESCONOCIDO",
    "NODE_ENV": process.env.NODE_ENV,
    "__DEV__": __DEV__,
  };

  console.group("🔧 Configuración de API");
  Object.entries(config).forEach(([key, value]) => {
    const isWarning = key === "Entorno";
    const style = isWarning ? "color: orange; font-weight: bold;" : "";
    console.log(`%c${key}: ${value}`, style);
  });
  console.groupEnd();

  return config;
}

export function testAPIConnection() {
  const baseURL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001/api";
  
  console.group("🧪 Probando conexión a API");
  console.log("URL del API:", baseURL);
  
  fetch(`${baseURL}/notes`)
    .then(res => {
      console.log(`✅ Conexión exitosa - Status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(`📦 Datos recibidos: ${Array.isArray(data) ? data.length + " elementos" : "respuesta válida"}`);
      console.table(data);
    })
    .catch(error => {
      console.error(`❌ Error de conexión: ${error.message}`);
    })
    .finally(() => {
      console.groupEnd();
    });
}

// Exportar como global para acceso en consola
if (typeof global !== 'undefined') {
  (global as any).__debugAPI = {
    config: debugAPIConfig,
    test: testAPIConnection
  };
}
