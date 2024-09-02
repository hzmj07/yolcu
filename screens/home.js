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
  ActivityIndicator
} from 'react-native';

import { getFirestore } from "firebase/firestore";
import { Loading } from './loading';
import  app  from '../firebaseConfig';


import { collection, getDocs , addDoc } from "firebase/firestore"; 

const db = getFirestore(app)


const Home =() => {

 


  const [posts , setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [veri , setVeri] =useState([]);
 


  const fetchData = async () => { 
    const fetchedPosts = []; // async ekledik
    const querySnapshot = await getDocs(collection(db, "posts"));
   // console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      const data =(doc.data()) ;
      fetchedPosts.push(data);


      
    },)
    setPosts(fetchedPosts)
    setLoading(true)
   //console.log("gelenveri" , data )
   console.log("Çekilen Veriler:", fetchedPosts)
   console.log("Posts Durumu:", posts)
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
    
<View style={[{marginLeft:"8%"}]} >

   <Text style={styles.baslik} >Postlar</Text>
</View>
  

   
  </View>




<ScrollView style={styles.scroll}   >


{ loading ? <ScrollView>

  {
     posts.map((value,index)=>{


      return( <View
       key={index}
       style={styles.data}  >
    
    
    
       <View style={styles.dataelememt} >
     
        <View style={styles.minCom} >
       <Image
           style={styles.profilp}
            source={require('../sorce/profil.jpg')}
          />
        </View>
     
     <View  style={styles.minCom} >
          <Text>{value.author}</Text>
     </View>
     
     
     
     <View style={styles.minCom}  >
          <Text></Text>
     </View>
     
     
        </View> 
     
        <View style={[{width :"100%",alignItems:"center",justifyContent:"center",borderWidth:0
        }]} >
        <Text style={styles.text} >{value.content}</Text>
          </View>
      
      </View>
    )
    
    })
       
  }
</ScrollView>
   : <View style={[{flex:1}]} >
       <Loading renk={"black"} />
    </View> }
 

     
  
 

 

       


   

  
</ScrollView>

</SafeAreaView>

}
//daha sonra çözülcek sorun bottumtab ın altınada kalan data parçaları
const styles = StyleSheet.create({
baslik : {
  fontSize:30,
  fontWeight:"bold",

},
safeview: {
 borderWidth:0,
 flex:1,
 alignItems:"center",
 justifyContent:"center",
 backgroundColor:"#E2E2B6"  
},

view1:{

  justifyContent:"center",
  borderWidth:0,
  backgroundColor:"white",
  width:"100%",
  borderRadius:14,
  height:"10%",
  marginBottom:6,
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

  borderWidth:0,
  backgroundColor:"white",
  width:"auto",
  borderRadius:16,
  height:"auto",
  margin:6
},
text:{
  fontSize:20

},
dataelememt:{
   flexDirection: 'row',
   width:"100%",
   height:"30%",
 alignItems:"center",
   borderWidth:0


},
  profilp:{
    height:30,
    width:30,
    borderRadius:50

  },
scroll:{
  flex:1,
  width:"100%",
  height:"100%",
  borderWidth:0,
  flexGrow: 1,
  
},
minCom:{
marginLeft:16
}
});
export default Home;
