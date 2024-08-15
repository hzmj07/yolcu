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
 
import { Home , Setting , Account } from './screens/index';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './screens/profile';


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
function Giris() {
  return (
    
      <Stack.Navigator >
         
        <Stack.Screen 
          name="account" 
          component={Account} 
          options={{ headerShown: false }} // Giriş ekranında başlık gizleme
        />
        
      <Stack.Screen 
                name="profile" 
                component={Profile} 
                options={{ headerShown: false }} // Giriş ekranında başlık gizleme
              />
       

        
        
      </Stack.Navigator>
    
  );
}

const Alt=()=>{
  return ( <Tab.Navigator screenOptions={screenO} >
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
      name="Account"
       component={Giris}
       options={{
        tabBarShowLabel:false,
        tabBarIcon: ({focused})=>{
          return(<View style={{alignItems:"center" , justifyContent:"center"}}> 
           <MaterialCommunityIcons name="account-circle-outline" size={30} color={focused ? "#E2E2B6" : "#021526"} />
            
          </View>)}}}
       />     
      <Tab.Screen 
      name="Setting"
       component={Setting}
       options={{
        tabBarShowLabel:false,
        tabBarIcon: ({focused})=>{
          return(<View style={{alignItems:"center" , justifyContent:"center"}}> 
           <Ionicons name="settings-outline" size={30} color={focused ? "#E2E2B6" : "#021526"} />
            
          </View>)}}}
       />
      
    </Tab.Navigator>)
   
}





const App=()=>{
  return(

    <NavigationContainer>
      <Alt />
    </NavigationContainer>
  )
};







export default App;




