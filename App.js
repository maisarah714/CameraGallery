/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ImagePicker from 'react-native-image-picker';
import { PermissionsAndroid } from "react-native"



async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  const permission2 = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  const permission3 = PermissionsAndroid.PERMISSIONS.CAMERA;

  const hasPermission = await PermissionsAndroid.check(permission);
  const hasPermission2 = await PermissionsAndroid.check(permission2);
  const hasPermission3 = await PermissionsAndroid.check(permission3);
  if (hasPermission && hasPermission2 && hasPermission3) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission) && await PermissionsAndroid.request(permission2) && await PermissionsAndroid.request(permission3);
  return status === 'granted';
}

hasAndroidPermission();



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };

    showImagePicker = () =>{

      let options = {
        customButtons: [], //add more button
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
    
      ImagePicker.showImagePicker(options, (response) => {
    
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
    
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
          this.setState({
            filePath: source,
          });
        }
      });
    }
    
    // showImagePicker();
    
    // Launch Camera:
    launchCamera = () =>{
    
    
      ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
    
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
          this.setState({
            filePath: source,
          });
        }
      });
    }
    
    
    // Open Image Library:
     launchImage = () => {
    
    
      ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response);
    
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
    
          //You can also display the image using data:
          //const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
          this.setState({
            filePath: source,
          });
        }
      });
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Camera & Gallery</Text>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
            }}
            style={{ width: 100, height: 100 }}
          />
          <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 250, height: 250, }}
          />
          <Button title="Select Option" onPress={showImagePicker} />
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
