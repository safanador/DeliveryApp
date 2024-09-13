/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  StyleSheet,
  View,
  Pressable,
  Image,
  useColorScheme,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../../auth/components/ScreenWrapper';
import {supabase} from '../../auth/lib/supabase';
import {useAuth} from '../../contexts/AuthContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {hp, wp} from '../../auth/helpers/common';
import {theme} from '../../auth/constants/theme';
import Icon from 'react-native-vector-icons/Feather';
//import Avatar from '../../auth/components/Avatar';
import Button from '../../auth/components/Button';
import Map from '../components/Map';

const UsersHome = () => {
  const colorScheme = useColorScheme();
  const {user, setAuth} = useAuth() || {};
  const [isSettingDestination, setIsSettingDestination] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // checking if the user has already updated his profile for the first time
  useEffect(() => {
    if (user) {
      if (user.just_created === 'yes') {
        navigation.navigate('UpdateProfile');
      }
    }
  }, [user, navigation]);
  //logout function
  const onLogout = async () => {
    setAuth!(null);
    const {error} = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Sign out', 'Error signing out');
    }
  };
  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        {/*header */}
        <View style={styles.header}>
          <Pressable onPress={onLogout}>
            <Icon name="menu" size={hp(3.2)} color={theme.colors.text} />
          </Pressable>
          <View style={styles.icons}>
            <Pressable onPress={onLogout}>
              <Icon name="log-out" size={hp(3.2)} color={theme.colors.text} />
            </Pressable>
            <Pressable>
              <Icon
                name="message-circle"
                size={hp(3.2)}
                color={theme.colors.text}
              />
            </Pressable>
            {/*  {user && user.image && (
              <Pressable>
                <Avatar
                  uri={user.image}
                  size={hp(4.3)}
                  rounded={theme.radius.sm}
                  style={{borderWidth: 2}}
                />
              </Pressable>
            )}*/}
          </View>
        </View>
        {/* map display */}
        <Pressable
          onPress={() => setIsFormVisible(false)}
          onPressOut={() => setIsFormVisible(true)}>
          <Map isSettingDestination={isSettingDestination} />
        </Pressable>
        {/* order form */}
        {isFormVisible && (
          <View
            style={[
              styles.formContainer,
              colorScheme === 'dark'
                ? styles.darkBackground
                : styles.lightBackground,
            ]}>
            <View style={styles.locationRow}>
              <TextInput
                style={[styles.input, {width: '88%'}]}
                placeholder="Pick-Up Location"
                placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'}
              />
              <Pressable
                style={styles.setCoordbutton}
                onPress={() => {
                  setIsSettingDestination(false);
                  setIsFormVisible(false);
                }}>
                <Icon name="map-pin" size={hp(1.6)} color={theme.colors.text} />
              </Pressable>
            </View>
            <View style={styles.locationRow}>
              <TextInput
                style={[styles.input, {width: '88%'}]}
                placeholder="Drop-Off Location"
                placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'}
              />
              <Pressable
                style={styles.setCoordbutton}
                onPress={() => {
                  setIsSettingDestination(true);
                  setIsFormVisible(false);
                }}>
                <Icon name="map-pin" size={hp(1.6)} color={theme.colors.text} />
              </Pressable>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'}
            />
            <TextInput
              style={styles.input}
              placeholder="Offer"
              keyboardType="numeric"
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#888'}
            />
            <Button
              buttonStyle={{height: hp(5.5), borderRadius: theme.radius.xs}}
              title="Create Delivery"
              onPress={() => {}}
            />
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default UsersHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: wp(4),
    zIndex: 1, // Ensure the header is above other elements
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold as '700',
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous',
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: hp(40), // 40% of the screen height
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  darkBackground: {
    backgroundColor: '#333333',
  },
  lightBackground: {
    backgroundColor: '#f9f9f9',
  },
  input: {
    height: hp(4.6),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  setCoordbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(4.6),
    width: '10%',
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
  },
  buttonText: {
    //marginLeft: 5,
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
