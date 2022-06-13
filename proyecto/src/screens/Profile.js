import React, {Component} from 'react';
import Post from './Post';
import { db, auth} from '../firebase/config';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';


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

                this.setState({
                    posts: posts
                })
            }
        )
        }

        render(){
            // console.log(this.state);
            return(
                    <View style={styles.container}>
                        <Text>Posteos</Text>
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
        flex:1
    }
})

export default Profile;