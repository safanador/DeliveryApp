import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {hp} from '../helpers/common';
import {theme} from '../constants/theme';
import {getUserImageSrc} from '../services/imageService';

const Avatar = ({
  uri,
  size = hp(4.5),
  rounded = theme.radius.md,
  style = {},
}: any) => {
  return (
    <Image
      source={getUserImageSrc(uri)}
      style={[
        styles.avatar,
        {height: size, width: size, borderRadius: rounded},
        style,
      ]}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderCurve: 'continuous',
    borderColor: theme.colors.darkLight,
    borderWidth: 1,
  },
});
