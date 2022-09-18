import React, { useState, useEffect } from "react";
import { View, Text, Button,StyleSheet } from "react-native"; 

const LoginFunction = () => {
    const [name, setName] = useState('') 

    useEffect(()=>{
        console.log('creacion')
    },[])

    useEffect(()=>{
      if(name != '')
      {
        console.log('Cambio de estado')
      }
    },[name])

    useEffect(()=>{
    return () =>{
        console.log('Eliminado')
    }
      },[])

    const handleButton = () =>{
           setName('Jorge')
    }



    return (
        <View  >
            <Text style ={style.textColor}>Mi Primer Nombre es: {name}</Text>
            <Button onPress={handleButton} title="Funcion"></Button>
        </View>
    )

   

}

const style = StyleSheet.create({
    textColor : {
        color : 'blue'
    },
    container: {
        
        flexDirection: 'row'
    }
})

export default LoginFunction