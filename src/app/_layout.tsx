import AppProvider from "@/context/app.context";
import {
  DefaultTheme,
  ThemeProvider,
  DarkTheme,
} from "@react-navigation/native";
import { ErrorBoundaryProps, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, View, StyleSheet } from "react-native";
import { APP_COLOR, APP_FONT } from "@/utils/constants";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>Oops!</Text>
          <Text style={styles.errorSubtitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{error.message}</Text>
          <Button title="Try Again" onPress={retry} color={APP_COLOR.ORANGE} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.ORANGE,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorCard: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorTitle: {
    fontFamily: APP_FONT,
    fontSize: 45,
    color: APP_COLOR.ORANGE,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontFamily: APP_FONT,
    fontSize: 20,
    color: "#333",
    marginBottom: 16,
  },
  errorMessage: {
    fontFamily: APP_FONT,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
});

const RootLayout = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  return (
    <GestureHandlerRootView>
      <RootSiblingParent>
        <AppProvider>
          {/* <SafeAreaView style={{ flex: 1 }}> */}
          <ThemeProvider value={navTheme}>
            <Stack
              screenOptions={{
                headerTintColor: APP_COLOR.ORANGE,
                headerTitleStyle: {
                  color: "black",
                },
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="(auth)/login"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)/signup"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)/verify"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)/welcome"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)/request.password"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)/forgot.password"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)/search"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)/restaurants"
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen
                name="(auth)/popup.sale"
                options={{
                  headerShown: false,
                  animation: "fade",
                  presentation: "transparentModal",
                }}
              /> */}
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

              <Stack.Screen
                name="(user)/product/[id]"
                options={{ headerShown: false }}
                // options={{ headerTitle: "Sản phẩm" }}
              />

              <Stack.Screen
                name="(user)/product/create.modal"
                options={{
                  headerShown: false,
                  animation: "fade",
                  presentation: "transparentModal",
                }}
              />
              <Stack.Screen
                name="(user)/product/update.modal"
                options={{
                  headerShown: false,
                  animation: "fade",
                  presentation: "transparentModal",
                }}
              />

              <Stack.Screen
                name="(user)/product/place.order"
                options={{
                  headerTitle: "Xác nhận đơn hàng",
                  headerBackTitle: "Back",
                }}
              />

              <Stack.Screen
                name="(user)/account/info"
                options={{
                  headerTitle: "Cập nhật thông tin",
                  headerBackTitle: "Back",
                }}
              />

              <Stack.Screen
                name="(user)/account/password"
                options={{
                  headerTitle: "Cập nhật mật khẩu",
                  headerBackTitle: "Back",
                }}
              />
            </Stack>
          </ThemeProvider>
          {/* </SafeAreaView> */}
        </AppProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
