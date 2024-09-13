import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {theme} from '../constants/theme';

const BackButton = ({size = 26, router}: any) => {
  //const navigation = useNavigation();
  return (
    <Pressable onPress={() => router.goBack()} style={styles.button}>
      <Icon name="chevron-left" size={size} color={theme.colors.text} />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(0,0,0,0.07)',
  },
});
