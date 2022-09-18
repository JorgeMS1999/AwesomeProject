/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image
} from 'react-native';

import {
  Colors,
 
} from 'react-native/Libraries/NewAppScreen';

import Product from './src/screens/Product';
import firestore from '@react-native-firebase/firestore'
import Login from './src/screens/Login';
import LoginFunction from './src/screens/LoginFunction';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [products,setProducts] = useState([])
  useEffect(() => {
    getProducts()
  },[])

  const getProducts = () =>{
    firestore()
    .collection('products')
    .get()
    .then( async (fProducts) => {
      let tempProducts =[]
      let promiseImages = []
      fProducts.forEach(fProduct =>{
        tempProducts.push(fProduct.data())
        promiseImages.push(storage().ref(fProduct.data().image).getDownloadURL())
        
      })

      const resultPromises = await Promise.all(promiseImages)
      resultPromises.forEach((url,index)=>{
        tempProducts[index].image = url
      })
      

      setProducts(tempProducts)
    })
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const ItemProduct = ({item}) =>{

    return(
      <View style={styles.containerItem}>
        <Image source={{uri: item.image}} style={{width:100, height: 100}}></Image>
        <Text style = {styles.ItemProductName}>{item.name}</Text>
        <Text style = {styles.ItemProductPrice}>{item.price}Bs.</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Product></Product>
    
    </SafeAreaView>
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

export default App;
