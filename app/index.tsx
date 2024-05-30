import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './screens/Home/Home'
import DetailsPage from './screens/Details/Detail'

const Stack = createNativeStackNavigator()

   // quando nao tem props/parametros sendo passada na rota
   type StackNavigation = {
    Home: undefined, // aqui pode ser passado name, age caso os dados sejam enviados a outra pagina
    DetailsPage: undefined,
}

export type StackTypes = NativeStackNavigationProp<StackNavigation>  // 

export default function StackComponent() {

    return (
        <>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='DetailsPage' component={DetailsPage} />
            </Stack.Navigator>
        </>
    )
}