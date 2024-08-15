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
import Auth from '../../firebaseConfig';




const Registar=()=>{


 


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
console.log(email)

const register = async()=> {
  try{
    const userData = await createUserWithEmailAndPassword(Auth , email , password)
    console.log("registar successful");
    console.log(userData.user.email)

  }
  catch(error){
    console.error(error)
  }
}







  return(
   

      <View style={styles.view} >
        <Text>registar</Text>


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

      
<TextInput
        style={styles.input2}
        placeholder="Şifre"
       // value={password}
        //onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable 
      onPress={register}
      style={styles.buton}  >
        <Text style={[{color:"white"}]} >Kayıt Ol</Text>
      </Pressable>
    
      </View>)

   

}

export default Registar;


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
    marginBottom:36
  },

  input2:{
    borderWidth:2,
    borderRadius:16,
    height:"20%",
    width:"60%",
    textAlign:"center",
    marginBottom:12
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
