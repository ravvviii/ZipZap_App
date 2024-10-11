import CustomText from '@components/ui/CustomText';
import { useAuthStore } from '@state/authStore';
import { storage, tokenStorage } from '@state/storage';
import { Colors, Fonts } from '@utils/Constants';
import { resetAndNavigate } from '@utils/NavigationUtils';
import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface DeliveryHeaderProps {
  name: string;
  email: string;
}

const DeliveryHeader: FC<DeliveryHeaderProps> = ({ name, email }) => {
  const { logout } = useAuthStore();

  // Check if name and email are available
  if (!name || !email) {
    return (
      <View style={styles.center}>
        <CustomText variant="h4">Loading...</CustomText>
      </View>
    );
  }

  return (
    <View style={styles.flexRow}>
      <View style={styles.imgContainer}>
        <Image source={require('@assets/images/delivery_boy.png')} style={styles.img} />
      </View>

      <View style={styles.infoContainer}>
        <CustomText variant='h4' fontFamily={Fonts.SemiBold}>
          Hello {name}!
        </CustomText>

        <CustomText variant='h8' fontFamily={Fonts.Medium}>
          {email}
        </CustomText>
      </View>

      <TouchableOpacity
        onPress={async() => {
            try {
                await resetAndNavigate("CustomerLogin");
                await logout(); // If logout is async
                await tokenStorage.clearAll();
                await storage.clearAll();
              } catch (error) {
                console.error("Error during delivery logout process", error);
              }
        }}
        accessibilityLabel="Logout"
        accessible={true}
      >
        <Icon name='logout' size={30} color='black' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  imgContainer: {
    padding: 4,
    borderRadius: 100,
    height: 60,
    width: 60,
    overflow: 'hidden',
    backgroundColor: Colors.backgroundSecondary,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    bottom: -8,
    height: '100%',
    resizeMode: 'contain',
  },
  infoContainer: {
    width: '70%',
  },
});

export default DeliveryHeader;
