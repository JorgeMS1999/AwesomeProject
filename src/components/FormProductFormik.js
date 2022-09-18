import { Formik } from "formik";
import React, {useState} from "react";
import {View, Text, TextInput, Button,StyleSheet,ActivityIndicator,Keyboard} from 'react-native'
import * as Yup from 'yup'
import { launchImageLibrary } from "react-native-image-picker";
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

const FormProductFormik = (props) =>{
    
    const [referenceStorage, setReferenceStorage] = useState()
    const [fileName, setFileNanme] = useState()
    const [pathFile, setPathFile] = useState()
    const [isLoading, setIsLoading] = useState()

    const {onClose} = props

    const FormProductSchema = Yup.object().shape({
        name: Yup.string().required('Campo Requerido'),
        price: Yup.number().moreThan(0,'Ingresar un Valor mayor a 0').required('Campo Requerido'),
       // image: Yup.string().required('Campo Requerido'),
    });
    
    const handleGallery = async() => {
        const result = await launchImageLibrary();
        if(result.assets.length > 0){
            const tempFileName = result.assets[0].fileName
            const tempPathFile = result.assets[0].uri
            setReferenceStorage(storage().ref(tempFileName))
            setFileNanme(tempFileName)
            setPathFile(tempPathFile)
        }
        console.log('result',result)
    };
    
    const handleForm = (values) =>{
        setIsLoading(true)
        referenceStorage.putFile(pathFile).then(response=>{
            console.log('exitoso')
            handleFirestore(values)
        }).catch(error => {
            console.log('error', error)
        })
    }

    const handleFirestore = (values) =>{
        firestore()
        .collection('products')
        .add({
            ...values, 
            image:fileName
        })
        .then(response => {
            console.log('guardado')
            setIsLoading(false)
            onClose()
            Keyboard.dismiss()
        })
        .catch(error =>{
            console.log('error', error)
        })
    }

    return (
        <Formik
            initialValues={{name: '',price: 0}}
            onSubmit={handleForm}
            validationSchema={FormProductSchema}
        >
            {({handleChange,handleSubmit,values,errors}) =>(
                <View style= {styles.containerForm}>
                    <Text>Nombre</Text>
                    <TextInput style={styles.inputText} value={values.name} onChangeText={handleChange('name')} placeholder="Nombre"></TextInput>
                    {errors.name &&(
                         <Text style= {styles.messageError}>{errors.name}</Text>
                    )}
                    <Text>Precio</Text>
                    <TextInput keyboardType="numeric" style={styles.inputText} value={values.price} onChangeText={handleChange('price')} placeholder="Precio"></TextInput>
                    {errors.price &&(
                          <Text style= {styles.messageError}>{errors.price}</Text>
                    )}    
                    <Text>Imagen</Text>
                    <View style={styles.containerImage}>
                        <View style={{width:'75%'}}>
                            <TextInput style={styles.inputText} value={fileName}  placeholder="Imagen"></TextInput>
                            {errors.image &&(
                                <Text style= {styles.messageError}>{errors.image}</Text>
                            )}    
                        </View>
                        <Button style={{width: '20%'}} onPress={handleGallery} title="Image"></Button>
                    </View>
                    {
                        isLoading ? (
                           <ActivityIndicator color={"#000"} size={50}></ActivityIndicator>
                        ):(
                        <Button title="Guardar" onPress={handleSubmit}></Button>
                    )}
                  <Button title="prueba" onPress={onClose}></Button>
                 </View>
                    
            )}
        </Formik>
    )
}
const styles = StyleSheet.create({
    inputText:{
     borderWidth: 1,
     borderRadius: 5,
     padding: 10,
     marginBottom: 10
    },
    containerForm: {
        padding: 20
    },
    messageError: {
        color: 'red',
        fontSize: 10
    },
    containerImage: {
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems : 'flex-start'
    }

})

export default FormProductFormik