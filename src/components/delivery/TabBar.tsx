import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface TabBarProps {
    selectedTab: 'available' | 'delivered';
    onTabChange: (tab: 'available' | 'delivered') => void;
  }
  
  const TabBar: FC<TabBarProps> = ({ selectedTab, onTabChange }) => {
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.tab,
            selectedTab === 'available' && styles.activeTab,
          ]}
          onPress={() => onTabChange('available')}
        >
          <CustomText variant='h8' fontFamily={Fonts.SemiBold}
          style={[styles.tabText, selectedTab==='available'? styles.activeTabText:styles.inactiveTabText]}
          >
            Available
          </CustomText>
        </TouchableOpacity>
  
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.tab,
            selectedTab != 'available' && styles.activeTab,
          ]}
          onPress={() => onTabChange('delivered')}
        >
          <CustomText variant='h8' fontFamily={Fonts.SemiBold}
          style={[styles.tabText, selectedTab!=='available'? styles.activeTabText:styles.inactiveTabText]}
          >
            Delivered
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };
  

  const styles = StyleSheet.create({
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    tab: {
      paddingVertical: 10,
      borderRadius: 25,
      width: '38%',
      margin: 5,
      borderWidth: 1,
      borderColor: Colors.border,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: Colors.secondary,
      borderColor:Colors.secondary
    },
    tabText: {
      color: Colors.text,
    },
    activeTabText: {
      color: '#fff',
    },
    inactiveTabText: {
      color: Colors.disabled,
    },

  });
  

export default TabBar