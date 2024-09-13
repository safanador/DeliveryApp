/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {Image, Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {hp, wp} from '../helpers/common';
import { theme } from '../constants/theme';
import Button from '../components/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';

export default function Welcome() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ScreenWrapper bg="white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.container}>
        {/* welcome image */}
        <Image resizeMode="contain" style={styles.welcomeImage} source={require('../assets/welcome.jpg')}/>
        <View style={{gap: 20}}>
            <Text style={styles.title}>TuDomi</Text>
            <Text style={styles.punchline}>Donde tus domicilios están más seguros y a tiempo</Text>
        </View>
        {/* footer */}
        <View style={styles.footer}>
            <Button
            title="Getting Started"
            buttonStyle={{marginHorizontal: wp(3)}}
            onPress={()=>navigation.navigate('SignUp')}
            />
            <View style={styles.bottomTextContainer}>
                <Text style={styles.loginText}>
                    Already have an account!
                </Text>
                <Pressable onPress={()=>navigation.navigate('Login')}>
                    <Text style={[styles.loginText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold as '500' | '600' | '700' | '800' }]}>
                        Login
                    </Text>
                </Pressable>
            </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginHorizontal: wp(4),
  },
  welcomeImage: {
    height: hp(30),
    width: wp(100),
    alignSelf:'center',
  },
  title: {
    color: theme.colors.textLight,
    fontSize: hp(4),
    textAlign: 'center',
    fontWeight: theme.fonts.extraBold as '500' | '600' | '700' | '800' ,
  },
  punchline: {
    textAlign: 'center',
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.textLight,
  },
  footer: {
    gap: 30,
    width: '100%',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  loginText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
