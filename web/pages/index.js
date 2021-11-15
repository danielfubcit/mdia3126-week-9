import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { useState } from 'react';
import SignIn from '../comps/SignIn';

export default function Home() {

  const Upload = async(e) => {
    console.log(e.target.files[0]);
    if(e.target.files.length <= 0){
      alert("no files were selected");
      return false;
    }

  const file = e.target.files[0];
  const storage = getStorage();
  const storageRef = ref(storage, 'test.jpg');

  // 'file' comes from the Blob or File API
  const snapshot = await uploadBytes(storageRef, file);
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
    <div className={styles.container}>
      <SignIn 
        onSignIn={FBSignIn}
        onCreate={FBCreateUser}
      />
      <input type="file" onChange={Upload}/>
    </div>

    
  )
}
