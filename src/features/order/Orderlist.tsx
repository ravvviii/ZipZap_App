import CustomText from '@components/ui/CustomText'
import { useCartStore } from '@state/cartStore'
import { Colors, Fonts } from '@utils/Constants'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import OrderItem from './OrderItem'

const Orderlist = () => {
const cartItem = useCartStore((state)=>state.cart)
const totalItems = cartItem?.reduce((acc,cart)=>acc+cart?.count,0)

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}> 
        <View style={styles.imgContainer}>
            <Image source={require('@assets/icons/clock.png')} style={styles.img} />
        </View>
        <View>
            <CustomText variant='h5' fontFamily={Fonts.SemiBold}>Delivery in 18 minutes</CustomText>
            <CustomText  style={{opacity:0.5}} variant='h8' fontFamily={Fonts.SemiBold}>Shipment of {cartItem?.length || 0} item</CustomText>
        </View>

      </View>
      {cartItem?.map((item)=>{
        return(
            <OrderItem  key={item._id} item={item}/>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        // flex:1,
        backgroundColor:'#fff',
        borderRadius:15,
        marginBottom:15
    },
    flexRow:{
        alignItems:'center',
        flexDirection:'row',
        gap:12,
        paddingHorizontal:10,
        paddingVertical:12
        

    },
    imgContainer:{
            backgroundColor:Colors.backgroundSecondary,
            padding :10,
            borderRadius:15
    },
    img:{
            width:30,
            height:30
    }



})

export default Orderlist