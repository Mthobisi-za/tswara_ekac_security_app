import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, Dimensions, TouchableOpacity,Image } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Storage } from 'expo-storage';
import { Modal } from '@mui/base/Modal';
import MapView,{Marker} from 'react-native-maps';
import { getFirestore ,collection, addDoc, query, where,getDocs} from "firebase/firestore";
import app from './firebase';
import { WebView } from 'react-native-webview';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
async function sendPushNotification(expoPushToken, latitude,longitude, refer) {
  
  
  await fetch(`http://192.168.0.210:3000/auth/2002NgubsMtho/${latitude}/${longitude}/:${refer}`).then(response =>{})
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}




export default function Notification_s(){

  const [location, SetLocation] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log(notification.request.content.data.someData)
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function GetLocation(){

    var uid = JSON.parse(await Storage.getItem({key: `uid`}));
    const db = getFirestore(app);
    const q = query(collection(db, "activeusers"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
     (async()=>{
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      // console.log(location.coords);
      SetLocation(location.coords);
      let p = (doc.data().imageRef).replace('.png', '');
      sendPushNotification(expoPushToken,location.coords.latitude,location.coords.longitude, p);
     })();
    });



  }

  return(
    <View style={{height:Dimensions.get('window').height/2+200, display:'flex', alignItems:'flex-end', justifyContent:'flex-end'}}>
    
      {notification && <WebView
      style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height/2}}
      source={{ uri: `http://192.168.0.210:3000/maps/${notification.request.content.data.someData.latitude}/${notification.request.content.data.someData.longitude}/${notification.request.content.data.someData.profile}`}}
    />}
     
         
      <View style={{backgroundColor: '#00387F', borderTopEndRadius: 30, borderTopStartRadius: 30, width: Dimensions.get('window').width, paddingLeft: 20, alignItems: 'center', justifyContent: 'center', bottom:0, height:120, paddingBottom:20, position:'relative', paddingTop:20}}>
       <TouchableOpacity onPress={async()=>{
        await GetLocation(expoPushToken);
        }} style={{backgroundColor:'#CF4332', width: 189, height: 82, borderRadius: 30, alignItems: 'center', justifyContent:'center'}}>
        <Text style={{fontSize:20, color:'#fff'}}>Help</Text>
    </TouchableOpacity>
    </View>
    </View>
   
  )
}


// {"attachments": [], "badge": null, "body": "One of your community members is in Danger!", "categoryIdentifier": "", "data": {"experienceId": "tswara_ekac_security_app", "scopeKey": "tswara_ekac_security_app", "someData": {"latitude": 203987, "longitude": -309876}}, "launchImageName": "", "sound": "default", "subtitle": null, "summaryArgument": null, "summaryArgumentCount": 0, "targetContentIdentifier": null, "threadIdentifier": "", "title": "Your Help is needed"}