import React, { useState } from 'react';
import { StyleSheet, Text, View,Image,Modal,Alert,ActivityIndicator,KeyboardAvoidingView } from 'react-native';
import { TextInput,Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmployee = (props)=>{
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [picture,setPicture] = useState("")
    const [phone,setPhone] = useState("")
    const [salary,setSalary] = useState("")
    const [position,setPosition] = useState("")
    const [modal,setModal] = useState(false)
    const [loading,setLoading] = useState(false)
    const [saveload,setSaveload] = useState(false)

    const pickFromGallery = async ()=>{
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(granted){
            let data= await ImagePicker.launchImageLibraryAsync({
                mediaTypes : ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            });
            if(!data.cancelled){
                let newFile = {
                    uri:data.uri,
                    type:`test/${data.uri.split(".").reverse()[0]}`,
                    name:`test.${data.uri.split(".").reverse()[0]}`
                }
                console.log('new file',newFile);
                handleUpload(newFile);
            }
        }else{
            Alert.alert("You need to give up permission to work.");
        }
    }
    const pickFromCamera = async ()=>{
        const { granted } = await Permissions.askAsync(Permissions.CAMERA);
        if(granted){
            let data= await ImagePicker.launchCameraAsync({
                mediaTypes : ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            });
            if(!data.cancelled){
                let newFile = {
                    uri:data.uri,
                    type:`test/${data.uri.split(".").reverse()[0]}`,
                    name:`test.${data.uri.split(".").reverse()[0]}`
                }
                console.log('new file',newFile);
                handleUpload(newFile);
            }
        }else{
            Alert.alert("You need to give up permission to work.");
        }
    }
    const handleUpload = (image)=>{
        const data = new FormData();
        data.append('file',image);
        data.append('upload_preset','employeeapp');
        data.append('cloud_name','statusapp');
        console.log('------',data);
        setLoading(true);
        fetch("https://api.cloudinary.com/v1_1/statusapp/image/upload",{
            method:"post",
            body : data
        }).then(res=>res.json()).
        then(data=>{
            console.log(data)
            setPicture(data.url)
            setModal(false)
            setLoading(false)
        }).
        catch(err=>{console.log('error',err)});
    }

    const SaveEmployee = ()=>{
        setSaveload(true)
        fetch("http://60297502.ngrok.io/employee/save",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                phone,
                picture,
                salary,
                position
            })
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
            Alert.alert(res.message)
            setSaveload(false)
            props.navigation.navigate("Home")
        }).catch(e=>{
            console.log(e);
            setSaveload(false)
        })
    }
    return(
        <View style={styles.root}>
            <KeyboardAvoidingView behavior="position">
                <TextInput
                    label="Name"
                    value={name}
                    mode="outlined"
                    onChangeText={(text)=>{ setName(text) }}
                    style={styles.textInput}
                    theme={theme}
                />
                <TextInput
                    label="Email"
                    value={email}
                    mode="outlined"
                    onChangeText={(text)=>{ setEmail(text) }}
                    style={styles.textInput}
                    theme={theme}
                />
                <TextInput
                    label="Phone"
                    value={phone}
                    mode="outlined"
                    onChangeText={(text)=>{ setPhone(text) }}
                    keyboardType="number-pad"
                    style={styles.textInput}
                    theme={theme}
                />
                <TextInput
                    label="Salary"
                    value={salary}
                    mode="outlined"
                    onChangeText={(text)=>{ setSalary(text) }}
                    keyboardType="number-pad"
                    style={styles.textInput}
                    theme={theme}
                />
                <TextInput
                    label="Position"
                    value={position}
                    mode="outlined"
                    onChangeText={(text)=>{ setPosition(text) }}
                    // keyboardType="number-pad"
                    style={styles.textInput}
                    theme={theme}
                />
                <Button 
                    icon={picture === "" ?"upload":"check"} 
                    style={styles.textInput} 
                    mode="contained" 
                    theme={theme} 
                    onPress={()=>{setModal(true); console.log('Open Modal')}}>
                    {picture === "" ?"Upload":"Uploaded" }
                </Button>
                {saveload == false ?
                    <Button icon="content-save" style={styles.textInput} mode="contained" theme={theme} 
                    onPress={()=>SaveEmployee()} >
                        Save
                    </Button> 
                    :
                    <ActivityIndicator color="#7d1333" size="large" />
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.modalView}>
                        {loading ?
                        <ActivityIndicator size="large" color="#ffffff" style={{padding:10}} /> :
                        <View style={styles.modalButtonView}>
                            <Button icon="camera" style={styles.textInput} mode="contained" theme={themeBlack} 
                                onPress={()=>{pickFromCamera()}}>
                                Camera
                            </Button>
                            <Button icon="image-area" style={styles.textInput} mode="contained" theme={themeBlack} 
                                onPress={()=>{pickFromGallery()}}>
                                Gallery
                            </Button>
                        </View>
                        }
                        <Button icon="close" mode="contained" theme={themeBlack} style={styles.textInput} onPress={()=>{setModal(false); console.log('Close Modal')}}>
                            Cancel
                        </Button>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </View>
    )
}

const theme = {
    colors:{
        primary:'#7d1333'
    }
}
const themeBlack = {
    colors:{
        primary:'black'
    }
}

const styles=StyleSheet.create({
    root:{
        flex:1,
    },
    textInput:{
        margin:5
    },
    modalView:{
        position:'absolute',
        bottom:2,
        width:"100%",
        backgroundColor:'#7d1333'
    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    }
});
export default CreateEmployee;