import { currencyFormatter, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { Image, Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";

interface IProps {
  menuItem: IMenuItem | null;
  handlePressItem: any;
  showMinus: boolean;
  quantity: number;
}
const ItemSingle = (props: IProps) => {
  const { menuItem, handlePressItem, showMinus, quantity } = props;

  return (
    <View
      style={{
        backgroundColor: "white",
        gap: 10,
        flexDirection: "row",
        padding: 10,
      }}
    >
      <View>
        <Image
          style={{ height: 100, width: 100 }}
          source={{
            uri: `${getURLBaseBackend()}/images/menu-item/${menuItem?.image}`,
          }}
        />
      </View>
      <View style={{ flex: 1, gap: 10 }}>
        <View>
          <Text>{menuItem?.title}</Text>
        </View>
        <View>
          <Text>{menuItem?.description}</Text>
        </View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={{ color: APP_COLOR.ORANGE }}>
            {currencyFormatter(menuItem?.basePrice)}
          </Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 3,
            }}
          >
            {showMinus && (
              <>
                <Pressable
                  style={({ pressed }) => ({
                    opacity: pressed === true ? 0.5 : 1,
                    alignSelf: "flex-start", //fit-content
                  })}
                  onPress={() => handlePressItem(menuItem, "MINUS")}
                >
                  <AntDesign
                    name="minussquareo"
                    size={24}
                    color={APP_COLOR.ORANGE}
                  />
                </Pressable>
                <Text
                  style={{
                    minWidth: 25,
                    textAlign: "center",
                  }}
                >
                  {quantity}
                </Text>
              </>
            )}
            <Pressable
              style={({ pressed }) => ({
                opacity: pressed === true ? 0.5 : 1,
                alignSelf: "flex-start", //fit-content
              })}
              onPress={() => handlePressItem(menuItem, "PLUS")}
            >
              <AntDesign name="plussquare" size={24} color={APP_COLOR.ORANGE} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemSingle;
