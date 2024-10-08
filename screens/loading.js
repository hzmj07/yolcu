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

export const Loading=({renk})=>{
    return(<View style={[{height:"100%",width:"100%" , alignItems:"center" ,justifyContent:"center" }]} >
            <ActivityIndicator size="small" color={renk} />

    </View>)
}