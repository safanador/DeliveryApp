import {Alert, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, Region} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import {hp} from '../../auth/helpers/common';
const courier = require('./assets/pn.png');

const Map = ({isSettingDestination}: any) => {
  const [locationData, setLocationData] = useState({
    origin: {latitude: 11.21547, longitude: -74.16384},
    destination: {latitude: 11.22215, longitude: -74.20141},
    mapRegion: {
      latitude: 11.21547,
      longitude: -74.16384,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const onRegionChange = (region: Region) => {
    setLocationData({...locationData, mapRegion: region});
    if (isSettingDestination) {
      setLocationData({
        ...locationData,
        origin: {latitude: region.latitude, longitude: region.longitude},
      });
    } else {
      setLocationData({
        ...locationData,
        destination: {latitude: region.latitude, longitude: region.longitude},
      });
    }
  };

  // get current position from user
  async function getLocationPermission() {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocationData({
      ...locationData,
      origin: {latitude: current.latitude, longitude: current.longitude},
    });
    setLocationData({
      ...locationData,
      mapRegion: {
        latitude: current.latitude,
        longitude: current.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
  }
  // calling current position function
  useEffect(() => {
    getLocationPermission();
  }, []);
  return (
    <MapView
      style={styles.map}
      onRegionChange={onRegionChange}
      initialRegion={locationData.mapRegion}>
      {/* Add markers or other map features here */}
      <Marker
        //draggable
        onDragEnd={direction =>
          setLocationData({
            ...locationData,
            origin: {
              latitude: direction.nativeEvent.coordinate.latitude,
              longitude: direction.nativeEvent.coordinate.longitude,
            },
          })
        }
        coordinate={locationData.origin}
        title={'Pickup Location'}>
        <Image source={courier} style={styles.pickupImage} />
      </Marker>
      <Marker
        onDragEnd={direction =>
          setLocationData({
            ...locationData,
            destination: {
              latitude: direction.nativeEvent.coordinate.latitude,
              longitude: direction.nativeEvent.coordinate.longitude,
            },
          })
        }
        //draggable
        coordinate={locationData.destination}
        title={'Dropoff Location'}
      />
      <MapViewDirections
        origin={locationData.origin}
        destination={locationData.destination}
        apikey={`${process.env.GOOGLE_MAPS_KEY}`}
        strokeColor="black"
        strokeWidth={5}
      />
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: hp(100),
  },
  pickupImage: {
    height: hp(5),
    width: hp(5),
    resizeMode: 'contain',
  },
});
