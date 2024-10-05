import { Colors, Fonts } from '@utils/Constants';
import { goBack } from '@utils/NavigationUtils';
import React, { FC } from 'react';
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';

const CustomHeader: FC<{ title: string; search?: boolean }> = ({ title, search }) => {
    return (
      <SafeAreaView>
        <View style={styles.flexRow}>
          <Pressable onPress={() => goBack()}>
            <Icon name="chevron-back" color={Colors.text} size={RFValue(16)} />
          </Pressable>
          <CustomText style={styles.text} variant="h5" fontFamily={Fonts.SemiBold}>
            {title}
          </CustomText>
          <View>
            {search && <Icon name="search" color={Colors.text} size={RFValue(16)} />}
          </View>
        </View>
      </SafeAreaView>
    );
  };
  



const styles = StyleSheet.create({
    flexRow: {
        justifyContent: 'space-between',
        padding: 10,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 0.6,
        borderColor: Colors.border
      },
      text:{
        textAlign:'center'
      }
      
});

export default CustomHeader