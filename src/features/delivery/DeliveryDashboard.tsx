import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DeliveryDashboard: FC = () => {



   

    return (
       <View style={styles.container}>
        <Text>Delivery DashBoard</Text>
       </View>
    )
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

   

})
export default DeliveryDashboard