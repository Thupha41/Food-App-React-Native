import {
  currencyFormatter,
  getOrderHistoryAPI,
  getURLBaseBackend,
} from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderPage = () => {
  const [orderHistory, setOrderHistory] = useState<IOrderHistory[]>([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const res = await getOrderHistoryAPI();
      if (res.data) setOrderHistory(res.data);
    };
    fetchOrderHistory();
  }, []);

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
          <Text style={{ color: APP_COLOR.ORANGE }}>Lịch sử đơn hàng</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {orderHistory.map((item, index) => {
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
                        item.restaurant?.image
                      }`,
                    }}
                    style={{ height: 100, width: 100 }}
                  />
                  <View style={{ gap: 10 }}>
                    <Text>{item.restaurant.name}</Text>
                    <Text>{item.restaurant.address}</Text>
                    <Text>
                      {currencyFormatter(item.totalPrice)} ({item.totalQuantity}{" "}
                      món)
                    </Text>
                    <Text>Trạng thái: {item.status}</Text>
                  </View>
                </View>
                <View style={{ height: 10, backgroundColor: "#eee" }}></View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrderPage;
