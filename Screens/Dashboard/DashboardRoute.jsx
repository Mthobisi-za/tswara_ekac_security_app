import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem, } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
import Dashboard from './Dashboard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Storage } from 'expo-storage';

function CustomDrawerContent(props) {
const {navigation} = props

  let deleteAll= async()=>{
    try {
      const name =  JSON.parse(await Storage.getItem({ key: `name` }));
      console.log(name);
      await Storage.removeItem({ key: 'name' })
      console.log('yess'+JSON.parse(await Storage.getItem({ key: `name` })))
      
    } catch (error) {
      console.log('err', error)
    }
    navigation.navigate('Home');
  }


  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem icon={()=>{<Ionicons name="notifications" size={30} color="#00387F" />}} label="Logout" onPress={() => deleteAll()} />
    </DrawerContentScrollView>
  );
}

export default function DashboardRoute({navigation}){
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen  name="Dashboard" component={Dashboard} options={{drawerIcon: ({color, size})=>{<Ionicons name="notifications" size={size} color={color} />}}}/>
        </Drawer.Navigator>
      );
}