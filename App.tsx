/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
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
 
import { Home , Setting , Account , Write } from './screens/index';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './screens/profile';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Login from './screens/signin/login';
import Registar from './screens/signin/registar';

const Tab =createBottomTabNavigator()

const screenO ={
  tabBarShownLabel:false,
  headerShown:false,
  tabBarStyle:{
    position: "absolute",
    bottom : 0,
    right :0,
    left:0,
    elevation :0,
    height :60,
    bckground :"#fff"
  }
} 




const Stack = createStackNavigator();
const Alt=()=>{
  return ( <Tab.Navigator
  
  screenOptions={screenO} >
      <Tab.Screen
      name="home"
      component={Home}
      options={{
        tabBarShowLabel:false,
        tabBarIcon: ({focused})=>{
          return(<View style={{alignItems:"center" , justifyContent:"center"}}> 
            <AntDesign name="home" size={30} color={focused ? "#E2E2B6" : "#021526"} />
            
          </View>)}}}
      />


<Tab.Screen
      name="write"
      component={Write}
      options={{
        tabBarShowLabel:false,
        tabBarIcon: ({focused})=>{
          return(<View style={{alignItems:"center" , justifyContent:"center"}}> 
            <FontAwesome name="pencil-square-o" size={30} color={focused ? "#E2E2B6" : "#021526"} />
            
          </View>)}}}
      />
       <Tab.Screen 
      name="serch"
       component={Setting}
       options={{
        tabBarShowLabel:false,
        tabBarIcon: ({focused})=>{
          return(<View style={{alignItems:"center" , justifyContent:"center"}}> 
          <FontAwesome name="search" size={30} color={focused ? "#E2E2B6" : "#021526"} />            
          </View>)}}}
       />

      <Tab.Screen 
      name="profil"
       component={Profile}
       options={{
        tabBarShowLabel:false,
        tabBarIcon: ({focused})=>{
          return(<View style={{alignItems:"center" , justifyContent:"center"}}> 
           <MaterialCommunityIcons name="account-circle-outline" size={30} color={focused ? "#E2E2B6" : "#021526"} />
            
          </View>)}}}
       />     
     
      
    </Tab.Navigator>)
   
}

function Giris() {
  return (
    
      <Stack.Navigator >
         
           <Stack.Screen 
                name="login" 
                component={Login} 
                options={{ headerShown: false }} // kayı ekranında başlık gizleme
              />
<Stack.Screen 
                name="registar" 
                component={Registar} 
                options={{ headerShown: false }} // kayı ekranında başlık gizleme
              />

<Stack.Screen 
                name="app" 
                component={Alt} 
                options={{ headerShown: false }} // kayı ekranında başlık gizleme
              />
    

        
        
      </Stack.Navigator>
    
  );
};










const App=()=>{
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
 
  return(

    <NavigationContainer>
      {isLoggedIn ? (
        <Alt /> // Giriş yapıldıysa, Tab Navigator'u göster
      ) : (
        <Giris/> // Giriş yapılmadıysa, Login ekranını göster
      )}
    </NavigationContainer>
  )
};







export default App;




