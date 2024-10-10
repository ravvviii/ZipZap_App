
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import CustomButton from '@components/ui/CustomButton';
import CustomInput from '@components/ui/CustomInput';
import CustomText from '@components/ui/CustomText';
import { deliveryLogin } from '@service/authService';
import { Fonts } from '@utils/Constants';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { screenHeight } from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import React, { FC, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';

const DeliveryLogin: FC = () => {



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);







  const handleLogin = async () => {
    setLoading(true);
    try {
      await deliveryLogin(email, password);
      resetAndNavigate("DeliveryDashboard");
    } catch (error) {
      console.log(error);
      Alert.alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <CustomSafeAreaView>
      <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'>
        <View style={styles.container}>

          <View style={styles.lottieContainer}>
            <LottieView autoPlay loop style={styles.lottie} source={require('@assets/animations/delivery_man.json')} />


            <CustomText variant='h3' fontFamily={Fonts.Bold} style={styles.text}>
              Delivery Partner Portal
            </CustomText>

            <CustomText variant='h6' style={styles.text} fontFamily={Fonts.SemiBold}>
              Faster than Flash ⚡
            </CustomText>


            <CustomInput
              onChangeText={setEmail}
              value={email}
              left={
                <Icon
                  name='mail-outline'
                  color='#F8890E'
                  style={{ marginLeft: 10 }}
                  size={RFValue(18)}
                />
              }
              placeholder='Email'
              inputMode='email'
              right={false}
            />


            <CustomInput
              onChangeText={setPassword}
              value={password}
              left={
                <Icon
                  name='lock-closed-outline'
                  color='#F8890E'
                  style={{ marginLeft: 10 }}
                  size={RFValue(18)}
                />
              }
              placeholder='Password'
              secureTextEntry
              right={false}
            />

            <CustomButton
              disabled={email.length == 0 || password.length < 8}
              title='Login'
              onPress={handleLogin}
              loading={loading}
            />






          </View>


        </View>

      </ScrollView>
    </CustomSafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',

  },

  lottie: {
    height: 150,
    width: 150,

  },

  lottieContainer: {
    height: screenHeight * 0.6,
    alignItems: 'center',
    justifyContent: 'center',

  },

  text: {
    marginTop: 2,
    marginBottom: 10,
    opacity: 0.8,
    textAlign: 'center'
  }
});


export default DeliveryLogin