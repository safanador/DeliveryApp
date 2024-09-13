import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import BackButton from './BackButton';
import {useNavigation} from '@react-navigation/native';

import {hp} from '../helpers/common';
import {theme} from '../constants/theme';

const Header = ({title, showBackButton, mb = 10}: any) => {
  const router = useNavigation();

  return (
    <View style={[styles.container, {marginBottom: mb}]}>
      {showBackButton && (
        <View style={styles.backButton}>
          <BackButton router={router} />
        </View>
      )}
      <Text style={styles.title}>{title || ''}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    gap: 10,
  },
  title: {
    fontSize: hp(2.7),
    fontWeight: theme.fonts.semibold as '700',
    color: theme.colors.textDark,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
});
