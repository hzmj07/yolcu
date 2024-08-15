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



 import { getAuth, signOut } from "firebase/auth";
 import { useNavigation } from '@react-navigation/native';







const Profile=({route})=>{

 

  const navigation = useNavigation();

  const auth = getAuth();

  if (!route || !route.params) {
    return null; // veya bir yükleniyor animasyonu koyabilirsiniz
  }



  const data = route ;


  const email = data.params.email

  console.log(email);

  
  const LogOut = async({})=> {
    try{
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Sign-out successful");
        navigation.navigate("account");



      })
    }
    catch(error){
      console.error(error)

    }
  }

    return (
      <View style={[{flex:1,backgroundColor:"#E2E2B6" }]} >
        <View style={styles.head} >






          <Text style={[{fontSize:60,margin:22 , fontWeight:"bold"}]}  >UserName</Text>

           <Text  style={[{fontSize:20,margin:22  , fontWeight:"bold"}]} >{email}</Text>

          <View style={styles.butonlarcom} >

            
          <Pressable
         // onPress={cikis} 
          
          style={styles.buton} >

          <Text  style={({color:"white" ,fontWeight:"bold" })} >Edit Profile</Text> 
          </Pressable>



          <Pressable
         // onPress={cikis} 
          
         style={styles.buton} >

          <Text style={({color:"white" ,fontWeight:"bold"})} >Pay Settings</Text> 
          </Pressable>


          <Pressable
          onPress={LogOut} 
          
          style={[{
            width:"80%",
            height:"25%",
            backgroundColor:"#ff3131",
            alignItems:"center",
            justifyContent:"center",
            borderRadius:16,
           margin:7
            
                    }]} >

          <Text>LogOut  </Text> 
          </Pressable>

          </View>

        </View>

         
        </View>
    
  )



}
export default Profile 

const styles =StyleSheet.create({
  head:{
    width:"100%",
    height:"66%",
    backgroundColor:"white",
    borderRadius:16,
    alignItems:"center",
    justifyContent:"center"

  },
  butonlarcom:{
    height:"33%",
    width:"80%",
    
    alignItems:"center",
    justifyContent:"center",
    borderRadius:16,
    backgroundColor:"#e2e2b6"

  },
  buton:{
    width:"80%",
    height:"25%",
    backgroundColor:"#03346E",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:16,
    margin:7
    

  },



})