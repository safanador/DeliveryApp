/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ScreenWrapper = ({children, bg}: any) => {
  const {top} = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 0 : top + 0;

  return (
    <View style={{flex: 1, paddingTop, backgroundColor: bg}}>{children}</View>
  );
};

export default ScreenWrapper;
