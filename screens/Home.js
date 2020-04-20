import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,Image,FlatList,ActivityIndicator } from 'react-native';
import {Card, FAB,Title,Paragraph,Content,Cover,Actions,Button}  from 'react-native-paper';
import {baseurl} from '../helper/constants';
const Home=(props)=>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)

    const fetchDataOnPull = ()=>{
        fetch(`${baseurl}/employee`)
        .then(res => res.json() )
        .then(data =>{
            setData(data)
            setLoading(false)
        })
        .catch(e=>{
            console.log(e)
        })
    }
// useeffect work like component did mount and they work only when component first time load
    useEffect(()=>{
        fetchDataOnPull();
    },[])

    const renderList  = ((item)=>{
        return(
            <Card style={{margin:5}} onPress={()=>{props.navigation.navigate("Profile",{item})}}>
                <Card.Cover source={{ uri: item.picture }} />
                <Card.Content>
                    <Title>{item.name}</Title>
                    <Paragraph>{item.position}</Paragraph>
                </Card.Content>
            </Card>
        )
    });
    return(
        <View style={{flex:1}}>
            {loading ? 
                <ActivityIndicator size="large" color="#000" style={{alignContent:"center",justifyContent:"center"}} /> : 
                <FlatList
                    data={data}
                    renderItem = {({item})=>{
                        return    renderList(item)
                    }}
                    keyExtractor = {(item,index) =>`${index.toString()}` } //Convert id int to string
                    onRefresh={()=>{fetchDataOnPull()}}
                    refreshing={loading}
                />
            }
            <FAB
                onPress={()=>{ props.navigation.navigate("Create") }}
                style={styles.fab}
                small={false}
                theme={{colors:{accent:"#f30"}}}
                icon="plus"
            />
        </View>
    )
}
const styles=StyleSheet.create({
    mycard:{
        margin:5,     
    },
    cardView:{
        flexDirection : "row",
        padding : 5,
    },
    cardText:{
        fontWeight:"bold"
    },
    fab:{
        position:'absolute',
        margin:16,
        right:0,
        bottom:0
    }
});
export default Home;