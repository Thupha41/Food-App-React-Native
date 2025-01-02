import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { registerAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { Link, router } from "expo-router";
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
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    try {
      const res = await registerAPI(email, password, name);
      if (res.data) {
        router.navigate("/(auth)/verify");
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
        <ShareInput title="Họ và tên" value={name} setValue={setName} />
        <ShareInput
          title="Email"
          keyboardType="email-address"
          value={email}
          setValue={setEmail}
        />
        <ShareInput
          title="Mật khẩu"
          secureTextEntry={true}
          value={password}
          setValue={setPassword}
        />
        <View style={{ marginVertical: 10 }}></View>
        <ShareButton
          onPress={handleSignUp}
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
          <Link href={"/(auth)/signup"}>
            <Text style={{ color: "black", textDecorationLine: "underline" }}>
              Đăng nhập
            </Text>
          </Link>
        </View>
        <SocialButton />
      </View>
    </SafeAreaView>
  );
};
export default SignUpPage;
