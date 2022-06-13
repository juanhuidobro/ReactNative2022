import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image } from 'react-native';
import Post from '../components/Post';

class Search extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[],
            email:'',
            whoIs:'',
        }
    }
    
    // Obtener información a partir de una búsqueda.
    search(email){ 
        db.collection('posts').where('owner', '==', email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts,
                    email:'',
                    whoIs:email,
                })
            }
        )

        
    }


    render(){
        return(
                <View>
                    <Text>Posts del usuario: {this.state.whoIs}</Text>
                    <View style={styles.formulario}>
                        <TextInput 
                            style={styles.buscador}
                            keyboardType='default'
                            placeholder='email a buscar...'
                            value={this.state.email}
                            onChangeText={text => this.setState({ email: text})}
                        />  
                        <TouchableOpacity
                            style={styles.botton} 
                            onPress={()=>this.search(this.state.email)}
                            >
                            <Text style={ styles.Texto}>Buscar</Text>
                        </TouchableOpacity>                         
                    </View>
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Post dataPost={item} 
                        {...this.props} />}
                    />
                    
                </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    formulario:{
        padding: 20,
    },
    buscador:{
        padding: 10,
        width: '200',
        borderRadius: '2',
        borderColor: 'gray',
        borderWidth: '2',
    },
    botton: {
        borderRadius: 2,
        padding:3,
        backgroundColor: 'gray',
        textAlign: 'center',
        width: '200'
    },
    texto: {
        color: 'white',
    }
})

export default Search;