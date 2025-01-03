import { View, Text, StyleSheet, Image } from "react-native";
import TextBetweenLine from "./text.between.line";
import ShareButton from "./share.button";
import { Link } from "expo-router";
import fbLogo from "@/assets/auth/facebook.png";
import googleLogo from "@/assets/auth/google.png";
const styles = StyleSheet.create({
  welcomeBtn: {
    flex: 1,
    gap: 30,
  },
});

interface IProps {
  title: string;
}
const SocialButton = (props: IProps) => {
  const { title } = props;
  return (
    <View style={styles.welcomeBtn}>
      <TextBetweenLine title={title} textColor="black" />

      {/* Login icon */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <ShareButton
          title="faceBook"
          onPress={() => {
            alert("me");
          }}
          textStyle={{ textTransform: "lowercase" }}
          pressStyle={{ alignSelf: "stretch" }}
          btnStyle={{
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: "#fff",
          }}
          icons={<Image source={fbLogo} />}
        />
        <View>
          <ShareButton
            title="google"
            onPress={() => {
              alert("me");
            }}
            textStyle={{ textTransform: "uppercase" }}
            btnStyle={{
              justifyContent: "center",
              borderRadius: 30,
              paddingHorizontal: 20,
              backgroundColor: "#fff",
            }}
            icons={<Image source={googleLogo} />}
          />
        </View>
      </View>
    </View>
  );
};

export default SocialButton;
