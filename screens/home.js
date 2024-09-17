/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useEffect , useState} from 'react';
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
  ActivityIndicator,
  Pressable,
  RefreshControl
} from 'react-native';


import  app  from '../firebaseConfig';
import { getFirestore  } from "firebase/firestore";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Loading } from './loading';
import Modal from 'react-native-modal';
import { getAuth ,onAuthStateChanged } from "firebase/auth";



import { collection, getDocs , addDoc ,doc ,getDoc} from "firebase/firestore"; 


const db = getFirestore(app)
const auth = getAuth(app)
const Home =() => {

 


  const [posts , setPosts] = useState([]);
  const [loading, setLoading] = useState(false);


  const [comentLoading, setCloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comentData , setComentData] = useState([]);


  const Coment = async (documentId) => {
    setCloading(false);
     const comentData = []; 
    try {
    
      const docs = doc(db, 'posts', documentId);
      
    
    const yorumCollection = collection(docs, 'comments'); 
    const düzenliveri = await getDocs(yorumCollection);

    düzenliveri.forEach((doc) => {
      
      const data = { ...doc.data(), id: doc.id };
      console.log(data);
      comentData.push(data)
    }); 
    setComentData(comentData);
    setCloading(true);
    console.log("yorum tamamdır")
    



    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };
  


  const toggleModal = (postId) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null); // Modali kapatmak için
    } else {
      setSelectedPostId(postId);


      

      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // Kullanıcı oturum açmış
          Coment(postId);
         // console.log('User is signed in:', currentUser);
        } else {
          // Kullanıcı oturum açmamış
          setUser(null);
          console.log('No user is signed in');
        }
      });
        unsubscribe

      
       // İlgili post'un id'sine göre modali açmak için
    }
  };
  
  



  const fetchData = async () => { 
    setRefreshing(true);
    const fetchedPosts = []; 
    const querySnapshot = await getDocs(collection(db, "posts"));
    
   // console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      const data = { ...doc.data(), id: doc.id };
      fetchedPosts.push(data);


      
    },)
    setPosts(fetchedPosts)
    setLoading(true);
    setRefreshing(false);
   //console.log("gelenveri" , data )
   console.log("Çekilen Veriler:", fetchedPosts)
   console.log("Posts:", posts)
   console.log("Posts Türü:", typeof posts)
    ;}



  

  
 
  
 
  
      useEffect(()=>{
   
         fetchData();
         console.log(loading);
      },[])


     


     // async fonksiyon çağrısı
  

const renderPosts =()=>{
  
}



// Tüm belgeleri çağırma ve log ile yazdırma


  return<SafeAreaView style={styles.safeview}  >

  <View style={styles.view1}>
  <Image
           style={ styles.profilpp  }
            source={require('../sorce/pngwing.com.png')}
          />
    
<View style={[{marginLeft:"8%" ,
justifyContent:"center",Width:60,flex:1
}]} >
  
   <Text style={styles.baslik} >Write</Text>
</View>
  

   
  </View>




<ScrollView 
refreshControl={
  <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
}
showsVerticalScrollIndicator={false}
style={styles.scroll}   >


