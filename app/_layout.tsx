import { Stack } from "expo-router";
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context";
import "../global.css"

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="LogIn" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="completeProfile" options={{ headerShown: false }} />
          <Stack.Screen name="CompleteProfileTaller" options={{ headerShown: false }} />
          <Stack.Screen name="CompleteProfilePersona" options={{ headerShown: false }} />
       </Stack>
    </SafeAreaView>
  </SafeAreaProvider>
  )
}
