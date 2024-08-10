/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput
} from 'react-native';


const Home =() => {

  return<View style={styles.safeview}  >

  <View style={styles.view1}>
    <Text>
    </Text>
    <Text>
    </Text>

   <Text style={styles.baslik} >YOLCU</Text>

   <TextInput
      style={styles.input}
      placeholder="Nereden"
    />
    <TextInput
      style={styles.input}
      placeholder="Nereye"
    />

  </View>
  <View style={styles.view2}  >
    <Text>data</Text>
  </View>

  <View style={styles.view2}  >
    <Text>data</Text>
  </View>

  <View style={styles.view2}  >
    <Text>data</Text>
  </View>

  <View style={styles.view2}  >
    <Text>data</Text>
  </View>

  <View style={styles.view2}  >
    <Text>data</Text>
  </View>



</View>

}

const styles = StyleSheet.create({
baslik : {
  fontSize:60,
  fontWeight:"bold",

},
safeview: {
 borderWidth:0,
 flex:1,
 alignItems:"center",
 backgroundColor:"#E2E2B6"  
},

view1:{
  alignItems:"center",
  borderWidth:0,
  backgroundColor:"white",
  width:"100%",
  borderRadius:14,
  height:"30%",
  marginBottom:6
},
input :{
  borderWidth:2,
  borderRadius:9,
  height:35,
  width:120,
  margin:6,
  textAlign:"center"
},
view2:{
  alignItems:"center",
  justifyContent:"center",
  borderWidth:0,
  backgroundColor:"white",
  width:"90%",
  borderRadius:14,
  height:"10%",
  margin:6
}
});
export default Home;
