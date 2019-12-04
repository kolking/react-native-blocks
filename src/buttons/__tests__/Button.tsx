import React from 'react';
import { Text } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer from 'react-test-renderer';

import { Colors } from '../../constants';

/**
 * Under test
 */
import Button, { Props } from '../Button';

jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => 'TouchableOpacity');

const createElement = (props: Props) => (
  <Button {...props}>
    <Text>TEXT</Text>
  </Button>
);

const createRenderer = (props: Props) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

it('should render as disabled', () => {
  expect(createRenderer({ disabled: true })).toMatchSnapshot();
});

it('should not render', () => {
  expect(createRenderer({ visible: false })).toMatchSnapshot();
});

it('should render with custom styles', () => {
  expect(
    createRenderer({
      style: { backgroundColor: Colors.black },
      textStyle: { color: Colors.white },
    }),
  ).toMatchSnapshot();
});

it('should render with icon', () => {
  expect(
    createRenderer({ iconSource: { uri: 'image.png' }, iconStyle: { tintColor: Colors.white } }),
  ).toMatchSnapshot();
});

it('should call onPress', () => {
  const onPress = jest.fn();
  const tree = createRenderer({ onPress });

  const button = tree.root.findByProps({ testID: 'button' });

  button.props.onPress();

  expect(onPress).toBeCalled();
});
