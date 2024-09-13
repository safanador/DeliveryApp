/* eslint-disable react-native/no-inline-styles */
import {View, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {useAuth} from '../../contexts/AuthContext';
import Loading from '../components/Loading';

const LoadingUpdateProfile = () => {
  const {user} = useAuth() || {};
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(() => {
    //console.log('session user: ', session?.user.user_metadata.user_type);
    //
    console.log('user from users table: ', user);

    if (user) {
      if (user.just_created === 'yes') {
        navigation.navigate('UpdateProfile');
      }
      if (user.just_created === 'no'){
        navigation.navigate('UsersHome');
      }
    }
  }, [user]);

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Loading />
    </View>
  );
};

export default LoadingUpdateProfile;
