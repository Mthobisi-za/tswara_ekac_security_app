import { StyleSheet, Text, View, SafeAreaView , Image, TouchableOpacity, TextInput, Dimensions,ScrollView, Button} from 'react-native';
import { PrimeReactProvider } from 'primereact/api';
import { useState } from 'react';
import { Search, SearchSuburb } from 'eskom-loadshedding-api';
import * as ImagePicker from 'expo-image-picker';
import app from '../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore ,collection, addDoc} from "firebase/firestore";
import { Storage } from 'expo-storage'
export default function Signup({navigation}){
    const [show, SetShow] = useState(true);
    const [image, setImage] = useState(null);
    const [blobImage, SetBlobImage] = useState(null);
    const [email, SetEmail] = useState('');
    const [name, SetName] = useState('');
    const [password, SetPassword] = useState('');
    const [subUrban, SetSubUrban] = useState('');
    const [addres_s, Setaddres_s] = useState('');
    const [emailLine, SetEmailLine] = useState('#999999');
    const [nameLine, SetNameLine] = useState('#999999');
    const [passLine, SetPassLine] = useState('#999999');
    const [subLine, SetSubLine] = useState('#999999');
    const [formS, SetFormS] = useState(false);
    const [imgUrl, SetImgUrl] = useState(null);
    

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year


    function updateFormStatus(){
        console.log(formS)
        if(emailLine === '#4ECC2F' && nameLine === '#4ECC2F' && passLine === '#4ECC2F' && subLine === '#4ECC2F'){
            SetFormS(true);
        }
        else{
            SetFormS(false);
        }
    }
    
    const getBlobFroUri = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
        SetBlobImage(blob);
        handleImage(blob);
        return blob;
      };



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
          getBlobFroUri(result.assets[0].uri);
        }
      };

    let handleImage =(blob)=>{
        const storage = getStorage(app, "gs://love-matcher-67908.appspot.com");
        const storageRef = ref(storage, date + month+ year +name+'.png');
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(ref(storage,  date + month+ year +name+'.png'))
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
          });
    }
      

    function handleUserSignup(){
        const auth = getAuth(app);
        const db = getFirestore(app);
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            var uid = user.uid;
            
            (async ()=>{
                await addDoc(collection(db, "activeusers"), {
                    name: name,
                    email: email,
                    password: password,
                    address: addres_s,
                    uid: uid,
                    imageRef:  date + month+ year +name+'.png'
                  });

                  await Storage.setItem({key:'uid',value:JSON.stringify(uid)})

            })().then(async()=>{
                await Storage.setItem({
                    key: `name`,
                    value: JSON.stringify(name)
                  })
                  await Storage.setItem({
                    key: `profile`,
                    value: JSON.stringify( date + month+ year +name+'.png')
                  })
                  await Storage.setItem({
                    key: `notifications_new`,
                    value: JSON.stringify([
                        {
                            type: 'welcome',
                            description: 'Tswara Ekac is there to solve and reduce crime, please share with your friends and be safe!'
                        }
                    ])
                  })
                navigation.navigate('DashboardRoute', { screen: 'Dashboard' });
            });
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }


    return(
        <PrimeReactProvider>
            <ScrollView style={{height: Dimensions.get('window').height}}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.smalltitle}>Create An Account</Text>
                <View style={styles.space}/>
                <View>
                    <View>
                        <TextInput onEndEditing={()=>{
                            if(email.includes('@') !== false){
                                SetEmailLine('#4ECC2F');
                                updateFormStatus()
                            }else{
                                SetEmailLine('#CF4332');
                            }
                        }} onChangeText={val =>{SetEmail(val); console.log(email)}} value={email} placeholder='Email' placeholderTextColor={'#999'} style={[{borderBottomColor: emailLine, borderBottomWidth: 1, width:Dimensions.get('window').width -40, height:45, fontSize: 18, fontWeight:'300', color: '#000'}]}/>
                        <View style={styles.space}/>
                        <TextInput onEndEditing={()=>{
                            if((name.split('')).length > 0 ){
                                SetNameLine('#4ECC2F');
                                updateFormStatus()
                            }else{
                                SetNameLine('#CF4332');
                            }
                        }} onChangeText={(val)=>{SetName(val)}} value={name}  placeholder='Name' placeholderTextColor={'#999'} style={{borderBottomColor: nameLine, borderBottomWidth: 1, width:Dimensions.get('window').width -40, height:45, fontSize: 18, fontWeight:'300', color: '#000'}}/>
                        <View style={styles.space}/>
                        <TextInput onEndEditing={()=>{
                            if((password.split('')).length > 4 ){
                                SetPassLine('#4ECC2F');
                                updateFormStatus()
                            }else{
                                SetPassLine('#CF4332');
                            }
                        }} onChangeText={val =>{SetPassword(val)}} value={password} secureTextEntry={show}  placeholder='Password' textContentType='password' placeholderTextColor={'#999'} style={{borderBottomColor: passLine, borderBottomWidth: 1, width:Dimensions.get('window').width -40, height:45, fontSize: 18, fontWeight:'300', color: '#000'}}/>
                        {/* <View style={styles.space}/> */}
                        
                        <TouchableOpacity onPress={()=>{SetShow(!show)}}>
                            {show?<Text>View Password</Text> :  <Text>Hide Password</Text> }
                        </TouchableOpacity>
                        <View style={styles.space}/>
                        <TextInput onEndEditing={()=>{
                            if((addres_s.split('')).length > 0 ){
                                SetSubLine('#4ECC2F');
                                updateFormStatus()
                            }else{
                                SetSubLine('#CF4332');
                            }
                        }} onChangeText={(val)=>{Setaddres_s(val)}} value={addres_s}  placeholder='Address' placeholderTextColor={'#999'} style={[{borderBottomColor: '#999', borderBottomWidth: 1, width:Dimensions.get('window').width -40, height:45, fontSize: 18, fontWeight:'300', color: '#000', borderColor: subLine}]}/>
                        <View style={styles.space}/>
                    </View>
                    <View style={styles.space}/> 
                    
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {image == null? <Button title="Pick an image from camera roll" onPress={pickImage} />: ''} 
                        {imgUrl && <Image source={{ uri: imgUrl }} style={{ width: 200, height: 200, borderRadius: 100 }} />}
                    </View>
                    <View style={styles.space}/>
                    <View style={styles.space}/>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        {emailLine == '#4ECC2F' && nameLine == '#4ECC2F' && passLine == '#4ECC2F' && subLine == '#4ECC2F' && imgUrl ? <TouchableOpacity style={styles.bgs} onPress={()=>{handleUserSignup();}}><Text style={styles.btnText} >SIGNUP</Text></TouchableOpacity> :'' }
                    </View>
                    
                    
                </View>
                
            </SafeAreaView>
            </ScrollView>
            {/* <View style={{backgroundColor: "#00387F", borderTopLeftRadius: 30, borderTopRightRadius: 30, width: Dimensions.get('window').width, flex: 0.3, paddingLeft:40, paddingTop:20}}>
                <Text style={{color: "#FFF",fontSize:16, fontWeight:'200'}}> Or Signin with</Text>
                <View style={styles.space}/>
                <TouchableOpacity onPress={()=>{}}>
                            
                </TouchableOpacity>
            </View> */}
        </PrimeReactProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height
    },
    space:{
        minHeight:20
    },
    img:{
        maxWidth:'100%'
    },
    bgs:{
        backgroundColor: '#0082E0',
        width: 296,
        height: 48,
        borderRadius: 30,alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: '700'
        
    },btnTextD: {
        fontSize: 20,
        color: '#000',
        fontWeight: '700' 
    },
    smalltitle:{
        color: '#000',
        fontSize:20,
        fontWeight:'700'
    },
    // subLine:{
    //     borderColor:
    // }
})