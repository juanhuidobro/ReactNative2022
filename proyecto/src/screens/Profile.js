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
            postsData: [],
            userName: '',
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
                this.setState({
                  postsData: posts
                })
        
    }
    )
    db.collection('users').where('email', '==',auth.currentUser.email).onSnapshot(
      docs => {
        docs.forEach(
          oneDoc => {
            this.setState({
              userName: oneDoc.data().userName
            })
          }
        )
      
      }

    )
}




    render() {
       
        return (
          <View style={styles.container}>
            <Text style={styles.text}>Usuario: {this.state.userName}</Text>
            <Text style={styles.text}>E-mail: {auth.currentUser.email}</Text>
            <Text style={styles.text}>
              Última fecha de ingreso: {auth.currentUser.metadata.lastSignInTime}
            </Text>
            <Text  style={styles.text}>Publicaciones: {this.state.post}</Text> 
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.route.params.logout()}>
            
              <Text style={styles.sign}> Cerrar sesión </Text>
            </TouchableOpacity>
            <FlatList
              data={this.state.postsData}
              keyExtractor={(posts) => posts.id}
              renderItem = { ({item}) => <Post dataPost={item} 
              {...this.props} />} />
          
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