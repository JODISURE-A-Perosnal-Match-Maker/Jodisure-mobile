// @ts-nocheck
import React, { useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type CustomViewProps = {
  style?: TextStyle | TextStyle[];
//   onDoubleTap?: () => void; // Add onDoubleTap prop
};

type ContextType = {
  x: number;
  y: number;
};

const DragableView: React.FC<CustomViewProps> = ({ children, style, onPress }) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const doubleTapRef = useRef<NodeJS.Timeout | null>(null); // Reference for double tap timeout

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.x = x.value;
      context.y = y.value;
    },
    onActive: (event, context) => {
      x.value = event.translationX + context.x;
      y.value = event.translationY + context.y;
    },
    onEnd: () => {
    //   x.value = withSpring(0);
    //   y.value = withSpring(0);
    },
  });

  const handleDoubleTap = () => {
    if (onDoubleTap) {
      onDoubleTap();
    }
  };

  const handlePress = () => {
    Alert.alert("maaa go")
  };

  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
      ],
      position: 'absolute',
      zIndex: 1000,
      elevation: 1000,
    };
  }, [x, y]);

  return (
    //@ts-ignore
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={[panStyle, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
          {children}
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

export { DragableView };