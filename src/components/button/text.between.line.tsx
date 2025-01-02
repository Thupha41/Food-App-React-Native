import { StyleSheet, Text, View } from "react-native";
interface IProps {
    title: string;
}

const styles = StyleSheet.create({
    tbl_Container: {
        flexDirection: "row",
        gap: 15,
        justifyContent: "center"
    },
    tbl_Line: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingHorizontal: 35
    },
    tbl_Text: {
        color: "black",
        position: "relative",
        top: 10
    }
})
const TextBetweenLine = (props: IProps) => {
    const { title } = props;
    return (
        <View style={styles.tbl_Container}>
            <View style={styles.tbl_Line}>
            </View>
            <Text style={styles.tbl_Text}>{title}</Text>
            <View style={styles.tbl_Line}>
            </View>
        </View>
    )
}
export default TextBetweenLine;