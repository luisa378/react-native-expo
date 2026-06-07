import "react-native-gesture-handler";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { darkTheme, lightTheme } from "@/constants/theme";
import { useNotesStore } from "@/store/notesStore";
import { debugAPIConfig } from "@/utils/debugAPI";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const fetchContent = useNotesStore((state) => state.fetchContent);

  useEffect(() => {
    // Debug: mostrar configuración de API
    debugAPIConfig();
    
    // Cargar contenido al iniciar
    fetchContent();
  }, [fetchContent]);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="nueva-nota"
            options={{
              presentation: "modal",
              title: "Nuevo contenido"
            }}
          />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
