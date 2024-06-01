import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './screens/Login/Login'
import Register from './screens/Register/RegisterForm'
import Menu from './screens/Menu/Menu'


const Stack = createNativeStackNavigator()

// quando nao tem props/parametros sendo passada na rota
type StackNavigation = {
    Login: undefined,
    RegisterForm: undefined,
    Home: undefined, // aqui pode ser passado name, age caso os dados sejam enviados a outra pagina
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>  // 


export default function StackComponent() {

    return (
        <>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen options={{ title: 'Entrar' }} name='Login' component={Login} />
                <Stack.Screen name='Menu' component={Menu} />
                <Stack.Screen options={{ title: 'Registre-se' }} name='RegisterForm' component={Register} />
            </Stack.Navigator>
        </>
    )
}