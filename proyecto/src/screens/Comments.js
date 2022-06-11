import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
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
        //console.log(this.props) -> Veo que llega por props (deberían llegar las de navigation y de route)
        const idDoc = this.props.route.params.id

        db.collection('NombreDeLaColleccion').doc(idDoc).onSnapshot(doc => {
            //Al pasarle directamente un valor me ahorro hacer el forEach etc...
            //console.log(doc.data()) -> Veo en qué propiedad están guardados los comentarios
            this.setState({
                arrayComentarios: doc.data().propiedadDeComentarios
            })
        })
    }

    //Añadir un nuevo comentario: Actualizamos un documento en firebase
    onSubmit(elComentario){
        const idDoc = this.props.route.params.id //Me guardo el valor en una constante

        const dataComment = {
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            description: elComentario //Con esto onSubmit() solo sabe que tiene que recibir un parámetro y ejecutarse (es más dinámico) 
        }

        if(elComentario !== ''){
            db.collection('NombreDeLaColeccion').doc(idDoc).updte({
                propiedadDeComentarios: firebase.firestore.FieldValue.arrayUnion(dataComment)
            })
            .then(response => this.setState({nuevoComentario: ''}))
            .catch(error => console.log(error))
        }
    }


    render(){ 
        return(
                <View style={styles.container}>
                    <FlatList
                    data = {this.state.arrayComentarios}
                    keyExtractor = {(item) => item.createdAt.toString()} //Uso como "id" el createdAt ya que es un valor único
                    renderItem = {( {item} ) =>
                        <View style = {styles.comment}>
                            <Text>{item.owner}</Text>
                            <Text>{item.description}</Text>
                        </View>} //owner y description deben coincidir con lo que aparezca en la db de comentarios
                    />

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
                        <TouchableOpacity onPress = {() => this.onSubmit(this.state.nuevoComentario)} style = {styles.btnComment}>
                            <Text>Publicar</Text>
                        </TouchableOpacity>
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