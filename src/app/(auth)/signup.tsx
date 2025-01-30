import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { registerAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { SignUpSchema } from "@/utils/validate.schema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    marginHorizontal: 20,
    gap: 10,
  },
});
const SignUpPage = () => {
  const handleSignUp = async (
    email: string,
    password: string,
    name: string
    //confirm_password: string
  ) => {
    try {
      const res = await registerAPI(email, password, name);
      //confirm_password);
      if (res.data) {
        //await AsyncStorage.setItem("access_token", res.data.access_token);
        // setAppState(res.result);
        router.replace({ pathname: "/(auth)/verify", params: { email } });
      } else {
        const message = Array.isArray(res.message)
          ? res.message[0]
          : res.message;
        Toast.show(message, {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: "red",
          opacity: 1,
        });
      }
      console.log(">>> check response data", res.data);
    } catch (error) {
      console.log(">>> check error", error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        validationSchema={SignUpSchema}
        initialValues={{
          email: "",
          password: "",
          name: "",
          //confirm_password: "",
        }}
        onSubmit={(values) =>
          handleSignUp(
            values.email,
            values.password,
            values.name
            //values.confirm_password
          )
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.container}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 600,
                  marginVertical: 30,
                }}
              >
                Đăng ký tài khoản
              </Text>
            </View>
            {/* Input */}
            <ShareInput
              title="Họ và tên"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              error={errors.name}
            />
            <ShareInput
              title="Email"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              error={errors.email}
            />
            <ShareInput
              title="Mật khẩu"
              secureTextEntry={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={errors.password}
            />
            {/* <ShareInput
              title="Nhập lại Mật khẩu"
              secureTextEntry={true}
              onChangeText={handleChange("confirm_password")}
              onBlur={handleBlur("confirm_password")}
              value={values.confirm_password}
              error={errors.confirm_password}
            /> */}
            <View style={{ marginVertical: 10 }}></View>
            <ShareButton
              onPress={handleSubmit}
              title="Đăng Ký"
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
                Đã có tài khoản?
              </Text>
              <Link href={"/(auth)/login"}>
                <Text
                  style={{ color: "black", textDecorationLine: "underline" }}
                >
                  Đăng nhập
                </Text>
              </Link>
            </View>
            <SocialButton title="Đăng kí với" />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};
export default SignUpPage;
