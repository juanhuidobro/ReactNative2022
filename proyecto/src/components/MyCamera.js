import  React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import {Camera} from 'expo-camera';
import { db, storage } from '../firebase/config';

class MyCamera extends Component{

    constructor(props){
        super(props)
        this.state = {
            permission: false,
            showCamera: true,
            url:''
        }  
        this.metodosDeCamara = '' 
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then( () => this.setState({
            permission: true,
                })
            )
            .catch(error => console.log(error))

    }

    sacarFoto(){
        this.metodosDeCamara.takePictureAsync()
            .then(  photo => {
                this.setState({
                    url:photo.uri,
                    showCamera: false,
                })
            })
            .catch()


    }

    guardarFoto(){
        fetch(this.state.url)
            .then( response => response.blob())
            .then( 
                image => {
                    const ref = storage.ref(`photos/${Date.now()}.jpg`);
                    ref.put(image)
                        .then( () => {
                            ref.getDownloadURL()
                            .then( url => {
                                this.props.onImageUpload(url) 
                                this.setState({photo:''})
                            })
                            .catch(error => console.log(error))
                        })
                        .catch(error => console.log(error))
                }
            )
            .catch(error => console.log(error))

    }

    eliminarPreview(){

    }


    render(){
        return(
            <View style={styles.cameraBody}>
            { this.state.permission ?
                this.state.showCamera ?
                    <View style={styles.cameraBody}> 
                        <Camera 
                            style={styles.cameraBody}
                            type={Camera.Constants.Type.front}
                            ref= {metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                        />
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={()=>this.sacarFoto()}>
                            <Text style={styles.texto}>Tomar foto</Text>
                        </TouchableOpacity>
                    </View> 
                    :
                    <View style={styles.cameraBody}>
                        <Image 
                            style={styles.preview}
                            source={{uri:this.state.url}}
                            resizeMode='cover'
                        />
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={()=>this.guardarFoto()}>
                            <Text style={styles.texto}>Guardar Foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={()=>this.eliminarPreview()}>
                            <Text style={styles.texto}>Eliminar</Text>
                        </TouchableOpacity>
                    </View> 
                :
                <Text> No tengo permisos de cámara</Text>
            }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    cameraBody: {
        height: '95%',
    },
    button:{
        height: '5%',
        color: 'white',
        backgroundColor: 'gray',
        padding: 5,
        borderRadius: 4,
        marginTop: 20
    },
    preview:{
        height:'80%'
    },
    texto: {
        color: 'white'
    }
}) 

export default MyCamera;