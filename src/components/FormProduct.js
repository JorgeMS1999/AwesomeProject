import react, { useState } from "react";
import {View,Text,TextInput,StyleSheet,Button} from 'react-native'



const FormProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

    const [isValidName, setIsValidName] = useState(true)
    const [isValidPrice, setIsValidPrice] = useState(true)

    const handelForm = () => {
        setIsValidName(!(name === ''))
        setIsValidPrice(!(price === '' || price === 0))
      
        console.log('form values',name,price)
    }    

    const handelName = (text) =>{
        setName(text)
    }

    const handelPrice = (text) =>{
        setPrice(text)
    }

    return(
        <View style= {styles.containerForm}>
            <Text>Nombre</Text>
            <TextInput style={styles.inputText} value={name} onChangeText={handelName} placeholder="Nombre"></TextInput>
            {!isValidName &&
                <Text style= {styles.messageError}>Campo Requerido</Text>
            }
            <Text>Precio</Text>
            <TextInput keyboardType="numeric" style={styles.inputText} valeu={price} onChangeText={handelPrice} placeholder="Precio"></TextInput>
            {!isValidPrice && 
                <Text style= {styles.messageError}>Campo Requerido</Text>
            }
            <Button title="Guardar" onPress={handelForm}></Button>
        </View>
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
    }

})

export default FormProduct