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
import Auth from '../../firebaseConfig';
import Profile from '../profile';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';








const Login=()=>{


      
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const [posta , setPosta] = useState('');
    const [isAuth , setAuth] = useState(false);
    const navigation = useNavigation();
    



      
    
      
  



  const login = async({})=> {
    try{
      const userData = await signInWithEmailAndPassword(Auth , email , password)
      console.log("login successful");
      let veri = userData.user.email
      setPosta(veri);
      setAuth(true);
      navigation.navigate("profile", {email:email});
    }
    catch(error){
      console.error(error)
    }
  } 

  return(
   
    
      <View style={styles.view} >

      
         

            {
                !isAuth ?
                null
                : <Profile
                email={posta}
                />
            }
        

    

        <Text>login</Text>
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
    height:"20%",
    width:"60%",
    textAlign:"center",
    marginBottom:12
  },

  input2:{
    borderWidth:2,
    borderRadius:16,
    height:"20%",
    width:"60%",
    textAlign:"center",
    marginBottom:36
  },
  
  
  buton:{
    width:"30%",
    height:"20%",
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

