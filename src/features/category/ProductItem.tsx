import CustomText from '@components/ui/CustomText';
import UniversalAdd from '@components/ui/UniversalAdd';
import { Colors, Fonts } from '@utils/Constants';
import { screenHeight } from '@utils/Scaling';
import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const ProductItem: FC<{ item: any; index: number }> = ({ item, index }) => {
    const isSecondColumn = index % 2 != 0;

    return (
        <View style={[styles.container, { marginRight: isSecondColumn ? 10 : 0 }]}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>

            <View style={styles.content}>
                <View style={styles.flexRow}>
                    <Image source={require('@assets/icons/clock.png')} style={styles.clockIcon} />
                    <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Medium}>18 MINS</CustomText>
                </View>
                <CustomText
                    variant='h8'
                    numberOfLines={2}
                    style={{ marginVertical: 4 }}
                    fontFamily={Fonts.Medium}

                >

                    {item.name || 'Product Item'}

                </CustomText>


                <View style={styles.priceContainer}>
                    <View>
                        <CustomText variant='h8' fontFamily={Fonts.Medium}>
                        ₹{item?.price}
                        </CustomText>
                        <CustomText fontFamily={Fonts.Medium} variant='h8' style={{ textDecorationLine: 'line-through' }}>
                        ₹{item?.discountPrice}
                        </CustomText>
                    </View>
                    <UniversalAdd item={item}/>






                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '45%',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        marginLeft: 10,
        overflow: 'hidden',
    },
    imageContainer: {
        height: screenHeight * 0.14, // Adjust based on the desired image height
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        aspectRatio: 1 / 1,
    },
    content: {
        paddingHorizontal: 10,
        paddingTop: 5, // Add padding at the top to create space between the image and content
        paddingBottom: 10, // Add padding at the bottom for better spacing
    },
    flexRow: {
        flexDirection: 'row',
        paddingVertical: 2,
        alignItems: 'center',
        gap: 2,
        backgroundColor: Colors.backgroundSecondary,
        alignSelf: 'flex-start',
    },
    clockIcon: {
        height: 15,
        width: 15,
    },
    productName: {
        marginTop: 5, // Add some space between the clock row and the product name
        fontSize: RFValue(7),
        textAlign: 'center',
    },
    priceContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:10,
        marginTop:'auto'
    }
});

export default ProductItem;
