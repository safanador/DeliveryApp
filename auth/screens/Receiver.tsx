/* eslint-disable react-native/no-inline-styles */
import {View, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {supabase} from '../lib/supabase';
import {useAuth} from '../../contexts/AuthContext';
import Loading from '../components/Loading';
import {getUserData} from '../services/userService';

const Receiver = () => {
  const {setAuth, setUserData} = useAuth() || {};
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      //console.log('session user: ', session?.user.user_metadata.user_type);
      //
      if (session) {
        //set auth
        setAuth!(session.user);
        updateUserData(session.user);
        //move to their own home page

        navigation.navigate('LoadingProfileUpdate');
      } else {
        //set auth null
        setAuth!(null);
        // move to welcome screen
        navigation.navigate('Welcome');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUserData = async (user: any) => {
    let res = await getUserData(user?.id);
    if (res.success) {
      setUserData!(res.data);
    }
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/*<StatusBar backgroundColor="white" barStyle="dark-content" /> */}
      <Loading />
    </View>
  );
};

export default Receiver;
