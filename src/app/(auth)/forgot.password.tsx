import ShareButton from "@/components/button/share.button";
import ShareInput from "@/components/input/share.input";
import { forgotPasswordAPI, loginAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { ForgotPasswordSchema } from "@/utils/validate.schema";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    gap: 10,
  },
});

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { email } = useLocalSearchParams();

  const handleForgotPassword = async (code: string, password: string) => {
    try {
      setLoading(true);
      const res = await forgotPasswordAPI(code, email as string, password);
      setLoading(false);
      if (res.data) {
        Toast.show("Thay đổi mật khẩu thành công.", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.ORANGE,
          opacity: 1,
        });
        router.replace("/(auth)/login");
      } else {
        const m = Array.isArray(res.message) ? res.message[0] : res.message;

        Toast.show(m, {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.ORANGE,
          opacity: 1,
        });
      }
    } catch (error) {
      console.log(">>> check error: ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        validationSchema={ForgotPasswordSchema}
        initialValues={{
          code: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) =>
          handleForgotPassword(values.code, values.password)
        }
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
                Thay đổi mật khẩu
              </Text>
            </View>

            <ShareInput
              title="Mã code xác thực"
              onChangeText={handleChange("code")}
              onBlur={handleBlur("code")}
              value={values.code}
              error={errors.code}
              touched={touched.code}
            />

            <ShareInput
              title="Mật khẩu mới"
              secureTextEntry={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={errors.password}
              touched={touched.password}
            />

            <ShareInput
              title="Xác nhận mật khẩu mới"
              secureTextEntry={true}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

            <View style={{ marginVertical: 10 }}></View>
            <ShareButton
              loading={loading}
              title="Reset Password"
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
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ForgotPasswordPage;
