import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import app from "./utils/initfb";
import SignIn from './comps/SignIn';

export default function App() {

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        var { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        var { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    console.log(result);

    if (!result.cancelled) {
      //setImage(result.uri);
      Upload(result.uri);
    }
  };


  const TakePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    console.log(result);

    if (!result.cancelled) {
      //setImage(result.uri);
      Upload(result.uri);
    }
  };

  const Upload = async(file_uri) => {

    const file = await fetch(file_uri);
    //file blob
    const blob = file.blob();

    const storage = getStorage();
    const storageRef = ref(storage, 'test_mobile.jpg');

    // 'file' comes from the Blob or File API
    const snapshot = await uploadBytes(storageRef, blob);
    console.log('uploaded!');
  }

  const FBCreateUser = async(em, ps) => {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, em, ps);
    alert("created.")
  }

  const FBSignIn = async(em, ps) => {
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, em, ps);
    alert("signed in")
  }

  return (
    <View style={styles.container}>
      <SignIn 
        onSignIn={FBSignIn}
        onCreate={FBCreateUser}
      />
      <Button onPress={pickImage} title="pick from gallery"/>
      <Button onPress={TakePicture} title="capture"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
