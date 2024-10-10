import { Colors } from '@utils/Constants';
import React, { FC } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';

const ProductList: FC<{ data: any }> = ({ data }) => {

    const renderItem = ({ item, index }: any) => {
        return (
          <ProductItem item={item} index={index} />
        );
      };
      


    return (
      <FlatList
  data={data}
  keyExtractor={(item) => item._id.toString()}
  renderItem={renderItem}
  contentContainerStyle={styles.content}
  numColumns={2}
  style={styles.container}
  initialNumToRender={10}  // Renders only the first 10 items initially
  maxToRenderPerBatch={10} // Number of items rendered in each batch
  windowSize={5}           // Number of items to render offscreen
/>

    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      backgroundColor: Colors.backgroundSecondary,
    },
    content: {
      paddingVertical: 10,
      paddingBottom: 100,
    },
  });
  

export default ProductList