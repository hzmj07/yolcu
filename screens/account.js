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

import Login from './signin/login';
import Registar from './signin/registar';


const Account =() => {

  const [login, setLogin] = useState(true);
  const [registar, setRegistar] = useState (false);

  function Komutlogin() {
     setLogin(true) ,
     setRegistar(false)
  }

  function Komutregistar() {
     setRegistar(true) ,
    setLogin(false)
  };


 

  
   




  return(
    <KeyboardAvoidingView style={styles.mainview} >

      <View style={styles.view} >


      <View style={styles.buton2} >

      <Pressable
      onPress={ Komutlogin }
      style={styles.buton}>
        <Text style={[{color:"white" , fontSize:22
        }]} >Giriş Yap</Text>
      </Pressable>

      <Pressable
      onPress={Komutregistar}
      style={styles.buton}>
        <Text style={[{color:"white",fontSize:22}]} >Kayıt Ol</Text>
      </Pressable>

      </View>





        <View style={styles.cheldview} >
          { login ? <Login/> : true}
          { registar ? <Registar/> : null }



          
          </View>  
          
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
   
    height:"60%",
    width:"85%",
    borderWidth:0,
    borderRadius:16,
    backgroundColor:"#E2E2B6",
    alignItems:"center",
    justifyContent:"center"
  },
  input:{
    borderWidth:0,
    borderRadius:16,
    height:"10%",
    width:"60%",
    textAlign:"center",
    marginBottom:12
  },

  input2:{
    borderWidth:0,
    borderRadius:16,
    height:"10%",
    width:"60%",
    textAlign:"center",
    marginBottom:36
  },
  
  
  buton:{
    width:"30%",
    height:"100%",
    backgroundColor:"#03346E",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:16,
    marginLeft:12,
    marginBottom:12
  },

    buton2:{
      flexDirection: 'row',
      height:"10%",
      borderWidth:0,
      alignItems:"center",
      justifyContent:"center"
  
    },
    tinyLogo:{
      height:50,
      width:50
    },
    cheldview:{
      flex:0,
      borderWidth:0,
      height:"70%",
      width:"100%",
      justifyContent:"center",
      alignItems:"center"
    }

});

export default Account;
