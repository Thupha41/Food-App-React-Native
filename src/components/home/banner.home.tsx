import * as React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import bn1 from "@/assets/banner/bn1.jpg";
import bn2 from "@/assets/banner/bn2.jpg";
import bn3 from "@/assets/banner/bn3.jpg";

const width = Dimensions.get("window").width;
function BannerHome() {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  const sliders = [
    { id: 1, source: bn1 },
    { id: 2, source: bn2 },
    { id: 3, source: bn3 },
  ];
  return (
    <View>
      <Carousel
        ref={ref}
        width={width}
        height={width / 4}
        data={sliders}
        onProgressChange={progress}
        renderItem={({ item, index }) => (
          <Image
            style={{
              width: width,
              height: width / 3.7,
              resizeMode: "cover",
            }}
            source={item.source}
          ></Image>
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={sliders}
        dotStyle={{
          height: 5,
          width: 5,
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: 50,
        }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
}
export default BannerHome;
