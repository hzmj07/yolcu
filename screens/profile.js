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
  Pressable,
  Image,
  KeyboardAvoidingView,
  RefreshControl
} from 'react-native';



 import { getAuth, signOut  } from "firebase/auth";
 import { useNavigation } from '@react-navigation/native';
 import Modal from 'react-native-modal';

 import { getFirestore, collection, query, where, getDocs , doc ,deleteDoc} from 'firebase/firestore';
 import { getApp , } from 'firebase/app';
 import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

 import { Loading } from './loading';







const Profile=()=>{

 

  const navigation = useNavigation();

  const auth = getAuth();
  const UserData = auth.currentUser;




  const db = getFirestore(getApp());


  
  const email = UserData.email
  const userName = UserData.displayName

  const [posts , setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
 const [selectedPostId, setSelectedPostId] = useState(null);
 const [refreshing, setRefreshing] = useState(false);

  console.log(email);


  const vericagir = async () => {

    setLoading(false)
    setRefreshing(true);


function set(veri){
  setPosts(veri)
  setLoading(true);
  setRefreshing(false);
}

    try {
    

      const postsRef = collection(db, 'posts'); 
      const q = query(postsRef, where('author', '==', `${userName}`)); 
  
      const querySnapshot = await getDocs(q); 
      
      
      const veriler = querySnapshot.docs.map(doc => ({
        id: doc.id,        // Döküman ID'si
        ...doc.data()      // Dökümanın verileri
      }));
      console.log( "vei" , veriler)
      set(veriler)
     
      
    } catch (error) {
      console.error('Veri çekilirken hata oluştu:', error);
    }
  };

useEffect(()=>{
   
  vericagir();
 
},[])

  const LogOut = async({})=> {
    try{
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Sign-out successful");
        navigation.navigate("login");



      })
    }
    catch(error){
      console.error(error)

    }
  }
 

