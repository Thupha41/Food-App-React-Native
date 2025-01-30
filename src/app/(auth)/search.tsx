import { FlatList, Image, Platform, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { APP_COLOR } from "@/utils/constants";
import { TextInput } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useState } from "react";
import debounce from "debounce";
import { getRestaurantByNameAPI, getURLBaseBackend } from "@/utils/api";

const data = [
  {
    key: 1,
    name: "Quán Tiền Bối",
    source: require("@/assets/icons/noodles.png"),
  },
  {
    key: 2,
    name: "Bún, Mì, Phở",
    source: require("@/assets/icons/bun-pho.png"),
  },
  { key: 3, name: "Fast Food", source: require("@/assets/icons/fastfood.png") },
  { key: 4, name: "Pizza", source: require("@/assets/icons/Pizza.png") },
  { key: 5, name: "Burger", source: require("@/assets/icons/burger.png") },
  {
    key: 6,
    name: "Sống Khỏe",
    source: require("@/assets/icons/egg-cucmber.png"),
  },
  { key: 7, name: "Giảm 50k", source: require("@/assets/icons/moi-moi.png") },
  { key: 8, name: "Milk Tea", source: require("@/assets/icons/salad.png") },
];

const SearchPage = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = debounce(async (text: string) => {
    setSearchTerm(text);
    if (!text) return;

    const res = await getRestaurantByNameAPI(text);
    if (res.data) {
      setRestaurants(res.data.results);
    }
  }, 300);

  const DefaultResult = () => {
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          gap: 10,
        }}
      >
        <Text>Phổ biến</Text>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                  flex: 1,
                  borderColor: "#eee",
                  borderTopWidth: index === 0 || index === 1 ? 1 : 0,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderRightWidth: index % 2 === 1 ? 1 : 0,
                }}
              >
                <Text>{item.name}</Text>
                <Image
                  source={item.source}
                  style={{
                    height: 35,
                    width: 35,
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          padding: 10,
        }}
      >
        <MaterialIcons
          onPress={() => router.back()}
          name="arrow-back"
          size={24}
          color={APP_COLOR.ORANGE}
        />
        <TextInput
          placeholder="Tìm kiếm cửa hàng..."
          onChangeText={(text: string) => handleSearch(text)}
          autoFocus
          style={{
            flex: 1,
            backgroundColor: "#eee",
            paddingVertical: Platform.OS === "android" ? 3 : 10,
            paddingHorizontal: 10,
            borderRadius: 3,
          }}
        />
      </View>
      <View style={{ backgroundColor: "#eee", flex: 1 }}>
        {searchTerm.length === 0 ? (
          <DefaultResult />
        ) : (
          <View style={{ backgroundColor: "white", gap: 10 }}>
            {restaurants?.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() =>
                    router.navigate({
                      pathname: "/product/[id]",
                      params: { id: item._id },
                    })
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    gap: 10,
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                  }}
                >
                  <Image
                    source={{
                      uri: `${getURLBaseBackend()}/images/restaurant/${
                        item.image
                      }`,
                    }}
                    style={{ height: 50, width: 50 }}
                  />
                  <Text>{item.name}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchPage;
