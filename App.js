import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/HomeScreen'
import DetailsScreen from './src/DetailsScreen'

const Stack = createStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions= {{
          headerStyle: {
            backgroundColor: '#00796B',
          },
          headerTintColor: '#fff'
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home'
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({
            title: 'About ' + route.params.name,
            headerTitleStyle: {
              textTransform: 'capitalize'
            }
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App