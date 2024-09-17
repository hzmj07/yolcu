
import {React , useState }  from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Image,
  Pressable
} from 'react-native';

import { getFirestore } from "firebase/firestore";
import app from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { UserData } from './signin/login';
import firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Loading } from './loading';


import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
//kullanıcı dostu post yazma sayfası yaz diğer sayfalarla uyumlu bir tasarım dili kullan 



const db = getFirestore(app)




const Write =() => {

  const [ isLoading , setLoading ] = useState(false);
  const [text, setText] = useState('');
  const [title , setTitle] = useState('');
 
  const maxLength = 300;

  const auth = getAuth();
  const user = auth.currentUser;
 





    
  

  const getData = async ()=>{
    setLoading(true)
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        author: user.displayName, 
        content: text,
        date: "zaman",
        title: title,
  
      });
      console.log("Document written with ID: ", docRef.id);
      setText('');
      setTitle('');

      setLoading(false)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
     
    

  //console.log(Auth().currentUser.uid)
  


  







  const handleTextChange = (input) => {
    if (input.length <= maxLength) {
      setText(input);
    }}
  
  return(
  <View style={styles.View} >
    <View style={styles.minView} >
      <View style={styles.headers}  >
         <Image
       style={styles.profilp}
        source={require('../sorce/profil.jpg')}
      />
      <View style={[{alignItems:"center" , justifyContent:"center"}]} >
          <Text style={[{fontSize:25 , fontWeight:"bold"}]} >{user.displayName}</Text>
      </View>
     
      </View>





   <View style={[{alignItems:"center" , justifyContent:"center" , flex:1 }]} >
     <View style={[styles.content , { marginBottom:13, height:"50%",} ]} >
     <TextInput
        style={[styles.content , {   height:"50%",} ]}
        placeholder="içerik"
        multiline={true}
        maxLength={maxLength}
        onChangeText={handleTextChange}
        value={text}
      />
      <View style={[{ width:"90%" }]} >
     <Text   >
          {text.length}/{maxLength}
        </Text>

      </View>
     
  
    </View>


    <View style={[styles.content , {  height:"10%",    marginBottom:16,} ]} >
     <TextInput
        style={[styles.content  ]}
        placeholder="konu"
        multiline={false}
        //maxLength={maxLength}
        onChangeText={setTitle}
        value={title}
      />
      
     
  
    </View>







    
  
      <Pressable
          onPress={getData} 
          
         style={styles.buton} >
          { isLoading ? <Loading renk={"white"} /> : <Text style={({color:"white" ,fontWeight:"bold"})} >Paylaş</Text>  }
           
          </Pressable>

   

   </View>
   
      
    </View>

    
  </View>
      

)
}

const styles = StyleSheet.create({
  View:{
    flex:1,
    
    backgroundColor:"#E2E2B6" 

  },
  minView:{
    height:"80%",
    width:"100%",
    backgroundColor:"#FFFFFF",
    borderRadius:16,
    



  },
  profilp:{
    height:90,
    width:90,
    borderRadius:150,
    margin:46,
 
  },

  content:{
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#E2E2B6",
    borderRadius:16,
    width:"90%",


    textAlignVertical: 'top'
  },
  headers:{
    
    flexDirection: 'row',
  
  },
  buton:{
    width:"25%",
    height:"8%",
    backgroundColor:"#03346E",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:16,
    margin:7
    

  },
  ekle:{
    width:"15%",
    height:"60%",
     backgroundColor:"#E2E2B6",
     alignItems:"center",
     justifyContent:"center" ,
     borderRadius:16,
     margin:10
  }
});

export default Write;
