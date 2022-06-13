import React, { Component } from 'react';

//1 Componentes de navegación
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome, Foundation } from '@expo/vector-icons'


import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import Search from '../screens/Search';


const Tab = createBottomTabNavigator();

//4 Armar el compoente con el render del menú

class Menu extends Component {
    constructor(props){
        super(props)
        this.state={
            loggedIn:false,
        }
    }


    render(){
        return(
            //Armar el menú. No se necesita repetir el container.
            <Tab.Navigator>
                <Tab.Screen 
                    name='Home' 
                    component={ Home }
                    options={
                        { tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }
                    }
                />
                 <Tab.Screen 
                    name='New Post' 
                    component={ NewPost }
                    options={
                        { tabBarIcon: () => <FontAwesome name="photo" size={24} color="black" /> }
                    }
                />
                 <Tab.Screen 
                    name='Search' 
                    component={ Search }
                    options={
                        { tabBarIcon: () => <FontAwesome name="search" size={24} color="black" /> }
                    }
                />                
                <Tab.Screen 
                name='Profile' 
                component={ Profile }
                options={
                    { tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }
                }
                initialParams={{logout: ()=>this.props.route.params.logout()}}
                />
                
            </Tab.Navigator>        

        )
    }
}

export default Menu