{ loading ? <ScrollView 

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
     
     
  
     
     
        </View> 
     
        <View style={[{width :"100%",alignItems:"center",justifyContent:"center",borderWidth:0 ,marginBottom:6
        }]} >
        <Text style={styles.text} >{value.content}</Text>
          </View>

          <View style={styles.minCom}  >
         <Text style={{fontSize:15}} >#{value.title}</Text>
    </View>


          <View style={ styles.btonlar } > 
          <Pressable
          
          style={[styles.comment ,{marginLeft:"8%"} ]} >
          <FontAwesome5 name="heart" size={24} color="black" />
          </Pressable>

          <Pressable
          onPress={() => toggleModal(value.id)}

          style={[styles.comment ,{marginLeft:"0.1%"} ]} >
          <FontAwesome5 name="comment-dots" size={24} color="black" />

          </Pressable>
          <Pressable style={[styles.comment ,{marginLeft:"0.1%"} ]} >
          <FontAwesome5 name="share" size={24} color="black" />

          </Pressable>
          <Modal
              backdropOpacity={0.1}
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
          
          
            {comentLoading ? 
            <View style={{flex:1}} >

            
            <ScrollView style={{flex:1 , borderWidth:0 }} >

              {
                comentData.map((value)=>{
                  return(
                    
                                      <View 
                                      key={value.id}
                                      style={styles.comentData} >

                                    
                                        <Image
                                          style={styles.profilpC}
                                            source={require('../sorce/profil.jpg')}
                                          />

                                          <View style={{marginLeft:"4%"}} >
                                            <View style={{marginBottom:2}} >
                                              <Text style={{fontWeight:"bold"}} >{value.author}</Text> 
                                            </View>
                                             
                                            <Text style={{fontSize:16}} >{value.content}</Text>
                                            


                                          </View>
                                          <View style={{flex:1 ,alignItems:"flex-end" }} >
                                            <Pressable style={{marginRight:"8%"}} >
                                            <FontAwesome5 name="heart" size={24} color="black" />
                                            </Pressable>
                                          </View>

                                            
                                        </View>
 
                  )


                })
              }
            </ScrollView>
            
            </View> : <Loading/>}
           
            <View style={{width:"100%", height:70, justifyContent:"flex-end"  }} >
                <View style={{width:"100%" , borderBottomWidth:1 , height:60, flexDirection: 'row', alignItems:"center" }} >
                <Image
                 style={styles.profilpC}
                  source={require('../sorce/profil.jpg')}
                  />
                  <TextInput
                  placeholder='yorum yaz'
                  style={{flex:1 , marginLeft:"4%"}} ></TextInput>

                                      <Pressable style={{marginRight:"8%"}} >
                                            <FontAwesome5 name="location-arrow" size={20} color="black" />
                                            </Pressable>


                </View>
              </View>
        </View>
      </Modal>
          </View>



      </View>
    )
    
    })
       
  }

  
</ScrollView>
   :null }
 

     
  
 

 

       


   

  
</ScrollView>

</SafeAreaView>

}
//daha sonra çözülcek sorun bottumtab ın altınada kalan data parçaları
const styles = StyleSheet.create({
baslik : {
  fontSize:50,
  fontWeight:"bold",
  marginLeft:"8%",
 // fontFamily:"Cochin"
},
safeview: {
 borderWidth:0,
 flex:1,
 alignItems:"center",
 justifyContent:"center",
 backgroundColor:"#E2E2B6"  
},

view1:{
  flexDirection: 'row',
 // justifyContent:"center",
  borderWidth:0,
  backgroundColor:"white",
  width:"100%",
  borderRadius:14,
  height:"15%",
  marginBottom:6,
  alignItems:"center"
},
input :{
  borderWidth:2,
  borderRadius:9,
  height:35,
  width:120,
  margin:6,
  textAlign:"center"
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
text:{
  fontSize:20,
  margin:10

},
dataelememt:{
   flexDirection: 'row',
   width:"100%",
   height:60,
 alignItems:"center",
   borderWidth:0,
   marginTop:12


},
  profilp:{
    height:50,
    width:50,
    borderRadius:50,

  },
scroll:{

flex:1,
 flexGrow:1,
width:"99%"

  
},
minCom:{
alignItems:"flex-end",
marginRight:"8%",

},

profilpp:{
  height:90,
  width:90,

  marginLeft:"8%"


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
  height:"60%",
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


},
comentData:{
  
  width:"100%" ,
  borderWidth:1 , 
  height:80 , 
  marginBottom:12  , 
  borderRadius:16,
  alignItems:"center",
 
  flexDirection: 'row',

},
profilpC:{
  height:40,
  width:40,
  borderRadius:50,
  marginLeft: "4%"

},
});
export default Home;
