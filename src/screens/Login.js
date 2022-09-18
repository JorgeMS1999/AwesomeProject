import React,{Component} from "react";
import { View,Text,Button } from "react-native";

class Login extends Component {

    constructor(props){
        super(props)

        this.state = ({
            name: ''
        })
    }

    handleButton = () =>{
        this.setState({
            name: 'Jorge'
        })
    }

    render(){
        
        return(
           <View>
            <Text>Mi nombre es: {this.state.name}</Text>
            <Button onPress={this.handleButton} title="Clase"></Button>
           </View>
        )

    }
}

export default Login 