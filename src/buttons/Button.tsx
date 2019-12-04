import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageSourcePropType,
  View,
  ViewStyle,
} from 'react-native';

import { Colors } from '../constants';

export interface Props extends TouchableOpacityProps {
  testID?: string;
  visible?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconSource?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
}

const Button: React.FC<Props> = ({
  visible,
  children,
  style,
  textStyle,
  iconSource,
  iconStyle,
  ...props
}) => {
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
};

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
  disabled: false,
};

export default Button;
