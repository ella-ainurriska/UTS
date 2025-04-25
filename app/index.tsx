import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

export default function index() {
  return (
    <View style={{ 
      padding: 20,
      margin: 50,
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
     }}>

      <Redirect href= {'/Landing'}/>   

    </View>
  )
}