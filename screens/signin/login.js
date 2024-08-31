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

import {  signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebaseConfig';

import Profile from '../profile';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import Registar from './registar';

const Auth =getAuth(app) 



const Login=()=>{


      
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigation = useNavigation();
    

  

      
    

      function registar(){
        navigation.navigate("registar");
      }
  



  const login = async({})=> {
    try{
      const userData = await signInWithEmailAndPassword(Auth , email , password)
      console.log("login successful");
      const posta = userData.user.email
      const userName = userData.user.displayName
      const userid = userData.user.uid
      


      
      navigation.navigate("app");
      //console.log("uid", userData.user.uid)
     
    }
    catch(error){
      console.error(error)
    }
  } 

  return(
   
    <View style={[{
      
      flex:1,
      justifyContent:"center",
      alignItems:"center"
      }]} >



<View style={styles.view} >
    
<Text style={[{fontWeight:"bold" , fontSize:20 , margin:16}]}  >GİRİŞ YAP</Text>

       
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
     // secureTextEntry
    />

    <Pressable
    onPress={login}
    style={styles.buton}>
      <Text style={[{color:"white"}]} >Giriş Yap</Text>
    </Pressable>

    <Pressable
    onPress={registar}
    style={styles.buton}>
      <Text style={[{color:"white"}]} >Kayıt ol</Text>
    </Pressable>
   

  

  
    </View>

    </View>
    


  )

}
export default Login;

const styles = StyleSheet.create({
  mainview:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  view:{
    
    width:"90%",
    borderWidth:0,
    borderRadius:16,
    backgroundColor:"#E2E2B6",
    alignItems:"center",
    justifyContent:"center"
  },
  input:{
    borderWidth:2,
    borderRadius:16,
    height:"15%",
    width:"60%",
    textAlign:"center",
    marginBottom:12
  },

  input2:{
    borderWidth:2,
    borderRadius:16,
    height:"15%",
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

   
  
    
    tinyLogo:{
      height:50,
      width:50
    }

});

