import React from 'react';
import { Marker } from 'react-native-maps';

interface Location {
  latitude: number;
  longitude: number;
}

interface MarkersProps {
  deliveryLocation?: Location;
  pickupLocation?: Location;
  deliveryPersonLocation?: Location;
}

const Markers: React.FC<MarkersProps> = ({
  deliveryLocation,
  pickupLocation,
  deliveryPersonLocation
}) => {
  return (
    <>
      {deliveryLocation?.latitude && deliveryLocation?.longitude && (
        <Marker
          image={require('@assets/icons/my_pin.png')}
          coordinate={deliveryLocation}
          style={{ height: 20, width: 20 }}
        />
      )}

      {pickupLocation?.latitude && pickupLocation?.longitude && (
        <Marker
          image={require('@assets/icons/store.png')}
          coordinate={pickupLocation}
          style={{ height: 20, width: 20 }}
        />
      )}

      {deliveryPersonLocation?.latitude && deliveryPersonLocation?.longitude && (
        <Marker
          image={require('@assets/icons/delivery.png')}
          coordinate={deliveryPersonLocation}
          style={{ position: 'absolute', zIndex: 99, height: 20, width: 20 }}
        />
      )}
    </>
  );
};

export default Markers;
