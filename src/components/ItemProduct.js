import React from "react";
import {View,Image,Text,StyleSheet} from 'react-native'

const ItemProduct = ({item}) =>{

    return(
    <View style={styles.containerItem}>
        <Image source={{uri: item.image}} style={{width:100, height: 100}}></Image>
        <Text style = {styles.ItemProductName}>{item.name}</Text>
        <Text style = {styles.ItemProductPrice}>{item.price}Bs.</Text>
    </View>
    );
};
const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    containerItem: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor : 'white',
      margin: 10,
      elevation: 5,
      borderRadius: 8,
      justifyContent: 'space-between',
      alignItems: 'center'
      
    },
    ItemProductName : {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000'
    },
    ItemProductPrice : {
      fontWeight : 'bold',
      fontSize: 16,
    }
  });
export default ItemProduct