import CustomText from '@components/ui/CustomText';
import ScalePress from '@components/ui/ScalePress';
import { Fonts } from '@utils/Constants';
import { navigate } from '@utils/NavigationUtils';
import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const CategoryContainer: FC<{ data: any }> = ({ data }) => {
    const renderItems = (items: any[]) => {
      return (
        <>
          {items.map((item, index) => {
            return (
              <ScalePress onPress={() => navigate('ProductCategories')} key={index} style={styles.item}>
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.image} />
                </View>
  
                {typeof item.name === 'string' && item.name ? (
                  <CustomText style={styles.text} variant="h9" fontFamily={Fonts.Medium}>
                    {item.name}
                  </CustomText>
                ) : null}
  
              </ScalePress>
            );
          })}
        </>
      );
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.row}>{renderItems(data?.slice(0, 4))}</View>
        <View style={styles.row}>{renderItems(data?.slice(4))}</View>
      </View>
    );
  };

const styles = StyleSheet.create({
    container:{
            marginVertical:15
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Adjust if needed
      alignItems: 'center',
      marginBottom: 25,
      flexWrap: 'wrap', 
    },
    
    text:{
        textAlign:'center'

    },
    item: {
      width: '22%',  // Adjust the percentage based on how many items you want in each row
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,  // Add margin for better spacing
      margin:4
    },
    
    imageContainer: {
      width: 60, // Set fixed width or responsive size for consistency
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      padding: 6,
      backgroundColor: "#E5F3F3",
      marginBottom: 8,
    },
    
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
});

export default CategoryContainer;
