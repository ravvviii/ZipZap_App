import { useAuthStore } from '@state/authStore'
import React from 'react'
import { Text, View } from 'react-native'

const ProductDashboard = () => {
    const {user} = useAuthStore()
    console.log(user);
    
  return (
    <View>
      <Text>ProductDashboard</Text>
    </View>
  )
}

export default ProductDashboard