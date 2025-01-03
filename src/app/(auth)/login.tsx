import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import { loginApi } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { LoginSchema } from "@/utils/validate.schema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    gap: 10,
  },
});

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAppState } = useCurrentApp();

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await loginApi(email, password);
      setLoading(false);
      if (res.data) {
        await AsyncStorage.setItem("access_token", res.data.access_token);
        setAppState(res.data);
        router.replace("/(tabs)");
      } else {
        const m = Array.isArray(res.message) ? res.message[0] : res.message;

        Toast.show(m, {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.ORANGE,
          opacity: 1,
        });

        if (res.statusCode === 400) {
          router.replace({
            pathname: "/(auth)/verify",
            params: { email: email, isLogin: 1 },
          });
        }
      }
    } catch (error) {
      console.log(">>> check error: ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        validationSchema={LoginSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleLogin(values.email, values.password)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 600,
                  marginVertical: 30,
                }}
              >
                Đăng nhập
              </Text>
            </View>

            <ShareInput
              title="Email"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />

            <ShareInput
              title="Password"
              secureTextEntry={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={errors.password}
              touched={touched.password}
            />

            <View style={{ marginVertical: 10 }}>
              <Text
                onPress={() => router.navigate("/(auth)\request.password")}
                style={{
                  textAlign: "center",
                  color: APP_COLOR.ORANGE,
                }}
              >
                Quên mật khẩu ?
              </Text>
            </View>
            <ShareButton
              loading={loading}
              title="Đăng Nhập"
              onPress={handleSubmit as any}
              textStyle={{
                textTransform: "uppercase",
                color: "#fff",
                paddingVertical: 5,
              }}
              btnStyle={{
                justifyContent: "center",
                borderRadius: 30,
                marginHorizontal: 50,
                paddingVertical: 10,
                backgroundColor: APP_COLOR.ORANGE,
              }}
              pressStyle={{ alignSelf: "stretch" }}
            />

            <View
              style={{
                marginVertical: 15,
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "black",
                }}
              >
                Chưa có tài khoản?
              </Text>
              <Link href={"/(auth)/signup"}>
                <Text
                  style={{
                    color: APP_COLOR.ORANGE,
                    textDecorationLine: "underline",
                  }}
                >
                  Đăng ký.
                </Text>
              </Link>
            </View>

            <SocialButton title="Đăng nhập với" />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default LoginPage;
