import CustomText from '@components/ui/CustomText';
import { Colors } from '@utils/Constants';
import React, { FC, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';

interface SidebarProps {
  selectedCategory: any;
  categories: any;
  onCategoryPress: (category: any) => void;
}

const Sidebar: FC<SidebarProps> = ({ selectedCategory, categories, onCategoryPress }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory); // Local state

  const indicatorPosition = useSharedValue(0);
  const animatedValues = categories?.map(() => useSharedValue(0));

  useEffect(() => {
    let targetIndex = -1;

    categories?.forEach((category: any, index: number) => {
      const isSelected = localSelectedCategory?._id === category?._id;
      animatedValues[index].value = withTiming(isSelected ? 2 : -15, { duration: 500 });
      if (isSelected) targetIndex = index;
    });

    if (targetIndex !== -1) {
      indicatorPosition.value = withTiming(targetIndex * 100, { duration: 500 });
      scrollViewRef.current?.scrollTo({
        y: targetIndex * 100,
        animated: true,
      });
    }
  }, [localSelectedCategory]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: indicatorPosition.value }],
  }));

  return (
    <View style={styles.sideBar}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.indicator, indicatorStyle]} />

        <Animated.View>
          {categories?.map((category: any, index: number) => {
            const animatedStyle = useAnimatedStyle(() => ({
              transform: [{ translateY: animatedValues[index].value }],
            }));

            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setLocalSelectedCategory(category); // Update the selected category locally
                  onCategoryPress(category); // Pass it to the parent function if needed
                }}
                activeOpacity={1}
                style={styles.categoryButton}
              >
                <View
                  style={[
                    styles.imageContainer,
                    localSelectedCategory?._id === category?._id && styles.selectedImageContainer,
                  ]}
                >
                  <Animated.Image
                    source={{ uri: category.image }}
                    style={[styles.image, animatedStyle]}
                  />
                </View>

                <CustomText fontSize={RFValue(7)} style={{ textAlign: 'center' }}>
                  {category?.name}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sideBar: {
    width: '24%',
    backgroundColor: '#fff',
    borderRightWidth: 0.8,
    borderRightColor: '#eee',
    position: 'relative',
  },
  categoryButton: {
    padding: 10,
    height: 100,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  imageContainer: {
    borderRadius: 100,
    height: '50%',
    marginBottom: 10,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F7',
    overflow: 'hidden',
  },
  selectedImageContainer: {
    backgroundColor: '#CFFFDB',
  },
  indicator: {
    position: 'absolute',
    right: 0,
    width: 4,
    height: 80,
    top: 10,
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
});

export default Sidebar;
