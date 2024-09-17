import React , {useState ,useEffect } from 'react';
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
  Pressable,
  KeyboardAvoidingView
} from 'react-native';



import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Loading } from './loading';


const Search =() => {
  const [text , setText ] = useState('');
  const [posts , setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [veri , setVeri] = useState(false);


//beck-end;;;; 

const konu = async () => {

    setLoading(true)
    setPosts([])


    function set(veri){
    setPosts(veri)
    setVeri(true)
    setLoading(false)

}

  try {
    const db = getFirestore(getApp());

    const postsRef = collection(db, 'posts'); 
    const q = query(postsRef, where('title', '==', `${text}`)); 

    const querySnapshot = await getDocs(q);  
    const veriler = querySnapshot.docs.map(doc => doc.data());
    console.log( "vei" , veriler)
    set(veriler)
   
    
  } catch (error) {
    console.error('Veri çekilirken hata oluştu:', error);
  }
};

const kisi = async () => {

  setLoading(true)
  setPosts([])

  
  function set(veri){
  setPosts(veri)
  setVeri(true)
  setLoading(false)

}
//
try {
  const db = getFirestore(getApp());

  const postsRef = collection(db, 'posts'); 
  const q = query(postsRef, where("author", ">=", `${text}`), 
  where("author", "<=", `${text}` + '\uf8ff')); 

  const querySnapshot = await getDocs(q);  
  const veriler = querySnapshot.docs.map(doc => doc.data());
  console.log( "vei" , veriler)
  set(veriler)
 
  
} catch (error) {
  console.error('Veri çekilirken hata oluştu:', error);
}
};



const post = async () => {

  setLoading(true)
  setPosts([])

  
  function set(veri){
  setPosts(veri)
  setVeri(true)
  setLoading(false)

}

try {
  const db = getFirestore(getApp());

  const postsRef = collection(db, 'posts'); 
  const q = query(postsRef, 
             where("content", ">=", `${text}`),
             where("content", "<=", `${text}` + '\uf8ff')); 

  const querySnapshot = await getDocs(q);  
  const veriler = querySnapshot.docs.map(doc => doc.data());
  console.log( "vei" , veriler)
  set(veriler)
 
  
} catch (error) {
  console.error('Veri çekilirken hata oluştu:', error);
}
};









  return(
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}

    style={styles.safeview} >
        <View style={styles.view1}>
  
        <View style={[{height:"30%", width:"95%", alignItems:"center",justifyContent:"center",  flexDirection: 'row' ,backgroundColor:"lightgray",

          borderRadius:16
        }]} >
        <TextInput 
        onChangeText={setText}
       
        keyboardType='web-search'
        placeholder='Search...'
        style={styles.input} >
          

        </TextInput>

  </View>

  
<View  style={[{ width:"100%", alignItems:"center",justifyContent:"center" ,      flexDirection: 'row',
}]} >

        <Pressable
         onPress={kisi} 
          
          style={ [styles.buton , { borderWidth:1 , marginRight:2} ] } >

          <Text>Kişi</Text> 
          </Pressable>


          <Pressable
          onPress={konu} 
          
          style={ [styles.buton , { borderWidth:1, marginRight:2} ] } >

          <Text>Konu</Text> 
          </Pressable>

          <Pressable
         //onPress={post} 
          
          style={ [styles.buton , { borderWidth:1} ] } >

          <Text>Post</Text> 
          </Pressable>
  </View>
   
  </View>

  <View style={styles.scroll} >
        { veri ? <ScrollView>

{
   posts.map((value,index)=>{


    return( <View
      key={index}
      style={styles.data}  >
   
   
   
      <View style={styles.dataelememt} >
       
       <View style={{margin: 29  }} >  
      <Image
          style={styles.profilp}
           source={require('../sorce/profil.jpg')}
         />
       </View>
    
            <View>
               <Text style={{fontSize:20 , fontWeight:"bold"}} >@{value.author}</Text>
             </View>

           
    
    
    
       </View> 
    
       <View style={[{width :"100%",alignItems:"center",justifyContent:"center",borderWidth:0 ,marginBottom:6
       }]} >
       <Text style={styles.text} >{value.content}</Text>
         </View>

         <View style={styles.minCom}  >
         <Text>#{value.title}</Text>
    </View>

         <View style={ styles.btonlar } > 
         <Pressable style={[styles.comment ,{marginLeft:"8%"} ]} >
         <FontAwesome5 name="heart" size={24} color="black" />
         </Pressable>

         <Pressable style={[styles.comment ,{marginLeft:"0.1%"} ]} >
         <FontAwesome5 name="comment-dots" size={24} color="black" />

         </Pressable>
         <Pressable style={[styles.comment ,{marginLeft:"0.1%"} ]} >
         <FontAwesome5 name="share" size={24} color="black" />

         </Pressable>

         </View>



     </View>
   )
   
   })
     
}
</ScrollView>
 : null}

 { loading ? <View style={[{flex:1}]} >
     <Loading renk={"black"} />
  </View>  : null}


        </View>
  

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({


  safeview: {
    borderWidth:0,
    flex:1,
    alignItems:"center",

    backgroundColor:"#E2E2B6"  
   },
   view1:{
    
    alignItems:"center",
     justifyContent:"flex-end",
     borderWidth:0, 
     backgroundColor:"white",
     width:"100%",
     borderRadius:14,
     height:"15%",
    
     alignItems:"center"
   },
   searchp:{
    height:"84%",
    width:"9%",
  
    borderWidth:0,
    margin:2
  
  
  },
  baslik : {
    fontSize:30,
    fontWeight:"bold",
    marginLeft:"8%"
  
  },
  input:{
    
    width:"85%",
    height:"100%",
    
    borderRadius:16,
    textAlign:"center",
    fontSize:20,
    
  },
  buton:{
    width:"31%",
    height:"60%",
   
    alignItems:"center",
    justifyContent:"center",
    borderRadius:26,
    
    

  }, scroll:{
    flex:1,
    width:"100%",
    height:"100%",
    borderWidth:0,
    flexGrow: 1,
    
  }, data:{
    flex:1,
  
    borderWidth:0.4,
    backgroundColor:"white",
    width:"auto",
    borderRadius:16,
    height:"auto",
    margin:6
  },
  
  minCom:{
    marginRight:"8%",
    alignItems:"flex-end"
    },
    
    profilpp:{
      height:30,
      width:30,
      borderRadius:60
  
    },  text:{
      fontSize:20
    },
    
    dataelememt:{
      flexDirection: 'row',
      width:"100%",
      height:60,
    alignItems:"center",
      borderWidth:0,
      marginTop:12
   
   
   },
   btonlar:{
    height:60,
    width:"100%",
    flexDirection: 'row',
    alignItems:"center",
    

},
comment:{
  height:40,
  width:40 ,
  alignItems:"center",
  justifyContent:"center"
},
profilp:{
  height:50,
  width:50,
  borderRadius:50,

},
});

export default Search;
