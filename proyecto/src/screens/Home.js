import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import { View,
         Text,
         StyleSheet, 
         FlatList,  } from 'react-native';
import Post from '../components/Post';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            postData:[]
        }
    }
    
    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    postData: posts
                })
            }
        )

        
    }


    render(){
       
        return(
                <View style={styles.container}>
                    <Text>Posteos</Text>
                    <FlatList 
                        data={this.state.postData}
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

export default Home;