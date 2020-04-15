import React, { useState } from 'react';
import { StyleSheet, Text, View,Image,Modal,Alert,Linking,Platform,ActivityIndicator } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Title,Card,Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'

const Profile=(props)=>{
    const [loading,setLoading] = useState(false)
    const  {_id,name,picture,phone,salary,position,email}  = props.route.params.item;
    const openDial=()=>{
        if(Platform.OS === "android"){
            Linking.openURL(`tel:${phone}`);
        }else{
            Linking.openURL(`telprompt:${phone}`);
        }
    }
    const deleteEmployee = ()=>{
        setLoading(true);
        fetch("http://60297502.ngrok.io/employee/delete",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:_id
            })
        })
        .then(res => res.json() )
        .then(data =>{
            console.log(data)
            Alert.alert(`${data.name} Deleted Successfully`)
            setLoading(false);
            props.navigation.navigate("Home");
        })
        .catch(e=>{
            console.log(e)
            setLoading(false)
            Alert.alert(`Error : ${e}`)
        })
    }
    return(
        <View style={styles.root}>
            <LinearGradient
                colors={["#7d1333","#f30f30"]}
                style={{height:"20%"}}
            />
            <View style={{alignItems:"center"}}>
                <Image
                    style={{height:140,width:140,borderRadius:70,marginTop:-50}}
                    source={{uri:picture}}
                />
            </View>
            <View style={{alignItems:"center",margin:15}}>
                <Title>{name}</Title>
                <Text>{position}</Text>
            </View>
            <Card style={styles.myCard} onPress={()=>{ Linking.openURL(`mailto:${email}`) }}>
                <View style={styles.cardView}>
                    <MaterialIcons name="email" size={30} color={iconColor} />
    <Text style={[styles.textFont,styles.margin]}>{email}</Text>
                </View>
            </Card>
            <Card style={styles.myCard} onPress={()=>{ openDial() }}>
                <View style={styles.cardView}>
                    <MaterialIcons name="phone" size={30} color={iconColor} />
                    <Text style={[styles.textFont,styles.margin]}>{phone}</Text>
                </View>
            </Card>
            <Card style={styles.myCard}>
                <View style={styles.cardView}>
                    <MaterialIcons name="attach-money" size={30} color={iconColor} />
                    <Text style={[styles.textFont,styles.margin]}>{salary}</Text>
                </View>
            </Card>
            <Card style={styles.myCard}>
                <View style={styles.cardView}>
                    <MaterialIcons name="email" size={30} color={iconColor} />
                    <Text style={[styles.textFont,styles.margin]}>alpha@alpha.com</Text>
                </View>
            </Card>
            <Card style={styles.myCard}>
                <View style={styles.cardView}>
                    <MaterialIcons name="email" size={30} color={iconColor} />
                    <Text style={[styles.textFont,styles.margin]}>alpha@alpha.com</Text>
                </View>
            </Card>
            <View style={{flexDirection : "row",justifyContent:"space-around",padding:10}}>
                <Button icon="square-edit-outline" mode="contained" theme={theme} onPress={()=>{console.log('eDIT')}} >Edit</Button>
                {loading ?
                    <ActivityIndicator size="large" color="black" /> :
                    <Button icon="delete" mode="contained" theme={themeDelete} onPress={()=>{ deleteEmployee() }} >Delete</Button>
                }
            </View>
        </View>
    )
}
const iconColor = "#7d1333";
const theme = {
    colors:{
        primary:'#7d1333'
    }
}
const themeDelete = {
    colors:{
        primary:'orange'
    }
}
const styles=StyleSheet.create({
    root:{
        flex:1
    },
    myCard : {
        margin:5
    },
    cardView:{
        flexDirection:"row",
        padding:8
    },
    textFont : {
        fontSize : 15
    },
    margin : {
        marginLeft: 5,
        marginTop : 3
    }
});
export default Profile;