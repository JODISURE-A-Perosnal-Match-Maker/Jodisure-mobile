import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
// import Entypo from '@react-native-vector-icons/entypo';
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import LinearGradient from "react-native-linear-gradient";
import theme from "../theme/theme";

const SliderButton = ({
  text = "Swipe To Raise The Alert",
  textColor = "#fff",
  sliderColor = "#FFFFFF",
  backgroundColor = ["#FF0000", "#FFFF00"], // Default gradient colors (red to yellow)
  iconColor = "#E64040",
  width = Dimensions.get("screen").width - 40,
  height = 50,
  borderRadius = 50,
  onSlideCompleted = () => {console.log("ended");},
  snapPointRatio = 1.5,
  duration = 100
}) => {
  const END_POSITION = width - height - 10;  // Calculating button width
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const panGesture = Gesture.Pan()  // Defining gesture type to Pan
    .runOnJS(true)  // This is required if you want to trigger a function on swipe
    .onUpdate((e) => {
      if (onLeft.value) {
        position.value = e.translationX;
      } else {
        position.value = END_POSITION + e.translationX;
      }
    })
    .onEnd((e) => {
      if (position.value > END_POSITION / snapPointRatio) {  // This is the snap point, adjust snapPointRatio accordingly
        position.value = withTiming(END_POSITION, { duration });
        onLeft.value = false;
        console.log("hiiiii");
        onSlideCompleted();  // You can call any function here when swipe is completed

    } else {
        console.log("hiiiii x2");
        
        position.value = withTiming(0, { duration });
        onLeft.value = true;
        onSlideCompleted();  // You can call any function here when swipe is completed

    }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <View style={{ width }}>
      <LinearGradient colors={backgroundColor} style={[styles.sliderContainer, { borderRadius, height }]}>
        <Text style={[styles.sliderText, { color: textColor }]}>{text}</Text>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.swipeBtn, animatedStyle, { backgroundColor: sliderColor, width: height - 10, height: height - 10, borderRadius: (height - 10) / 2 ,}]}>
            <Icon name="chevron-right" type="evilicon" size={24} color={iconColor} />
          </Animated.View>
        </GestureDetector>
      </LinearGradient>
    </View>
  );
};

export default SliderButton;

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
    overflow: "hidden",
    textAlign:'right',
    marginTop:-50,
    paddingTop:-50
  },
  sliderText: {
    fontSize: 18,
  },
  swipeBtn: {
    position: "absolute",
    left: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
