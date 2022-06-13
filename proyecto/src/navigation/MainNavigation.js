import React, {Component} from 'react';
import { db, auth } from '../firebase/config';

//Importar navegaciones
import {NavigationContainer} from '@react-navigation/native';
import  { createNativeStackNavigator} from '@react-navigation/native-stack';

// Guardar la ejecución de Stack
const Stack = createNativeStackNavigator();

//importar las screens o lo que necesite el menú
import Login from '../screens/Login';
import Register from '../screens/Register';
import Menu from './Menu'
import Comments from '../screens/Comments.js';

class MainNavigation extends Component {

    constructor(props){
        super(props)
        this.state={
            loggedIn: false,
            registerError:'',
        }
    }
    
    componentDidMount(){
         //chequear que el usuario esté logueado.
       auth.onAuthStateChanged(user => {
            // Si el usuario está logueado, cambiar el estado loggedIn: true
            if(user){
                this.setState({
                    loggedIn:true
                })
            }
        })
    }


    login(mail, pass){
        //Debería loguear en Firebase y cambiar el estado loggedIn: true
        //Debe pasar como método a el componente login
        auth.signInWithEmailAndPassword(mail, pass)
            .then(response => this.setState({
                loggedIn:true
            }))
            .catch( error => console.log(error))

    }
 
    register(mail, pass, userName){
        //Debería registrar en Firebase y cambiar el estado loggedIn: true
        //Debe pasar como método a el componente register
        //console.log(this.state)
        //Colocar el método de registración de Firebase
        auth.createUserWithEmailAndPassword(mail, pass)
            .then( responseRegister => {
                console.log(responseRegister); 
                //Guardar documento en colección de usuarios.
                db.collection('users').add({
                            email: mail,
                            userName: userName,
                            createdAt: Date.now(),
                        })
                         .then( responseUsers => this.setState({
                             loggedIn:true,
                        }))
                        //.then( res => console.log(res))
                        .catch(error => console.log(error) )

                    })
            .catch( error => {
                console.log(error);
                this.setState({
                     registerError: error.message
                })
            })      
    }
    
    logout(){
        //Debe pasar como método a el componente Porfile
        auth.signOut()
            .then( response => this.setState({
                loggedIn: false
            }))
            .catch( error => console.log(error))
    }


    render(){
        console.log('En el render del menu: ' + this.state.registerError);
        return(
            <NavigationContainer>
                <Stack.Navigator>
                {
                    this.state.loggedIn ?
                    <Stack.Group> 
                        <Stack.Screen 
                            name='Menu'
                            component ={ Menu }
                            options = {{headerShown: false}}
                            initialParams = {{ logout: ()=> this.logout()}}
                        />
                        {/* ACA VA LA PANTALLa DE COMENTARIOS */}
                        <Stack.Screen 
                            name='Comentarios'
                            component={ Comments }
                        />
                        {/* ¿COMO SABEMOS CUAL ES EL POSTEO EN DONDE ESTAN LOS COMENTARIOS? */}
                    </Stack.Group> 
                    :
                    <Stack.Group> 
                        <Stack.Screen 
                            name='Login'
                            component = { Login }
                            options = {{headerShown: false}}
                            initialParams = {
                                {   login: (mail, pass)=>this.login(mail, pass),
                                }}
                        />
                        <Stack.Screen 
                            name='Registro'
                            options = {{headerShown: false}}
                            initialParams = { {register: (mail, pass, userName)=>this.register(mail, pass, userName)}}
                            children = {(navigationProps)=><Register errores={this.state.registerError} {...navigationProps}/>}
                        />
                    </Stack.Group>
                }
                </Stack.Navigator>
            </NavigationContainer>
        )
    }



}

export default MainNavigation