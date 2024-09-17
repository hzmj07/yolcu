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
import { Loading } from '../loading';

const Auth =getAuth(app) 



 export const Hata=()=>{
  return(
     <Text style={[{marginBottom:16 , color:"red"}]} > şifre hatalı </Text> 

  )
}



const Login=()=>{


      
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [hata , setHata] = useState(false);
    const navigation = useNavigation();
    const [ isLoading , setLoading ] = useState(false);

    

  

      
    

      function registar(){
        navigation.navigate("registar");
      }
  



  const login = async({})=> {
    try{
      setLoading(true)
      const userData = await signInWithEmailAndPassword(Auth , email , password)
      console.log("login successful");
      const posta = userData.user.email
      const userName = userData.user.displayName
      const userid = userData.user.uid
      


      setLoading(false);
      setHata(false);
      setEmail('');
      setPassword('');
      navigation.navigate("app");

      //console.log("uid", userData.user.uid)
     
    }
    catch(error){
      console.error(error);
      setLoading(false)
      setHata(true);
      

    }
  } 

  return(
   
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
     style={{flex:1 , alignItems:"center" , justifyContent:"center"}} >



<View style={styles.view} >
<Text style={[{fontWeight:"bold" , fontSize:60 }]}  >Write</Text>

<Image
           style={styles.profilp}
            source={require('../../sorce/pngwing.com.png')}
          />

<Text style={[{fontWeight:"bold" , fontSize:20 ,marginBottom:20 }]}  >login</Text>

       
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


      { hata ? <Hata/> : null }


    <Pressable
    onPress={login}
    style={styles.buton}>
          { isLoading ? <Loading renk={"white"} /> : <Text style={({color:"white" ,fontWeight:"bold"})} >Giriş yap</Text>  }
    </Pressable>

    <Pressable
    onPress={registar}
    style={styles.buton2 }>
      <Text style={[{color:"black"}]} >Kayıt ol</Text>
    </Pressable>

    <Pressable
  //  onPress={registar}
    style={styles.buton2 }>
      <Text style={[{color:"black"}]} >şifremi unuttum</Text>
    </Pressable>
   

  

  
    </View>

    </KeyboardAvoidingView>
    


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
    borderWidth:1,
    borderRadius:16,
    backgroundColor:"#E2E2B6",
    alignItems:"center",
    justifyContent:"center"
  },
  input:{
    borderBottomWidth:2,
    borderRadius:0,
    height:"6%",
    width:"60%",
    textAlign:"center",
    marginBottom:12
  },

  input2:{
    borderBottomWidth:2,
    borderRadius:0,
    height:"6%",
    width:"60%",
    textAlign:"center",
    marginBottom:36
  },
  
  
  buton:{
    width:"30%",
    height:"7%",
    backgroundColor:"#03346E",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:16,
    marginBottom:12
  },

   
  
    
    tinyLogo:{
      height:50,
      width:50
    },
    buton2:{
      alignItems:"center",
      justifyContent:"center",
      borderRadius:16,
      marginBottom:6,
     
   

    },
    profilp:{
      height:240,
      width:240,
      margin:14
    
    },

});

