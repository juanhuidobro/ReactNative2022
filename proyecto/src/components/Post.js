import React, {Component} from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
           cantidadDeLikes:this.props.dataPost.data.likes.length,
           myLike:false,
        }
    }

    componentDidMount(){
        if(this.props.dataPost.data.likes.includes(auth.currentUser.email)){
            this.setState({
                myLike: true,
            })
        }
    }

    like(){
        db.collection('posts')
            .doc(this.props.dataPost.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(()=> this.setState({
                cantidadDeLikes:this.state.cantidadDeLikes + 1,
                myLike: true,
            }))
            .catch(error => console.log(error))

    }

    unLike(){
        db.collection('posts')
            .doc(this.props.dataPost.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(()=> this.setState({
                cantidadDeLikes:this.state.cantidadDeLikes - 1,
                myLike: false
            }))
            .catch(error => console.log(error))
    }


    render(){
        return(
                <View style={styles.contenedor}>
                    <Text style={styles.text}>
                        Post de: {this.props.dataPost.data.owner}</Text>
                    <Image
                        style={{width: 200, height: 200}} 
                        source={{uri: this.props.dataPost.data.url}}
                        size='cover'
                    />
                    <Text style={styles.texto}>
                        {this.props.dataPost.data.description}</Text>
                    {
                        this.state.myLike ?
                        <TouchableOpacity onPress={()=> this.unLike()}>
                            <AntDesign name="dislike2" size={24} color="gray" />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={()=> this.like()}>
                            <AntDesign name="like2" size={24} color="gray" />
                        </TouchableOpacity>                
                    }
                    <Text> {this.state.cantidadDeLikes}</Text>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Comentarios', { id: this.props.dataPost.id})} > 
                    <FontAwesome name="commenting-o" size={24} color="gray" />
                    </TouchableOpacity>   
                </View>
        )
    }

}

const styles = StyleSheet.create({
    contenedor:{
        borderBottomColor: '#ddd',
        borderBottomWidth: 10,
        marginBottom: 10,
        paddingHorizontal:20
    },
    texto:{
        borderRadius: 2,
        padding:3,
        backgroundColor: 'gray',
        color: 'white',
        width: 200,
    },
    text:{
        borderRadius: 2,
        padding:3,
        backgroundColor: 'white',
        width: 200,
    },
    
})

export default Post;