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

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import app from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

import { getAuth } from 'firebase/auth';

const Auth =getAuth(app)


const Registar=()=>{


 


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [lastName , setLastName ]= useState(''); 
  const navigation = useNavigation();
  
console.log(email)

function login(){
  navigation.navigate("login");
}

const register = async () => {
  try {
    const userData = await createUserWithEmailAndPassword(Auth, email, password);

    // Kullanıcının   
 //profilini güncelle
    await updateProfile(userData.user, {
      displayName: userName,
      lastName: lastName,
    });


    const posta = userData.user.email
    const username = userData.user.displayName



    navigation.navigate("login");
    console.log('Kullanıcı kaydı başarılı:', userData.user);
    
  } catch (error) {
    console.error('Hata oluştu:', error);
  }
};






  return(
    
<View style={[{
      
      flex:1,
      justifyContent:"center",
      alignItems:"center"
      }]} >
<View style={styles.view} >
        <Text style={[{fontWeight:"bold" , fontSize:20 }]}  >HESAP OLUŞTUR</Text>


 
     <View  style={styles.childCopont } >
        <TextInput
                style={styles.input}
                placeholder="Ad "
                value={userName}
               onChangeText={setUserName}
              />

        <TextInput
                style={styles.input}
                placeholder="Soyadı"
                value={lastName}
               onChangeText={setLastName}
              />

              

        </View> 


        <View  style={styles.childCopont } >

    
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


        </View>

      


      <Pressable 
      onPress={register }
      style={styles.buton}  >
        <Text style={[{color:"white"}]} >Kayıt Ol</Text>
      </Pressable>

      <Pressable 
      onPress={login }
      style={styles.buton}  >
        <Text style={[{color:"white"}]} >GİRİŞ YAP</Text>
      </Pressable>
    
    
      </View>

</View>
     )

   

}

export default Registar;


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
    height:"90%",
    width:"50%",
    textAlign:"center",
    margin:6
  },

  input2:{
    borderWidth:2,
    borderRadius:16,
    height:"90%",
    width:"50%",
    textAlign:"center",
    margin:6
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
    },
    childCopont:{
            flexDirection: 'row',
            height:"auto",
            width:"auto",
            alignItems:"center",
            margin:12

            
            

    }


});
