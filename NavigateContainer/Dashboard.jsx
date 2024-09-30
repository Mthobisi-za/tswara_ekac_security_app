import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();


export default function Dashboard({navigation}){
return(
    <Drawer.Navigator>
    <Drawer.Screen name="Feed" component={Feed} />
    <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
)
}