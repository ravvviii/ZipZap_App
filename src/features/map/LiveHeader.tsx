import CustomText from '@components/ui/CustomText';
import { useAuthStore } from '@state/authStore';
import { Fonts } from '@utils/Constants';
import { navigate } from '@utils/NavigationUtils';
import React, { FC } from 'react';
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';

const LiveHeader:FC<{
    type:'Customer'| 'Delivery';
     title:string;
     secondTitle:string
    }> = ({
        type,
        title,
        secondTitle
    }) => {
        const isCustomer = type=== 'Customer';

        const {currentOrder, setCurrentOrder} = useAuthStore()

        return (
          <SafeAreaView>
            <View style={styles.headerContainer}>
              <Pressable style={styles.backButton} onPress={()=>{
                if(isCustomer){
                    navigate("ProductDashboard")
                    if(currentOrder?.status == 'delivered'){
                        setCurrentOrder(null)

                    }
                    return
                }
                navigate("DeliveryDashboard")



              }}>
                <Icon 
                  name='chevron-back' 
                  color={isCustomer ? '#fff' : '#000'} 
                  size={RFValue(16)}
                />
              </Pressable>
              
              <CustomText 
              variant='h8' 
              fontFamily={Fonts.Medium}
              style={isCustomer?styles.titleTextWhite: styles.titleTextBlack}
              >
                {title}

              </CustomText>

              <CustomText
              variant='h4' 
              fontFamily={Fonts.SemiBold}

              style={isCustomer?styles.titleTextWhite: styles.titleTextBlack}
              >
                {secondTitle}
              </CustomText>



            </View>
          </SafeAreaView>
        );
        
  
}


const styles = StyleSheet.create({
    headerContainer: {
      justifyContent: 'center',
      paddingVertical: 10,
      alignItems: 'center',
    },
    backButton: {
      position: 'absolute',
      left: 20,
    },
    titleTextBlack: {
      color: 'black',
    },
    titleTextWhite: {
      color: 'white',
    },
  });
  

export default LiveHeader