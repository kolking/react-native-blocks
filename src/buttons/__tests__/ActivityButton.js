// @flow

import React from 'react';
import { /* Animated as AnimatedObj, */ Text } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

import { Colors } from '../../constants';

/**
 * Under test
 */
import ActivityButton from '../ActivityButton';

jest.mock('react-native/Libraries/Animated/src/Animated');
jest.mock('react-native/Libraries/Animated/src/Easing');

jest.mock('../Button', () => 'Button');

// const Animated: Object = AnimatedObj;

const createElement = props => (
  <ActivityButton {...props}>
    <Text>TEXT</Text>
  </ActivityButton>
);

const createRenderer = props => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

it('should render as busy', () => {
  expect(createRenderer({ busy: true })).toMatchSnapshot();
});

it('should render as disabled', () => {
  expect(createRenderer({ disabled: true })).toMatchSnapshot();
});

it('should render with custom styles', () => {
  expect(
    createRenderer({
      style: { backgroundColor: Colors.black },
      textStyle: { color: Colors.white },
    }),
  ).toMatchSnapshot();
});

it('should call onPress', () => {
  const onPress = jest.fn();
  const tree = createRenderer({ onPress });

  const button = tree.root.findByProps({ testID: 'button' });

  button.props.onPress();

  expect(onPress).toBeCalled();
});

/* describe('busy animation', () => {
  const start = jest.fn();

  Animated.timing.mockImplementation(() => ({ start }));

  beforeEach(() => {
    start.mockClear();
    Animated.timing.mockClear();
  });

  it('should not animate', () => {
    const tree = createRenderer({});

    tree.update(createElement({ indicatorColor: Colors.white }));

    expect(Animated.timing).not.toBeCalled();
  });

  it('should animate to busy', () => {
    const tree = createRenderer({});
    const { instance } = tree.root.findByType(ActivityButton);

    expect(instance.animatedValue).toEqual(new Animated.Value(0));

    tree.update(createElement({ busy: true }));

    expect(Animated.timing).toBeCalledWith(instance.animatedValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: 'Easing.out(Easing.exp)',
    });
    expect(start).toBeCalled();
  });

  it('should animate from busy', () => {
    const tree = createRenderer({ busy: true });
    const { instance } = tree.root.findByType(ActivityButton);

    expect(instance.animatedValue).toEqual(new Animated.Value(1));

    tree.update(createElement({ busy: false }));

    expect(Animated.timing).toBeCalledWith(instance.animatedValue, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
      easing: 'Easing.out(Easing.exp)',
    });
    expect(start).toBeCalled();
  });
}); */
