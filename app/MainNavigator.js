import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useLogin } from './context/LoginProvider'
import AppForm from './components/AppForm'
import ImageUpload from './components/ImageUpload'
import UserProfile from './components/UserProfile'
import DrawerNavigator from './DrawerNaviagtor' // Note: Check spelling of 'Navigator'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AppForm' component={AppForm} />
      <Stack.Screen name='ImageUpload' component={ImageUpload} />
      <Stack.Screen name='UserProfile' component={UserProfile} />
    </Stack.Navigator>
  )
}

const MainNavigator = () => {
  const { isLoggedIn } = useLogin()
  return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />
}

export default MainNavigator
