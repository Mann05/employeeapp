import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,Image,FlatList,ActivityIndicator } from 'react-native';
import {Card, FAB}  from 'react-native-paper';
const Home=(props)=>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)

    const fetchDataOnPull = ()=>{
        fetch("http://60297502.ngrok.io/employee")
        .then(res => res.json() )
        .then(data =>{
            console.log(data)
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
            <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Content>
      <Title>Card title</Title>
      <Paragraph>Card content</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
        )
    });
    return(
        <View style={{flex:1}}>
            {loading ? 
                <ActivityIndicator size="large" color="#ffffff" style={{alignContent:"center",justifyContent:"center"}} /> : 
                <FlatList
                    data={data}
                    renderItem = {({item})=>{
                        return    renderList(item)
                    }}
                    keyExtractor = {item =>`${item.id}` } //Convert id int to string
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