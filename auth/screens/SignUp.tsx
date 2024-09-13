import React, {useRef, useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  StatusBar,
  Text,
  Pressable,
} from 'react-native';
//import {Button, Input} from '@rneui/themed';
import {supabase} from '../lib/supabase';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton';
import {hp, wp} from '../helpers/common';
import {theme} from '../constants/theme';
import Input from '../components/Input';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function SignUp() {
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const router = useNavigation();
  async function signInWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: {session},
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    if (!session) {
      Alert.alert('Please check your inbox for email verification!');
    }
    setLoading(false);
  }

  const onSubmit = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !firstNameRef.current ||
      !lastNameRef.current
    ) {
      Alert.alert('Sign Up', 'please fill all the fields');
      return;
    }

    let first_name = firstNameRef.current.trim();
    let last_name = lastNameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    const {
      data: {session},
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
          email,
          user_type: 'client',
          just_created: 'yes',
        },
      },
    });
    setLoading(false);

    console.log('session: ', session);
    console.log('error: ', error);
    if (error) {
      Alert.alert('Sign Up', error.message);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.container}>
        <BackButton router={router} />
        {/* welcome */}
        <View>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>
        {/* form */}
        <View style={styles.form}>
          <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
            Please fill the details to create an account
          </Text>
          <Input
            icon={<Icon color={theme.colors.textLight} name="user" size={26} />}
            placeholder="Enter your name"
            onChangeText={(value: any) => (firstNameRef.current = value)}
            color="black"
          />
          <Input
            icon={<Icon color={theme.colors.textLight} name="user" size={26} />}
            placeholder="Enter your last name"
            onChangeText={(value: any) => (lastNameRef.current = value)}
            color="black"
          />
          <Input
            icon={<Icon color={theme.colors.textLight} name="mail" size={26} />}
            placeholder="Enter your email"
            onChangeText={(value: any) => (emailRef.current = value)}
            color="black"
          />
          <Input
            icon={<Icon color={theme.colors.textLight} name="lock" size={26} />}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(value: any) => (passwordRef.current = value)}
            color="black"
          />
          {/* button */}
          <Button title={'Register'} loading={loading} onPress={onSubmit} />
        </View>
        {/* footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.primaryDark,
                  fontWeight: theme.fonts.semibold as '700',
                },
              ]}>
              Login
            </Text>
          </Pressable>
        </View>
      </View>

      {/* previous code
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            label="Email"
            leftIcon={{type: 'font-awesome', name: 'envelope'}}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{type: 'font-awesome', name: 'lock'}}
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title="Sign in"
            disabled={loading}
            onPress={() => signInWithEmail()}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Button
            title="Sign up"
            disabled={loading}
            onPress={() => signUpWithEmail()}
            style={styles.button}
          />
        </View>
      </View>
       */}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold as '500' | '600' | '700' | '800' | '900',
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold as '600',
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    borderRadius: 12,
  },
});
