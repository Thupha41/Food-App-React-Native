import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import CollectionHome from "@/components/home/collection.home";
import HeaderHome from "@/components/home/header.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const data = [
  {
    key: 1,
    name: "Top Quán Rating 5* tuần này",
    description: "Gợi ý quán được tín đồ ẩm thực đánh giá 5*",
    refAPI: "top-rating",
  },
  {
    key: 2,
    name: "Quán Mới Lên Sàn",
    description: "Khám phá ngay hàng loạt quán mới cực ngon",
    refAPI: "newcomer",
  },
  {
    key: 3,
    name: "Ăn Thỏa Thích, Freeship 0Đ",
    description: "Bánh ngọt, chân gà, bánh tráng trộn... Freeship.",
    refAPI: "top-freeship",
  },
];
const HomeTab = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomFlatList
        data={data}
        style={styles.list}
        renderItem={({ item }) => (
          <CollectionHome
            name={item.name}
            description={item.description}
            refAPI={item.refAPI}
          />
        )}
        HeaderComponent={<HeaderHome />}
        StickyElementComponent={<SearchHome />}
        TopListElementComponent={<TopListHome />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  header: {
    borderColor: "red",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%",
  },
  item: {
    borderColor: "green",
    borderWidth: 1,
    height: 250,
    marginBottom: 10,
    width: "100%",
  },
  list: {
    overflow: "hidden",
  },
  sticky: {
    backgroundColor: "#2555FF50",
    borderColor: "blue",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%",
  },
});
export default HomeTab;