const toggleModal = (postId) => {
  if (selectedPostId === postId) {
    setSelectedPostId(null); // Modali kapatmak için
  } else {
    setSelectedPostId(postId); // İlgili post'un id'sine göre modali açmak için
  }
};



  async function deleteDocument(id)
  {
    try {
      // Döküman referansını al ve sil
      await deleteDoc(doc(db, "posts", `${id}`));
;
    
      console.log('Döküman başarıyla silindi!');
      setSelectedPostId(null);
      vericagir();
      console.log(id)
    } catch (error) {
      console.error('Döküman silinirken hata oluştu: ', error);
    }
  };





    return (
      <View style={[{flex:1,backgroundColor:"#E2E2B6" }]} >
        <View style={styles.head} >


<View style={[{      flexDirection: 'row',
alignItems:"center" , justifyContent:"center",
marginBottom:12
}]} >

<Image
           style={styles.profilpp}
            source={require('../sorce/profil.jpg')}
          />
          <Text style={[{fontSize:60,marginLeft:26, fontWeight:"bold"}]}  >{userName}</Text>


</View>


      

           <Text  style={[{fontSize:20,marginBottom:22  }]} >{email}</Text>



        

            
          <Pressable
         // onPress={cikis} 
          
          style={[styles.buton , { backgroundColor:"#03346E"} ]} >

          <Text  style={({color:"white" ,fontWeight:"bold" })} >Edit Profile</Text> 
          </Pressable>

          
          <Pressable
          onPress={LogOut} 
          
          style={ [styles.buton , {  marginTop:21, backgroundColor:"red"} ] } >

          <Text>LogOut  </Text> 
          </Pressable>

          </View>


<View style={[{
  
  marginLeft:"8%",
  justifyContent:"center"
}]} >

   <Text style={[{fontSize:20 , fontWeight:"bold", margin:8}]} > Paylaşımlar</Text>
</View>
     


        <View style={styles.scroll} >
        { loading ? <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={vericagir} />
        }
        style={[{height:"90%" , borderWidth:0}]}  >

  {
     posts.map((value)=>{


      return( <View
       key={value.id}
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
            <View style={{width:"48%" , alignItems:"flex-end"}} >

                            <Pressable  
                           onPress={() => toggleModal(value.id)}
                            style={{width:20 , height:26 , alignItems:"center" , justifyContent:"center" }} ><Text style={{fontSize:20 , fontWeight:"bold"}} >⁝</Text></Pressable>

<Modal
              backdropOpacity={0.2}
              isVisible={selectedPostId === value.id}
              onBackdropPress={() => toggleModal(value.id)}  // Modal dışına basınca kapat
              style={styles.modal}
            >
        <View style={styles.panel}>
          <View style={{width:"100%" , height:"4%"  ,alignItems:"center" , justifyContent:"center", 
             marginBottom:12
          }} >
              <View style={{width:"15%", borderRadius:12, borderWidth:2 , borderColor:"gray"}} ></View>
          </View>
          
          <Pressable 
        onPress={() => deleteDocument(value.id)}
          style={styles.panelBton} >
            <FontAwesome5  style={{marginLeft:"7%"}} name="trash-alt" size={20} color="black" />
            <Text style={{fontSize:16 , marginLeft:"8%"}} >Sil</Text>
          </Pressable>

          <Pressable 
        //onPress={() => deleteDocument(value.id)}
        style={styles.panelBton} >
                      <FontAwesome5  style={{marginLeft:"7%"}} name="edit" size={20} color="black" />

            <Text style={{fontSize:16 , marginLeft:"8%"}} >Düzenle</Text>
          </Pressable>

          <Pressable 
       // onPress={() => deleteDocument(value.id)}
       style={styles.panelBton} >
                    <FontAwesome5  style={{marginLeft:"7%"}} name="share" size={20} color="black" />

            <Text style={{fontSize:16 , marginLeft:"8%"}} >Paylaş</Text>
          </Pressable>



        </View>
      </Modal>

            </View>
    
    
     
     <View style={styles.minCom}  >
          <Text></Text>
     </View>
     
     
        </View> 
     
        <View style={[{width :"100%",alignItems:"center",justifyContent:"center",borderWidth:0 ,marginBottom:6
        }]} >
        <Text style={styles.text} >{value.content}</Text>
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
   :       <View style={[{flex:1}]} >
   <Loading renk={"black"} />
</View>  }
 
        </View>
        </View>



         
        
    
  )



}
export default Profile 

const styles =StyleSheet.create({
  head:{
    width:"100%",
    height:"45%",
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
    width:"30%",
    height:"10%",
   
    alignItems:"center",
    justifyContent:"center",
    borderRadius:26,
    
    

  },
  profilp:{
    height:50,
    width:50,
    borderRadius:60

  },
  data:{
    flex:1,
  
    borderWidth:0.4,
    backgroundColor:"white",
    width:"auto",
    borderRadius:16,
    height:"auto",
    margin:6
  },
  dataelememt:{
    flexDirection: 'row',
    width:"100%",
    height:60,
  alignItems:"center",
    borderWidth:0,
    marginTop:12
 
 
 },
 minCom:{
  marginLeft:16
  },
  scroll:{
    flex:1,
    width:"100%",
    height:"100%",
    borderWidth:0,
    flexGrow: 1,
    
  },
  profilpp:{
    height:90,
    width:90,
    borderRadius:190,
   
  
  
  },

  text:{
    fontSize:20,
    margin:10
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
modal: {
  justifyContent: 'flex-end', // Modalı ekranın altına yerleştirir
  margin: 0, // Varsayılan margin'i kaldırır
},
panel: {
 
  backgroundColor:"white",
  padding: 20,
  borderTopLeftRadius: 26,
  borderTopRightRadius: 26,
},
 option: {
  fontSize: 18,
  paddingVertical: 10,
},
panelBton:{
  backgroundColor:"lightgray",
  width:"100%" ,
  height:50 , 
  alignItems:"center" ,
  justifyContent:"center",
  marginBottom:8,
  borderRadius:16,
  flexDirection: 'row',
  justifyContent:"flex-start"


}


})