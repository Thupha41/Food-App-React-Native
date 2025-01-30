import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { APP_COLOR } from "@/utils/constants";
import { useCurrentApp } from "@/context/app.context";
import { useEffect, useState } from "react";
import { currencyFormatter } from "@/utils/api";
import Feather from "@expo/vector-icons/Feather";
import ItemSingle from "@/components/example/restaurant/order/item.single";

const CreateModalPage = () => {
  const { restaurant, cart, setCart } = useCurrentApp();
  const { menuItemId } = useLocalSearchParams();

  const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (restaurant && menuItemId) {
      for (let i = 0; i < restaurant.menu.length; i++) {
        const menu = restaurant.menu[i];
        let check = false;
        for (let j = 0; j < menu.menuItem.length; j++) {
          if (menu.menuItem[j]._id === menuItemId) {
            check = true;
            setMenuItem(menu.menuItem[j]);
            break;
          }
        }
        if (check) break;
      }
    }
  }, [restaurant, menuItemId]);

  const handlePressItem = (item: IMenuItem, action: "MINUS" | "PLUS") => {
    if (action === "MINUS" && quantity === 1) return;
    const total = action === "MINUS" ? -1 : 1;
    setQuantity((prevQuantity: number) => prevQuantity + total);
  };

  const handleAddCart = () => {
    if (restaurant?._id && menuItem) {
      const total = quantity;
      const item = menuItem;

      const option = menuItem.options[selectedIndex];
      const keyOption = `${option.title}-${option.description}`;

      if (!cart[restaurant?._id]) {
        //chưa tồn tại cửa hàng => khởi tạo cửa hàng
        cart[restaurant._id] = {
          sum: 0,
          quantity: 0,
          items: {},
        };
      }

      //xử lý sản phẩm
      cart[restaurant._id].sum =
        cart[restaurant._id].sum +
        total * (item.basePrice + option.additionalPrice);
      cart[restaurant._id].quantity = cart[restaurant._id].quantity + total;

      //check sản phẩm đã từng thêm vào chưa
      if (!cart[restaurant._id].items[item._id]) {
        cart[restaurant._id].items[item._id] = {
          data: menuItem,
          quantity: 0,
          extra: {
            [keyOption]: 0,
          },
        };
      }

      //check options đã từng thêm vào chưa
      if (cart[restaurant._id].items[item._id]) {
        const extra = cart[restaurant._id].items[item._id].extra;
        if (extra && !extra[keyOption]) {
          cart[restaurant._id].items[item._id] = {
            ...cart[restaurant._id].items[item._id],
            extra: {
              ...cart[restaurant._id].items[item._id].extra,
              [keyOption]: 0,
            },
          };
        }
      }

      const currentQuantity =
        cart[restaurant._id].items[item._id].quantity + total;

      const i = cart[restaurant._id].items[item._id];
      let currentExtraQuantity = 0;
      if (i.extra && i.extra?.[keyOption] !== null)
        currentExtraQuantity = i.extra[keyOption] + total;

      cart[restaurant._id].items[item._id] = {
        data: menuItem,
        quantity: currentQuantity,
        extra: {
          ...cart[restaurant._id].items[item._id].extra,
          [keyOption]: currentExtraQuantity,
        },
      };

      if (currentQuantity <= 0) {
        delete cart[restaurant._id].items[item._id];
      }

      setCart((prevState: any) => ({ ...prevState, ...cart })); //merge state

      router.back();
    }
  };

  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#00000040",
      }}
    >
      <Pressable
        onPress={() => router.back()}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View
        entering={SlideInDown}
        style={{
          height: "80%",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
            flexDirection: "row",
            gap: 10,
            padding: 10,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Thêm món mới
            </Text>
          </View>
          <AntDesign
            onPress={() => router.back()}
            name="close"
            size={24}
            color="grey"
          />
        </View>

        <View
          style={{
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
          }}
        >
          {menuItem && (
            <ItemSingle
              menuItem={menuItem}
              showMinus={true}
              quantity={quantity}
              handlePressItem={handlePressItem}
            />
          )}
        </View>

        <View
          style={{
            backgroundColor: "#eee",
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          <Text>Lựa chọn (chọn 1)</Text>
        </View>

        <ScrollView
          style={{
            flex: 1,
            borderBottomColor: "#eee",
            borderBottomWidth: 1,
          }}
        >
          {menuItem?.options?.map((item, index) => {
            return (
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                  flexDirection: "row",
                }}
                key={index}
              >
                <View style={{ gap: 5, flex: 1 }}>
                  <Text>
                    {item.title} - {item.description}{" "}
                  </Text>
                  <Text style={{ color: APP_COLOR.ORANGE }}>
                    {currencyFormatter(item.additionalPrice)}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    onPress={() => setSelectedIndex(index)}
                    style={({ pressed }) => ({
                      opacity: pressed === true ? 0.5 : 1,
                      alignSelf: "flex-start",
                      padding: 2,
                      borderRadius: 2,
                      backgroundColor:
                        index === selectedIndex ? APP_COLOR.ORANGE : "white",
                      borderColor:
                        index === selectedIndex ? APP_COLOR.ORANGE : "grey",
                      borderWidth: 1,
                    })}
                  >
                    <Feather name="check" size={15} color="white" />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View
          style={{
            marginBottom: 20,
            marginTop: 10,
            marginHorizontal: 10,
            justifyContent: "flex-end",
          }}
        >
          <Pressable
            onPress={handleAddCart}
            style={({ pressed }) => ({
              opacity: pressed === true ? 0.5 : 1,
              padding: 10,
              backgroundColor: APP_COLOR.ORANGE,
              borderRadius: 3,
            })}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Thêm vào giỏ hàng
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default CreateModalPage;
