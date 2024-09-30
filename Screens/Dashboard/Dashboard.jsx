import { useEffect, useState } from "react"
import { Storage } from 'expo-storage'
import { Text, View , StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Image, ScrollView} from "react-native";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Ionicons from '@expo/vector-icons/Ionicons';
import app from "../../firebase";
import NotiFication_s from '../../Notification';
import SendNotification from "../../SendNotification";
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { getFirestore ,collection, addDoc, query, where,getDocs} from "firebase/firestore";
import * as Device from 'expo-device';
import Constants from 'expo-constants';
export default function Dashboard({navigation}){
    const [notificat, SetNotificat] = useState([]);
    const [name, SetName] = useState('');
    const [imageUrl, SetImgUrl] = useState(null);
    const [modalstatus, Setmodalstatus] = useState('none');
    const [all, Setall] = useState([]);
    async function updateAll(data){
        
    }
    function updateModal(){
        if(modalstatus === 'none'){
            Setmodalstatus('flex');
        }else{
            Setmodalstatus('none');
        }
    }

    (async()=>{
        const name = JSON.parse(
            await Storage.getItem({ key: `name` })
          );
        const image =  JSON.parse(
            await Storage.getItem({ key: `profile` })
          );
          SetName(name);
          const storage = getStorage(app, "gs://love-matcher-67908.appspot.com");
          getDownloadURL(ref(storage, image))
                .then((url) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = (event) => {
                    const blob = xhr.response;
                    };
                    xhr.open('GET', url);
                    xhr.send();

                  console.log(url);
                  SetImgUrl(url);
                })
                .catch((error) => {
                    // Handle any errors
                });
    })()



    


    let Getlocation = async ()=>{
        let location = await Location.getCurrentPositionAsync({});
       
          let postal = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          })
        //   console.log(location, postal);
          return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }
      }

    
 useEffect(()=>{
    
   async function counter(){
    const fullD = JSON.parse(
        await Storage.getItem({ key: `notifications` })
      );
      Setall([...all, fullD]);
   }
   counter();
  
 },[])

    return(<ScrollView style={{height:'auto'}}>
        <SafeAreaView style={styles.container}>
            
            <View style={styles.flexone}>
                <View style={[{flexDirection: 'row'}]}>
                    {/* <View style={{width: Dimensions.get('window').width/2, alignItems: 'center'}}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('AllNotifications', {data: all});}} style={{display: 'flex', flexDirection: 'row'}}>
                            <Ionicons  name="notifications" size={30} color="#00387F" />
                            <Text style={{color: '#CF4332'}}>{all.length - 1}</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{width: Dimensions.get('window').width-10, alignItems: 'center'}}>
                        {imageUrl ? <Image style={{width:70, height:70, borderRadius: 100}} source={{uri: imageUrl }}/> :''}    
                        <View style={{minHeight:10}}></View>
                        <Text style={styles.title}>{name}</Text>
                    </View>
                </View>
                
            </View>
            <View>
                    <NotiFication_s/>
                    
        </View>
        
            {/* <NotiFications profile={imageUrl} modalstatus={modalstatus} updatestatus={updateModal} updateNotifications={updateNotification} updateAll={updateAll}/> */}
           
        </SafeAreaView></ScrollView>
    )
}
const styles =StyleSheet.create({

    container:{
        backgroundColor: '#F4F4F4',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        // minHeight:Dimensions.get('window').height,
        height:'auto'
    },
    title:{
        fontSize: 20,
        color: '#000000'
    },
    flexone:{
        width: Dimensions.get('window').width,
        paddingTop: 20,
        // height:300,
        display:'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }

})