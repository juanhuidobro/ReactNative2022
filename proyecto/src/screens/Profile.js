import React, {Component} from 'react';
import { auth, db } from "../firebase/config"
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';
import Post from '../components/Post';


class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
        }
    }
    componentDidMount(){
        db.collection('posts').where('owner', '==',auth.currentUser.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

        
    }
    )
}


    render() {
       
        return (
          <View style={styles.container}>
            <Text style={styles.text}>Usuario: {auth.currentUser.owner}</Text>
            <Text style={styles.text}>E-mail: {auth.currentUser.email}</Text>
            <Text style={styles.text}>
              Última fecha de ingreso: {auth.currentUser.metadata.lastSignInTime}
            </Text>
            <Text  style={styles.text}>Publicaciones: {this.state.posts}</Text> 
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.route.params.logout()}>
            
              <Text style={styles.sign}> Cerrar sesión </Text>
            </TouchableOpacity>
            <FlatList
              data={this.state.posts}
              keyExtractor={(posts) => posts.id.toString()}
              renderItem = { ({item}) => <View style={styles.container}>
                <Image source= {{uri: this.props.dataPost.data.url}}style= {styles.imagen}/>
                <Text style={styles.text}> Descripcion: {item.data.description} </Text>
                <Text  style={styles.text}> Likes: {item.data.likes.length} </Text> 
            </View>
                  }
            />
          
          </View>
        )
      }

}
const styles = StyleSheet.create({ 
    button: {
      width: '30%',
      marginLeft: '35%',
      backgroundColor: "#00acee",
    }, 
    container: {
      flex: 1, 
      backgroundColor: '#170e33',
      
      },
    text: {
      color: "#ffffff",
      textAlign: "center",
    },
    sign: {
      color: '#ffffff',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 15,
  },
  imagen: {
    height: 300,
    width: '100%',
  }
  })


export default Profile;