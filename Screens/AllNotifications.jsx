import { useEffect, useState } from 'react';
import {Text, ScrollView, FlatList, Dimensions,View, TouchableOpacity} from 'react-native';
import { Storage } from 'expo-storage';
import * as Location from 'expo-location';
import MapView,{Marker} from 'react-native-maps';

function AllNotifications({navigation, route}){
    const [all, Setall] = useState([]);
    const [addres, setaddress] = useState(null);
    const {data} = route.params;
    console.log(data);

    


    useEffect(()=>{
        async function updateData(){
            const fullD = JSON.parse(
            await Storage.getItem({ key: `notifications` })
          );
          Setall([...all, fullD]);
        //   console.log(all, '>>>>>')
        let address = await Location.reverseGeocodeAsync({latitude:data[0].someData.latitude, longitude:data[0].someData.longitude});
        
        console.log(address[0]);
        let str = `${address[0].streetNumber} ${address[0].street} ${address[0].district} ${address[0].postalCode}`;
        setaddress(str);
        }
        updateData();
     },[])

     function fullJsx(){
        return(
            <View style={{flex: 1, alignItems:'center'}}>
            <ScrollView style={{marginTop:20}}>
                <View style={{width: Dimensions.get('window').width -20, margin:'auto', backgroundColor:'#d3d3d3', padding:5, borderRadius:15, display:'flex', alignItems:'center'}}>
                    <Text style={{color:'#000', fontSize:20, textAlign:'center', paddingTop:10, paddingBottom:7,fontWeight:700}}>Title: Please extend your help!</Text>
                    
                    {addres? <Text style={{color:'#000', fontSize:18, paddingBottom:10, paddingLeft:10, fontWeight:300}}>Address: {addres}</Text>:''}
                    {data?  <Text style={{color:'#000', fontSize:10, textAlign:'center'}}>Co-ords: {data[0].someData.latitude} {data[0].someData.longitude}</Text>:''}
                    <View style={{minHeight:10}}></View>
                    
                    <View style={{width: Dimensions.get('window').width -40, height: Dimensions.get('window').height/2 , paddingTop:10, paddingBottom:20}} >
                    <MapView initialRegion={{latitude: data[0].someData.latitude, longitude: data[0].someData.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01}}
      
      image={{uri: 'https://i.ibb.co/x891GP2/pinpoint.png'}}
      style={{width:'100%', height:'100%', borderRadius: 20}}>
    
        <Marker coordinate={{latitude: data[0].someData.latitude, longitude: data[0].someData.longitude}}/>
      </MapView>
                </View>
                </View>
            </ScrollView>      
        </View>
        )
     }

return(
    <View>
        {/* {data.length !== 0? fullJsx():<Text>No Nitifications</Text>} */}
    </View>
)
}
export default AllNotifications;