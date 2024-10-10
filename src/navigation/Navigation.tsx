import CustomerLogin from '@features/auth/CustomerLogin'
import DeliveryLogin from '@features/auth/DeliveryLogin'
import SplashScreen from '@features/auth/SplashScreen'
import ProductCategories from '@features/category/ProductCategories'
import ProductDashboard from '@features/dashboard/ProductDashboard'
import DeliveryDashboard from '@features/delivery/DeliveryDashboard'
import DeliveryMap from '@features/delivery/DeliveryMap'
import LiveTracking from '@features/map/LiveTracking'
import OrderSuccess from '@features/order/OrderSuccess'
import ProductOrder from '@features/order/ProductOrder'
import Profile from '@features/profile/Profile'
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
        <Stack.Screen name='ProductOrder'
          component={ProductOrder}
        />
        <Stack.Screen name='ProductCategories'
          component={ProductCategories}
        />
        <Stack.Screen name='DeliveryDashboard'
          component={DeliveryDashboard}
        />
        <Stack.Screen name='OrderSuccess'
          component={OrderSuccess}
        />
        <Stack.Screen name='LiveTracking'
          component={LiveTracking}
        />
        <Stack.Screen name='Profile'
          component={Profile}
        />
        <Stack.Screen name='DeliveryMap'
          component={DeliveryMap}
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