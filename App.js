import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Home from  './screens/Home';
import CreateEmployee from  './screens/CreateEmployee';
import Profile from  './screens/Profile';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const headerOptions ={
  
  headerTintColor:"white",
  headerStyle:{
    backgroundColor:"#7d1333"
  }
}
 function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} 
        options={{
          ...headerOptions,title:"Detail"        
        }} />
        <Stack.Screen name="Create" component={CreateEmployee} 
          options={{
            ...headerOptions,title:"Create Employee"        
          }}
        />
        <Stack.Screen name="Profile" component={Profile}
          options={{
            ...headerOptions,title:"Profile"        
          }}
        />
      </Stack.Navigator>
    </View>
  );
}
export default ()=>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0', 
  },
});
