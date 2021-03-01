import React, { useState, useEffect } from "react";
import {
  View,
  Animated,
  StyleSheet,
  PanResponder,
  Dimensions,
  LogBox,
  LayoutAnimation,
  UIManager,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 300;

const Deck = (props) => {
  Deck.defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
  };

  const [position, setPosition] = useState(new Animated.ValueXY());
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, [onSwipeComplete]);

  useEffect(() => {
    setCardIndex(0);
  }, [props.data]);

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };

  const onSwipeComplete = (direction) => {
    const { onSwipeLeft, onSwipeRight, data } = props;
    const item = data[cardIndex];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    setCardIndex((prevIndex) => prevIndex + 1);
    position.setValue({ x: 0, y: 0 });
  };

  const forceSwipe = (direction) => {
    const x =
      direction === "right" ? SCREEN_WIDTH + 100 : -(SCREEN_WIDTH + 100);
    Animated.timing(position, {
      toValue: { x: x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => {
      onSwipeComplete(direction);
    });
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ["-120deg", "0deg", "120deg"],
    });

    return { ...position.getLayout(), transform: [{ rotate: rotate }] };
  };

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
          position.setValue({ x: gesture.dx, y: gesture.dy });
        },
        onPanResponderRelease: (event, gesture) => {
          if (gesture.dx > SWIPE_THRESHOLD) {
            forceSwipe("right");
          } else if (gesture.dx < -SWIPE_THRESHOLD) {
            forceSwipe("left");
          } else {
            resetPosition();
          }
        },
      }),
    []
  );

  const renderCards = () => {
    if (cardIndex >= props.data.length) {
      return props.renderNoMoreCards();
    }

    return props.data
      .map((item, index) => {
        if (index < cardIndex) {
          return null;
        }

        if (index === cardIndex) {
          return (
            <Animated.View
              key={item.id}
              {...panResponder.panHandlers}
              style={[getCardStyle(), styles.cardStyle]}
            >
              {props.renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={[styles.cardStyle, { top: 10 * (index - cardIndex) }]}
          >
            {props.renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  cardStyle: { position: "absolute", width: SCREEN_WIDTH, zIndex: 100 },
});

export default Deck;
