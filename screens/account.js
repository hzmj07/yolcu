import React , {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView
} from 'react-native';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Auth from '../firebaseConfig';





const Account =() => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const register = async()=> {
    try{
      const userData = await createUserWithEmailAndPassword(Auth , email , password)
      console.log("registar successful")
    }
    catch(error){
      console.error(error)
    }
  }



    const login = async()=> {
      try{
        const userData = await signInWithEmailAndPassword(Auth , email , password)
        console.log("login successful")
      }
      catch(error){
        console.error(error)
      }
    } 

  return(
    <KeyboardAvoidingView style={styles.mainview} >

      <View style={styles.view} >
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
      />


<TextInput
        style={styles.input2}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
      onPress={login}
      style={styles.buton}>
        <Text style={[{color:"white"}]} >Giriş Yap</Text>
      </Pressable>
     

      <Pressable 
      onPress={register}
      style={styles.buton2}  >
        <Text style={[{color:"white"}]} >Kayıt Ol</Text>
      </Pressable>




    
      </View>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  mainview:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  view:{
    height:"42%",
    width:"85%",
    borderWidth:0,
    borderRadius:16,
    backgroundColor:"#E2E2B6",
    alignItems:"center",
    justifyContent:"center"
  },
  input:{
    borderWidth:2,
    borderRadius:16,
    height:"10%",
    width:"60%",
    textAlign:"center",
    marginBottom:12
  },

  input2:{
    borderWidth:2,
    borderRadius:16,
    height:"10%",
    width:"60%",
    textAlign:"center",
    marginBottom:36
  },
  
  
  buton:{
    width:"30%",
    height:"10%",
    backgroundColor:"#03346E",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:16,
    marginBottom:12
  },

    buton2:{
      width:"20%",
      height:"7%",
      backgroundColor:"#6EACDA",
      alignItems:"center",
      justifyContent:"center",
      borderRadius:16
  
    },
    tinyLogo:{
      height:50,
      width:50
    }

});

export default Account;
