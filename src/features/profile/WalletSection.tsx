import { Colors } from '@utils/Constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import WalletItem from './WalletItem';

const WalletSection = () => {
    return (
        <View style={styles.walletContainer}>
            <WalletItem icon="wallet-outline" label="Wallet" />
            <WalletItem icon="chatbubble-ellipses-outline" label="Support" />
            <WalletItem icon="card-outline" label="Payments" />
        </View>

    )
}



const styles = StyleSheet.create({
    walletContainer: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.backgroundSecondary,
        paddingVertical: 15,
        borderRadius: 15,
        marginVertical: 20,
    },
});

export default WalletSection