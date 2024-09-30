import { Text, View, Dimensions } from "react-native"
import { WebView } from 'react-native-webview';
export default function AndroidNotification(){
    return(
        <View style={{height:Dimensions.get('window').height/2+200, display:'flex', alignItems:'flex-end', justifyContent:'flex-end'}}>
    
      {/* {notification && <WebView
      style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height/2}}
      source={{ uri: `http://192.168.0.210:3000/maps/${notification.request.content.data.someData.latitude}/${notification.request.content.data.someData.longitude}/${notification.request.content.data.someData.profile}`}}
    />} */}
     
         
      <View style={{backgroundColor: '#00387F', borderTopEndRadius: 30, borderTopStartRadius: 30, width: Dimensions.get('window').width, paddingLeft: 20, alignItems: 'center', justifyContent: 'center', bottom:0, height:120, paddingBottom:20, position:'relative', paddingTop:20}}>
       <TouchableOpacity onPress={async()=>{
        // await GetLocation(expoPushToken);
        }} style={{backgroundColor:'#CF4332', width: 189, height: 82, borderRadius: 30, alignItems: 'center', justifyContent:'center'}}>
        <Text style={{fontSize:20, color:'#fff'}}>Help</Text>
    </TouchableOpacity>
    </View>
    </View>
    )
}