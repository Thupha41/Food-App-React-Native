import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

  const TabApp = () => {
    return <Tab.Navigator></Tab.Navigator>;
  };

  const StackApp = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabApp}
          options={{ title: "Trang chủ", headerShown: false }}
        />
        <Stack.Screen
          name="HomeDetail"
          component={HomeDetail}
          options={({ route }: { route: any }) => ({
            headerTitle: `Xem chi tiết ${route?.params?.userId ?? ""}`,
          })}
        />
        <Stack.Screen name="LikeDetail" component={LikeDetail} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="StackApp" component={StackApp} />
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
