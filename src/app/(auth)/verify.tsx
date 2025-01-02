import LoadingOverlay from "@/components/loading/overlay";
import { verifyCodeAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import Toast from "react-native-root-toast";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: "600",
    marginVertical: 20,
  },
});
const VerifyPage = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const handleCellTextChange = async (text: string, i: number) => {
    if (i === 5 && text) {
      setIsSubmit(true);
      Keyboard.dismiss();
      setIsSubmit(false);
      //call api
      const res = await verifyCodeAPI("admin1@gmail.com", "123456");
      if (res.data) {
        //success
        alert("success");
      } else {
        Toast.show(res.message as string, {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: "red",
          opacity: 1,
        });
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}> Xác thực tài khoản</Text>
        <Text style={{ marginVertical: 10 }}>
          Vui lòng nhập mã xác nhận đã được gửi tới địa chỉ username@gmail.com
        </Text>
        <View style={{ marginVertical: 20 }}>
          <OTPTextView
            handleCellTextChange={handleCellTextChange}
            autoFocus
            inputCount={6}
            inputCellLength={1}
            tintColor={APP_COLOR.ORANGE}
            textInputStyle={{
              borderWidth: 1,
              borderColor: APP_COLOR.GREY,
              borderBottomWidth: 1,
              borderRadius: 5,
              // @ts-ignore:next-line
              color: APP_COLOR.ORANGE,
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Text>Không nhận được mã xác nhận,</Text>
          <Text style={{ textDecorationLine: "underline" }}> gửi lại</Text>
        </View>
      </View>
      {isSubmit && <LoadingOverlay />}
    </>
  );
};

export default VerifyPage;
