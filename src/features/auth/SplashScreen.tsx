import Logo from '@assets/images/splash_logo.jpeg';
import { Colors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';
import React, { FC, useEffect } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';

import GeoLocation from '@react-native-community/geolocation';
import { useAuthStore } from '@state/authStore.tsx';
import { tokenStorage } from '@state/storage.tsx';
import { resetAndNavigate } from '@utils/NavigationUtils';

GeoLocation.setRNConfiguration({
  skipPermissionRequests:false,
  authorizationLevel:'always',
  enableBackgroundLocationUpdates:true,
  locationProvider:'auto'
})



const SplashScreen: FC = () => {
  const {user, setUser} = useAuthStore()

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;
  
    if (accessToken) {
      // Code to execute if accessToken exists
      

    }

    resetAndNavigate("CustomerLogin")
    return false
  };
  


  useEffect(() => {
    const fetchUserLocation = async()=>{
      try {
        GeoLocation.requestAuthorization()
        tokenCheck()
        
      } catch (error) {
        Alert.alert("Sorry we need location service to give you better service")
        
      }
    }

    const timeoutId = setTimeout(fetchUserLocation, 1000);

    return ()=> clearTimeout(timeoutId)
   
  }, [])
  



  return (
    <View style={styles.container}>
    <Image source={Logo} style={styles.logoImage} />
    
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.primary,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }, 

    logoImage:{
      height:screenHeight*0.7,
      width:screenWidth*0.7,
      resizeMode:'contain'
        

    }
    // Assuming there's a style for logoImage not shown in the image
  });


export default SplashScreen