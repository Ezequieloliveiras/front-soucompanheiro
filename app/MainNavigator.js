import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useLogin } from './context/LoginProvider'
import AppForm from './components/AppForm'
import ImageUpload from './components/ImageUpload'
import UserProfile from './components/UserProfile'
import DrawerNavigator from './DrawerNaviagtor' // Note: Check spelling of 'Navigator'
import UserList from './components/UsersList.js'
import StatesAndCityApi from './components/StatesAndCityApi.js'

const Stack = createNativeStackNavigator()


// navegacao em pilha
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AppForm' component={AppForm} />
      <Stack.Screen name='ImageUpload' component={ImageUpload} />
      <Stack.Screen name='UserProfile' component={UserProfile} />
      <Stack.Screen name='UsersList' component={UserList} />
      <Stack.Screen name='StatesAndCityAPI' component={StatesAndCityApi} />
    </Stack.Navigator>
  )
}


// se o usuario logar Abre o Drawer caso contrario voltara para tela de login

const MainNavigator = () => {
  const { isLoggedIn } = useLogin()
  return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />
}

export default MainNavigator
