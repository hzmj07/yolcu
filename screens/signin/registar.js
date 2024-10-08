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
import { Loading } from '../loading';
import { getAuth } from 'firebase/auth';
import { Hata } from './login';

const Auth =getAuth(app)


const Registar=()=>{


 


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [lastName , setLastName ]= useState('');
  const [ isLoading , setLoading ] = useState(false);
  const [hata , setHata] = useState(false);
 
  const navigation = useNavigation();
  
console.log(email)

function login(){
  navigation.navigate("login");
}

const register = async () => {
  setLoading(true)
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


    setLoading(false);
    setHata(false);
    setEmail('');
    setPassword('');
    navigation.navigate("login");
    console.log('Kullanıcı kaydı başarılı:', userData.user);
    
  } catch (error) {
    setLoading(false);
    console.error('Hata oluştu:', error);
    setHata(true);
    
  }
};






  return(
    
<View style={[{
      
      flex:1,
      justifyContent:"center",
      alignItems:"center"
      }]} >
    <View style={styles.view} >

    <Text style={[{fontWeight:"bold" , fontSize:60,margin:16 }]}  >Write</Text>

    <Image
           style={styles.profilp}
            source={require('../../sorce/pngwing.com.png')}
          />

        <Text style={[{fontWeight:"bold" , fontSize:20 ,marginBottom:20 }]}  >Registar</Text>


 
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

      

        { hata ? <Hata/> : null }

      <Pressable 
      onPress={register }
      style={styles.buton}  >
          { isLoading ? <Loading renk={"white"} /> : <Text style={({color:"white" ,fontWeight:"bold"})} >Kayıt Ol</Text>  }
          </Pressable>

      <Pressable 
      onPress={login }
      style={styles.buton2}  >
        <Text style={[{color:"black"}]} >GİRİŞ YAP</Text>
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
    borderWidth:1,
    borderRadius:16,
    backgroundColor:"#E2E2B6",
    alignItems:"center",
    justifyContent:"center"
  },
  input:{
    borderBottomWidth:2,
    borderRadius:0,
    height:"90%",
    width:"48%",
    textAlign:"center",
    margin:6
  },

  input2:{
    borderBottomWidth:2,
    borderRadius:0,
    height:"90%",
    width:"48%",
    textAlign:"center",
    margin:6
  },
  
  
  buton:{
    width:"30%",
    height:"6%",
    backgroundColor:"#03346E",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:16,
    marginBottom:16
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
            margin:24

            
            

    },
    buton2:{
      alignItems:"center",
      justifyContent:"center",
      borderRadius:16,
      marginBottom:21,
     
   

    },
    profilp:{
      height:240,
      width:240,
      margin:14
    
    },



});
