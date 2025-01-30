import { getFavoriteRestaurantAPI, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, RefreshControl, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const FavoritePage = () => {
  const [favoriteRestaurant, setFavoriteRestaurant] = useState<IRestaurant[]>(
    []
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchRestaurants = async () => {
    const res = await getFavoriteRestaurantAPI();
    if (res.data) setFavoriteRestaurant(res.data);
  };
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRestaurants();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            paddingHorizontal: 10,
            paddingBottom: 5,
          }}
        >
          <Text style={{ color: APP_COLOR.ORANGE }}>Quán ăn yêu thích</Text>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {favoriteRestaurant.map((item, index) => {
            return (
              <View key={index}>
                <View
                  style={{
                    padding: 10,
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Image
                    source={{
                      uri: `${getURLBaseBackend()}/images/restaurant/${
                        item.image
                      }`,
                    }}
                    style={{ height: 100, width: 100 }}
                  />

                  <Pressable
                    onPress={() =>
                      router.navigate({
                        pathname: "/product/[id]",
                        params: { id: item._id },
                      })
                    }
                    style={{ gap: 10 }}
                  >
                    <Text>{item.name}</Text>
                    <Text>{item.phone}</Text>
                    <Text>{item.address}</Text>
                  </Pressable>
                </View>
                <View style={{ height: 10, backgroundColor: "#eee" }}></View>
              </View>
            );
          })}
          {favoriteRestaurant.length === 0 && (
            <View style={{ padding: 10 }}>
              <Text>Không có dữ liệu.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FavoritePage;
