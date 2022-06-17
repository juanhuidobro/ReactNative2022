import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native'
import firebase from 'firebase'
import {db, auth} from '../firebase/config'


class Comments extends Component{
    constructor(props){
        super(props)
        this.state={
            nuevoComentario: '',
            arrayComentarios: []
        }
    }

    componentDidMount(){
        const idDoc = this.props.route.params.id

        db.collection('posts').doc(idDoc).onSnapshot(doc => {
            this.setState({
                arrayComentarios: doc.data().comments
            })
        })
    }


    onSubmit(elComentario){
        const idDoc = this.props.route.params.id 

        const dataComment = {
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            description: elComentario 
        }

        if(elComentario !== ''){
            db.collection('posts').doc(idDoc).update({
                comments: firebase.firestore.FieldValue.arrayUnion(dataComment)
            })
            .then(response => this.setState({nuevoComentario: ''}))
            .catch(error => console.log(error))
        }
    }


    render(){ 
        return(
                <View style={styles.container}>
                    { this.state.arrayComentarios.length !== 0 ?
                    <FlatList
                    data = {this.state.arrayComentarios}
                    keyExtractor = {(item) => item.createdAt.toString()} 
                    renderItem = {( {item} ) =>
                        <View style = {styles.comment}>
                            <Text>{item.owner}</Text>
                            <Text>{item.description}</Text>
                        </View>} 
                    />
                    :
                    <Text>Aún no hay comentarios. Sé el primero en opinar.</Text>
                    }

                    <View>
                        <TextInput
                        placeholder = 'Agregá un comentario...'
                        onChangeText = {
                            (text) => this.setState({nuevoComentario: text})
                        }
                        value = {this.state.nuevoComentario}
                        keyboardType = 'default'
                        style = {styles.inputComment}
                        />
                        { this.state.nuevoComentario !== '' ?
                        <TouchableOpacity onPress = {() => this.onSubmit(this.state.nuevoComentario)} style = {styles.btnComment}>
                            <Text>Publicar</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style = {styles.btnComment2}>
                            <Text style = {styles.text2}>Publicar</Text>
                        </TouchableOpacity>
                        }
                    </View>
                </View>
        )
    }

}

const styles = StyleSheet.create({
    comment:{
        marginTop: 30
    },
    inputComment:{
        borderWidth: 1,
        backgroundColor: '#c3c3c3',
        width: '80%'
    },
    btnComment:{
        width: '20%',
        padding: 10,
        backgroundColor: '#d3d3d3'
    },
    btnComment2:{
        width: '20%',
        padding: 10,
        backgroundColor: '#6e6d6d'
    },
    text2:{
      color: '#949292'  
    },
    container:{
        paddingHorizontal:10,
        marginTop: 10
    },
    title:{
        marginBottom:20
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding:3,
        marginBottom:8

    },
    button: {
        borderRadius: 2,
        padding:3,
        backgroundColor: 'green',
    },
    buttonText:{
        color: '#fff'
    }
})


export default Comments;