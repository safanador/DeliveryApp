import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';
import {
  launchImageLibrary as _launchImageLibrary,
  //launchCamera as _launchCamera,
  ImageLibraryOptions,
  //CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {useAuth} from '../../contexts/AuthContext';
import {hp, wp} from '../helpers/common';
import {theme} from '../constants/theme';
import Header from '../components/Header';
import {uploadFile} from '../services/imageService';
import Icon from 'react-native-vector-icons/Feather';
import Input from '../components/Input';
import Button from '../components/Button';
import {updateUser} from '../services/userService';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {supabaseUrl} from '../constants';
let launchImageLibrary = _launchImageLibrary;
type ImageType =
  | {
      fileName: string;
      fileSize: number;
      height: number;
      originalPath: string;
      type: string;
      uri: string;
      width: number;
    }
  | string
  | object
  | null;
type UserType = {
  first_name: string;
  last_name: string;
  phone_number: string;
  image: ImageType;
  just_created: string;
};

const UpdateProfile = () => {
  const {user: currentUser, setUserData} = useAuth() || {};
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType>({
    first_name: '',
    last_name: '',
    phone_number: '',
    image: null,
    just_created: '',
  });
  console.log(user);
  // takes user info from the context state and set the edit profile form values
  useEffect(() => {
    if (currentUser) {
      setUser({
        first_name: currentUser.first_name || '',
        last_name: currentUser.last_name || '',
        phone_number: currentUser.phone_number || '',
        image: currentUser.image || null,
        just_created: 'no',
      });
    }
  }, [currentUser]);

  //image picker config
  const onPickImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('Image picker error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const imageUri = response.assets[0] || null; // ensure it is not undefined
      console.log(imageUri);
      setUser({...user, image: imageUri || null});
    }
  };
  // on submit edit profile form
  const onSubmit = async () => {
    let userData = {...user};
    let {first_name, last_name, phone_number, image, just_created} = userData;
    if (!first_name || !last_name || !phone_number || !just_created || !image) {
      Alert.alert('Profile', 'Please fill out all the fields');
      return;
    }
    setLoading(true);
    // upload image if is an object which means it was selected from local storage
    if (typeof image === 'object' && 'uri' in image) {
      let imageRes = await uploadFile('profiles', image.uri, true);
      if (imageRes.success) {
        userData.image = imageRes.data || null;
      } else {
        userData.image = null;
      }
    }
    // update user in database with values from edit profile form
    const res = await updateUser(currentUser.id, userData);
    setLoading(false);

    if (res.success) {
      setUserData!({...currentUser, ...userData});
      navigation.navigate('UsersHome');
    }
  };
  let imageSource =
    user.image && typeof user.image === 'object' && 'uri' in user.image // if it is an object it was selected from local storage
      ? {uri: user.image.uri}
      : user.image && typeof user.image === 'string'
      ? {
          uri: `${supabaseUrl}/storage/v1/object/public/uploads/${user.image}`, //if user.image is a string it means it comes from DB
        }
      : {
          uri: `${supabaseUrl}/storage/v1/object/public/uploads/profiles/avatar.webp`, // then it is null, fallback image placed
        };
  console.log(imageSource);
  return (
    <ScreenWrapper bg="white">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.container}>
        <ScrollView>
          <Header title="Edit Profile" showBackButton={false} />

          {/*form */}
          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image source={imageSource} style={styles.avatar} />
              <Pressable style={styles.cameraIcon} onPress={onPickImage}>
                <Icon name="edit" size={20} color="black" />
              </Pressable>
            </View>
            <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
              Please fill your profile details
            </Text>
            <Input
              icon={
                <Icon name="user" color={theme.colors.textLight} size={20} />
              }
              placeholder="Enter your first name"
              value={user.first_name}
              color="black"
              onChangeText={(value: any) =>
                setUser({...user, first_name: value})
              }
            />
            <Input
              icon={
                <Icon name="user" color={theme.colors.textLight} size={20} />
              }
              placeholder="Enter your last name"
              value={user.last_name}
              color="black"
              onChangeText={(value: any) =>
                setUser({...user, last_name: value})
              }
            />
            <Input
              icon={
                <Icon name="phone" color={theme.colors.textLight} size={20} />
              }
              placeholder="Enter your phone number"
              value={user.phone_number}
              color="black"
              onChangeText={(value: any) =>
                setUser({...user, phone_number: value})
              }
            />
            <Button title="Update" loading={loading} onPress={onSubmit} />
          </View>
        </ScrollView>
      </View>
      {/*<Button title="Log out" onPress={onLogout} /> */}
    </ScreenWrapper>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  avatarContainer: {
    height: hp(14),
    width: hp(14),
    alignSelf: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.xxl * 1.8,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: theme.colors.darkLight,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    textShadowRadius: 5,
    elevation: 7,
  },
  form: {
    gap: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    flexDirection: 'row',
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: 'continuous',
    padding: 17,
    paddingHorizontal: 20,
    gap: 15,
  },
});
