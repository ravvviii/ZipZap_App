import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import { adData, categories } from '@utils/dummyData'
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import AdCarousal from './AdCarousal'
import CategoryContainer from './CategoryContainer'

const Content :FC = () => {
  return (
    <View style={styles.container}>
      <AdCarousal adData={adData} />

      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>

        Grocery & Kitchen
        
        </CustomText>


      <CategoryContainer data={categories} />
      
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>

        Grocery & Kitchen
        
        </CustomText>


      <CategoryContainer data={categories} />
      
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>

        Grocery & Kitchen
        
        </CustomText>


      <CategoryContainer data={categories} />
      
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>

        Grocery & Kitchen
        
        </CustomText>


      <CategoryContainer data={categories} />
      


    </View>
  )
}



const styles = StyleSheet.create({
    container:{
            paddingHorizontal:20
    }
})
export default Content