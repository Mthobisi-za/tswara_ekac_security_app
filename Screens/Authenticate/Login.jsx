import {View, Text, SafeAreaView, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { doc, getDoc, getFirestore, collection, query,getDocs ,where} from "firebase/firestore";
import app from '../../firebase';
export default function Login({navigation}){
    const db = getFirestore(app);
    const [show, SetShow] = useState(true);
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [emailLine, SetEmailLine] = useState('#999999');
    const [passLine, SetPassLine] = useState('#999999');


    function loginFunction(){
        const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user.uid);
                (async()=>{
                    
                    const q = query(collection(db, "activeusers"), where("uid", "==", user.uid));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    var imgRef = doc.data().imageRef; });
                    
                })();
                if(user){
                    navigation.navigate('DashboardRoute', { screen: 'Dashboard' });
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }



    return(
        <ScrollView style={{height: Dimensions.get('window').height}}>

       
        <SafeAreaView style={{backgroundColor: '#D5E7FF', flex: 1, alignItems: 'flex-start', justifyContent:'center', height: Dimensions.get('window').height}}>

            <View style={{height: Dimensions.get('window').height/2, justifyContent:'flex-start', alignItems:'flex-start' }}>
                <View >
                    <Image style={{ width:Dimensions.get('window').width- 50,height: Dimensions.get('window').width -50}} source={require('./assets/moon.png')}/>
                </View>
                
            </View>
            <View style={{height: Dimensions.get('window').height/2,backgroundColor: '#FFFFFF', borderTopEndRadius: 30, borderTopStartRadius: 30, width: Dimensions.get('window').width, paddingTop:10, paddingLeft:10, alignItems:'center', justifyContent:'center', display:'flex'}}>
                
                <TextInput onEndEditing={()=>{
                            if(email.includes('@') !== false){
                                SetEmailLine('#4ECC2F');
                                
                            }else{
                                SetEmailLine('#CF4332');
                            }
                        }} onChangeText={val =>{SetEmail(val); console.log(email)}} value={email} placeholder='Email' placeholderTextColor={'#999'} style={[{borderBottomColor: emailLine, borderBottomWidth: 1, width:Dimensions.get('window').width -40, height:45, fontSize: 18, fontWeight:'300', color: '#000'}]}/>
                <View style={styles.space}/>
                <View>
                       <TextInput onEndEditing={()=>{
                        if((password.split('')).length > 4 ){
                                SetPassLine('#4ECC2F');
                                
                        }else{
                                SetPassLine('#CF4332');
                            }
                        }} onChangeText={val =>{SetPassword(val)}} value={password} secureTextEntry={show}  placeholder='Password' textContentType='password' placeholderTextColor={'#999'} style={{borderBottomColor: passLine, borderBottomWidth: 1, width:Dimensions.get('window').width -40, height:45, fontSize: 18, fontWeight:'300', color: '#000'}}/>
                        {/* <View style={styles.space}/> */}
                </View>
             
                <TouchableOpacity onPress={()=>{SetShow(!show)}}>
                    {show?<Text style={{textAlign: 'left', width: Dimensions.get('window').width -40}}>View Password</Text> :  <Text style={{textAlign: 'left', width: Dimensions.get('window').width -40}}>Hide Password</Text> }
                </TouchableOpacity>
                <View style={styles.space}/>
                <View style={styles.space}/>
                <TouchableOpacity style={styles.bgs} onPress={()=>{loginFunction()}}>
                    <Text style={styles.btnText} >LOGIN</Text>
                </TouchableOpacity>
                <View style={styles.space}/>
                <View style={{display:'flex', flexDirection: 'row', alignItems:'center', justifyContent: 'center'}}>
                    <View style={{width: Dimensions.get('window').width/2-10, paddingLeft:10}}>
                        <Text style={{textDecorationLine: 'underline', color:'#0082E0'}}>Forgot Password</Text>
                    </View>
                    <View style={{width: Dimensions.get('window').width/2-10,paddingRight:10}}>
                        <Text onPress={()=>{navigation.navigate('Signup')}} style={{textDecorationLine: 'underline', color:'#0082E0'}}>Signup</Text>
                    </View>
                </View>
            </View>
            
        </SafeAreaView>
        </ScrollView>
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