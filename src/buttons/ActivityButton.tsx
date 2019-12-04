// @flow

import React from 'react';
import { ActivityIndicator, Animated, Easing, StyleSheet, View } from 'react-native';

import Button, { Props as ButtonProps } from './Button';

export interface Props extends ButtonProps {
  busy?: boolean;
  indicatorColor?: string;
}

const toValue = (value?: boolean) => (value ? 1 : 0);

class ActivityButton extends React.Component<Props> {
  static defaultProps = {
    busy: false,
    indicatorColor: undefined,
  };

  animatedValue: Animated.Value;

  constructor(props: Props) {
    super(props);

    this.animatedValue = new Animated.Value(toValue(props.busy));
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.busy !== prevProps.busy) {
      Animated.timing(this.animatedValue, {
        toValue: toValue(this.props.busy),
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }).start();
    }
  }

  render() {
    const buttonAnimation = {
      opacity: this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      transform: [
        {
          perspective: 1000,
        },
        {
          rotateX: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-90deg'],
          }),
        },
        {
          translateY: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 35],
          }),
        },
      ],
    };

    const indicatorAnimation = {
      opacity: this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          perspective: 1000,
        },
        {
          rotateX: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['90deg', '0deg'],
          }),
        },
        {
          translateY: this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-35, 0],
          }),
        },
      ],
    };

    const { busy, indicatorColor, ...props } = this.props;

    return (
      <View>
        <Animated.View style={[styles.indicator, indicatorAnimation]}>
          {/* TODO BUG:
            The animating prop has no effect on Android when
            the component initialized with animating=false
            https://github.com/facebook/react-native/issues/9023
          */}
          {busy && <ActivityIndicator size="small" color={indicatorColor} />}
        </Animated.View>
        <Animated.View style={buttonAnimation}>
          <Button testID="button" {...props} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  indicator: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActivityButton;
