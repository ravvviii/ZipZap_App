import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import ProductSlider from '@components/login/ProductSlider'
import CustomButton from '@components/ui/CustomButton'
import CustomInput from '@components/ui/CustomInput'
import CustomText from '@components/ui/CustomText'
import { customerLogin } from '@service/authService'
import { Colors, Fonts, lightColors } from '@utils/Constants'
import { resetAndNavigate } from '@utils/NavigationUtils'
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Alert, Animated, Image, Keyboard, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { RFValue } from 'react-native-responsive-fontsize'


const bottomColors = [...lightColors].reverse()


const CustomerLogin: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setloading] = useState(false)
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const keyboardOffsetHeight = useKeyboardOffsetHeight()

  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (keyboardOffsetHeight === 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 350,
        useNativeDriver: true
      }).start()
    }
  }, [keyboardOffsetHeight])

  const handleAuth = async () => {
    Keyboard.dismiss()
    setloading(true)

    try {

      await customerLogin(phoneNumber)
      resetAndNavigate('ProductDashboard')




      
    } catch (error) {
      Alert.alert("Login failed")
      
    }
    finally{
      setloading(false)
    }


  }

  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      let direction = '';

      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }

      const newSequence = [...gestureSequence, direction].slice(-5)
      setGestureSequence(newSequence)
      console.log(newSequence);

      if (newSequence.join(' ') === 'up up down left right') {
        setGestureSequence([])
        resetAndNavigate('DeliveryLogin')
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <CustomSafeAreaView>
        <ProductSlider />
        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Animated.ScrollView
            bounces={false}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={styles.subContainer}
            style={{ transform: [{ translateY: animatedValue }] }}
          >

            <LinearGradient colors={bottomColors} style={styles.gradient}/>



            <View style={styles.content}>
              <Image source={require('@assets/images/logo.png')} style={styles.logo} />

              <CustomText variant='h2' fontFamily={Fonts.Bold}>India's First minute app</CustomText>

              <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={styles.text}>Log in or sign up</CustomText>

              <CustomInput
                onChangeText={(text) => { setPhoneNumber(text.slice(0, 10)) }}
                onClear={() => setPhoneNumber('')}
                value={phoneNumber}
                left={<CustomText style={styles.phoneText}
                  variant='h6'
                  fontFamily={Fonts.SemiBold}
                >
                  + 91
                </CustomText>}
                placeholder='Enter mobile number'
                inputMode='numeric'
              />

              <CustomButton
                disabled={phoneNumber?.length !== 10}
                onPress={() => handleAuth()}
                loading={loading}
                title='Continue' />
            </View>
          </Animated.ScrollView>
        </PanGestureHandler>

        <View style={styles.footer}>
          <CustomText fontSize={RFValue(12)} style={styles.footerText}>
            By Continuing, you agree to our Terms of Service & Privacy policy
          </CustomText>
        </View>
      </CustomSafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  text: {
    marginTop: 3,
    marginBottom: 25,
    opacity: 0.8,
  },
  phoneText: {
    marginLeft: 10,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fc',
    width: '100%',
  },
  footerText: {
    textAlign: 'center',
    marginHorizontal: 20,
  },
  gradient:{
    paddingTop:60,
    width:'100%'

  }
});

export default CustomerLogin;
