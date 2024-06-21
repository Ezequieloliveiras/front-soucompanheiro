
// aqui ficam os componentes externos como cadastro e upload de imagens
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useLogin } from './context/LoginProvider'
import AppForm from './components/registrationForm/AppForm'
import ImageUpload from './partials/ImageUpload'
import InternalNavigator from './InternalNavigator' // Note: Check spelling of 'Navigator'


const Stack = createNativeStackNavigator()

// Parte de fora do APP
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AppForm' component={AppForm} />
      <Stack.Screen name='ImageUpload' component={ImageUpload} />
    </Stack.Navigator>
  )
}

// se o usuario logar Abre o Drawer caso contrario voltara para tela de login
const MainNavigator = () => {
  const { isLoggedIn } = useLogin()
  return isLoggedIn ? <InternalNavigator /> : <StackNavigator />
}

export default MainNavigator
