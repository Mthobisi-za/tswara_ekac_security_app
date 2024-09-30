import { StyleSheet, Text, View, SafeAreaView , Image, TouchableOpacity} from 'react-native';
import { Storage } from 'expo-storage';
import { useEffect, useState } from 'react';
export default function InitialScreen({navigation}){
    const [name, SetName] = useState('');

  

  useEffect(()=>{

    let getName = async ()=>{
        const name =  JSON.parse(await Storage.getItem({ key: `name` }));
        SetName(name);
        console.log(name)
    }
    getName();

    if(name){
        console.log('screen new')
        navigation.navigate('DashboardRoute', { screen: 'Dashboard' });
    }
  }, [name])
    return(
        <SafeAreaView style={styles.container}>
            <View>
                    <Image style={styles.img} source={require('./assets/phone.png')}/>
            </View>
            <View style={styles.space}/>
            <View>
                <TouchableOpacity style={styles.bgs} onPress={()=>{navigation.navigate('Signup');}}>
                    <Text style={styles.btnText} >SIGNUP</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.space}/>
            <Text style={styles.btnTextD}>OR</Text>
            <View style={styles.space}/>
            <View>
                <TouchableOpacity style={styles.bgs} onPress={()=>{navigation.navigate('Login');}}>
                    <Text style={styles.btnText}>LOGIN</Text>
                </TouchableOpacity>
            </View>

            <View>
                {/* <TouchableOpacity style={styles.bgs} onPress={()=>{navigation.navigate('DashboardRoute', { screen: 'Dashboard' });}}>
                    <Text style={styles.btnText}>LOGIN</Text>
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    }
})