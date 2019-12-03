// @flow

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { ImageSource } from 'react-native/Libraries/Image/ImageSource';
import type {
  ViewStyleProp,
  TextStyleProp,
  ImageStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

import { Colors, Fonts } from '../constants';

type Props = {
  visible?: boolean,
  children?: React$Node,
  disabled?: boolean,
  style?: ViewStyleProp,
  textStyle?: TextStyleProp,
  iconSource?: ImageSource,
  iconStyle?: ImageStyleProp,
};

function Button({ visible, children, style, textStyle, iconSource, iconStyle, ...props }: Props) {
  return !visible ? null : (
    <TouchableOpacity testID="button" activeOpacity={0.5} {...props}>
      <View style={[styles.button, style, props.disabled && styles.disabled]}>
        {children && (
          <Text style={[styles.buttonText, textStyle]} numberOfLines={1}>
            {children}
          </Text>
        )}
        {iconSource && <Image style={[styles.buttonIcon, iconStyle]} source={iconSource} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: Colors.navyBlue,
  },
  buttonText: {
    height: 16,
    fontSize: 16,
    lineHeight: 16,
    color: Colors.white,
    fontFamily: Fonts.bold,
    textTransform: 'uppercase',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    flexShrink: 0,
    tintColor: Colors.white,
  },
  disabled: {
    opacity: 0.5,
  },
});

Button.defaultProps = {
  visible: true,
  children: undefined,
  disabled: false,
  style: undefined,
  textStyle: undefined,
  iconSource: undefined,
  iconStyle: undefined,
};

export default Button;
