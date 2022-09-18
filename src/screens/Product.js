
import React, { useEffect, useState } from 'react';
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    Image,
    Button
  } from 'react-native';

import ItemProduct from '../components/ItemProduct';
import ModalProduct from '../components/ModalProduct';
const Products = () => {

    const [products,setProducts] = useState([])
    const [isVisible, setIsvisible] = useState(false)
    useEffect(() => {
        getProducts()
    },[])

    const getProducts = () =>{
        firestore()
        .collection('products')
        .onSnapshot(async (fProducts) => {
          let tempProducts =[]
          let promiseImages = []
          fProducts.forEach(fProduct =>{
              tempProducts.push(fProduct.data())
              promiseImages.push(storage().ref(fProduct.data().image).getDownloadURL());
              
          });
  
          const resultPromises = await Promise.all(promiseImages)
          resultPromises.forEach((url,index)=>{
              tempProducts[index].image = url
          });
          
  
          setProducts(tempProducts)
          });
       
    }

    const handleOnClose = () =>{
      setIsvisible(false)
    }
    const handleModal = () =>{
      setIsvisible(true)
    }
    return (
        <View >
        <FlatList style={{height: '95%'}} data={products} renderItem = {ItemProduct} 
        ></FlatList>
        <Button style={{height:'5%'}} title='Agregar Producto' onPress={handleModal}></Button>
        {isVisible && 
          <ModalProduct onClose={handleOnClose}></ModalProduct>
        }
        
        </View>
    );

    
}
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

export default Products