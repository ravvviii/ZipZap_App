import CustomerLogin from '@features/auth/CustomerLogin'
import DeliveryLogin from '@features/auth/DeliveryLogin'
import SplashScreen from '@features/auth/SplashScreen'
import ProductDashboard from '@features/dashboard/ProductDashboard'
import DeliveryDashboard from '@features/delivery/DeliveryDashboard'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from '@utils/NavigationUtils'
import React, { FC } from 'react'



const Stack = createNativeStackNavigator()

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName='SplashScreen'
        screenOptions={{
          headerShown: false
        }}

      >


        <Stack.Screen name='SplashScreen'
          component={SplashScreen}
        />
        <Stack.Screen name='DeliveryDashboard'
          component={DeliveryDashboard}
        />







        <Stack.Screen name='ProductDashboard'
          component={ProductDashboard}
        />
        <Stack.Screen
          options={{
            animation: 'fade'
          }}

          name='DeliveryLogin'
          component={DeliveryLogin}
        />
        <Stack.Screen
          options={{
            animation: 'fade'
          }}


          name='CustomerLogin'
          component={CustomerLogin}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation