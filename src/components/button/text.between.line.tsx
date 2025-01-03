import { StyleSheet, Text, View } from "react-native";
interface IProps {
  title: string;
  textColor?: "white" | "black";
}

const styles = StyleSheet.create({
  tbl_Container: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
  },
  tbl_Line: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingHorizontal: 35,
  },
});
const TextBetweenLine = (props: IProps) => {
  const { title, textColor = "white" } = props;
  return (
    <View style={styles.tbl_Container}>
      <View style={styles.tbl_Line}></View>
      <Text
        style={{
          color: textColor,
          position: "relative",
          top: 10,
        }}
      >
        {title}
      </Text>
      <View style={styles.tbl_Line}></View>
    </View>
  );
};
export default TextBetweenLine;
