import react from "react";
import {View,Text,StyleSheet} from 'react-native'

import FormProduct from "./FormProduct";
import FormProductFormik from "./FormProductFormik";

const ModalProduct = (props) =>{

    const { onClose} = props

    return (
        <View style ={styles.container}>
            <View style ={styles.childContainer}>
                <View style={styles.contenTitle}>
                     <Text style={styles.title}>Agregar Producto</Text>
                </View>
                <FormProductFormik onClose={onClose}></FormProductFormik>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container : {
        position: 'absolute',
        width: '100%',
        height: '100%',
     //   minHeight:'50%',
        top:0,
        backgroundColor: 'transparent',
        zIndex: 1010,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    childContainer:{
       // height:'70%',
        width:'80%',
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 5
    },
    title:{
        fontSize:25,
        fontWeight:'bold'
    },
    contenTitle:{
        alignItems:'center'
    }
})
export default ModalProduct