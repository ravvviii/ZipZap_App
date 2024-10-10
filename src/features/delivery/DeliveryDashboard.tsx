import DeliveryHeader from '@components/delivery/DeliveryHeader';
import OrderItem from '@components/delivery/OrderItem';
import TabBar from '@components/delivery/TabBar';
import CustomText from '@components/ui/CustomText';
import Geolocation from '@react-native-community/geolocation';
import { reverseGeocode } from '@service/mapService';
import { fetchOrders } from '@service/orderService';
import { useAuthStore } from '@state/authStore';
import { Colors } from '@utils/Constants';
import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import withLiveOrder from './withLiveOrder';

const DeliveryDashboard: FC = () => {
    const { user, setUser } = useAuthStore();
    const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>('available');

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any[]>([])
    const [refreshing, setRefreshing] = useState(false)

    const updateUser = () => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            reverseGeocode(latitude, longitude, setUser); 
          },
          (err) => Alert.alert("Error in update the user"),
          {
            enableHighAccuracy: false,
            timeout: 15000, 
          }
        );
      };
      
      useEffect(() => {
        updateUser(); 
      }, []);
      








    const renderOrderItem = ({ item, index }: any) => {
        return (
          <OrderItem index={index} item={item} />
        
        );
      };
      

    const fetchData = async () => {
        setData([]);
        setRefreshing(true);
        setLoading(true);

        const data = await fetchOrders(selectedTab, user?._id, user?.branch);

        setData(data);
        setRefreshing(false);
        setLoading(false);
    };



    useEffect(()=>{
        fetchData()
    },[selectedTab])





    return (
        <View style={styles.container}>
            <SafeAreaView>
                <DeliveryHeader name={user?.name} email={user?.email} />
            </SafeAreaView>
            <View style={styles.subContainer}>
                <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />

                <FlatList
                    data={data}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={async () => await fetchData()}
                        />
                    }
                    ListEmptyComponent={() => {
                        if (loading) {
                            return (
                                <View style={styles.center}>
                                    <ActivityIndicator color={Colors.secondary} size='small' />
                                </View>
                            );
                        }
                        return(
                            <View style={styles.center}>

                                <CustomText>
                                    No Orders found yet!
                                </CustomText>
                            </View>
                        )
                    }}

                    renderItem={renderOrderItem}
                    // renderItem={() => null} // Provide an empty renderItem function

                    keyExtractor={(item, index) => item.orderID ? item.orderID : index.toString()}  // Ensure key is unique
                    contentContainerStyle={styles.flatlistContainer}
                />



            </View>
        </View>
    );

}



const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
    },
    subContainer: {
        backgroundColor: Colors.backgroundSecondary,
        flex: 1,
        padding: 6,
    },
    flatlistContainer: {
        padding: 2,
    },
    center: {
        flex: 1,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default withLiveOrder(DeliveryDashboard)